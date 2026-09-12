<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\FundraisingCampaign;
use App\Support\ExcelWorkbook;
use App\Support\FundraisingPrograms;
use App\Support\SiteContentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DonationInboxController extends Controller
{
    public function index()
    {
        $donations = Donation::query()
            ->with('campaign:id,title')
            ->latest('donated_at')
            ->paginate(20);

        return Inertia::render('admin/donations/index', [
            'donations' => $donations,
            'campaigns' => $this->campaignCards(),
            'programs' => FundraisingPrograms::titles(),
            'stats' => [
                'total' => Donation::query()->count(),
                'usd' => (float) Donation::query()->sum('amount_usd'),
                'campaigns' => count(FundraisingPrograms::titles()),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'donor_name' => ['required', 'string', 'max:255'],
            'donor_phone' => ['nullable', 'string', 'max:50'],
            'donor_email' => ['nullable', 'email', 'max:255'],
            'program' => ['required', 'string', Rule::in(FundraisingPrograms::titles())],
            'amount' => ['required', 'numeric', 'min:1', 'max:9999999'],
            'currency' => ['required', 'string', 'in:ssp,usd'],
            'payment_method' => ['required', 'string', 'in:cash,bank,mobile_money,other'],
            'donated_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $campaign = $this->campaignNamed($data['program']);

        Donation::query()->create([
            'fundraising_campaign_id' => $campaign->id,
            'donor_name' => $data['donor_name'],
            'donor_phone' => $data['donor_phone'] ?? null,
            'donor_email' => $data['donor_email'] ?? null,
            'amount' => $data['amount'],
            'currency' => $data['currency'],
            'payment_method' => $data['payment_method'],
            'donated_at' => $data['donated_at'] ?? now(),
            'notes' => $data['notes'] ?? null,
            'received_by' => $request->user()?->id,
        ]);

        return redirect()->route('admin.donations.index')->with('success', 'Donation recorded.');
    }

    public function updateCampaigns(Request $request)
    {
        $validated = $request->validate([
            'campaigns' => ['required', 'array', 'min:1'],
            'campaigns.*.title' => ['required', 'string', 'max:255'],
            'campaigns.*.description' => ['nullable', 'string', 'max:1000'],
            'campaigns.*.target' => ['required', 'numeric', 'min:0'],
            'campaigns.*.target_ssp' => ['nullable', 'numeric', 'min:0'],
            'campaigns.*.image' => ['nullable', 'string', 'max:500'],
        ]);

        $existingImages = collect(SiteContentRepository::get()['campaigns'] ?? [])->pluck('image', 'title');

        $campaigns = array_map(function (array $row) use ($existingImages) {
            $row['description'] = $row['description'] ?? '';
            $row['target_ssp'] = (float) ($row['target_ssp'] ?? 0);
            $row['image'] = filled($row['image'] ?? null)
                ? $row['image']
                : (string) ($existingImages[$row['title']] ?? '/images/cover.jpg');

            return $row;
        }, $validated['campaigns']);

        SiteContentRepository::put(['campaigns' => $campaigns]);

        foreach ($campaigns as $row) {
            $campaign = FundraisingCampaign::query()->firstOrNew(['title' => $row['title']]);
            if (! $campaign->exists) {
                $campaign->slug = Str::slug($row['title']).'-'.Str::lower(Str::random(4));
                $campaign->status = 'active';
                $campaign->created_by = $request->user()?->id;
            }
            $campaign->description = $row['description'];
            $campaign->target_amount = $row['target'];
            $campaign->save();
        }

        return redirect()->route('admin.donations.index')->with('success', 'Campaign goals updated.');
    }

    public function export(): StreamedResponse
    {
        $donations = Donation::query()
            ->with('campaign:id,title')
            ->latest('donated_at')
            ->get();

        $rows = $donations->map(fn (Donation $donation) => [
            $donation->donor_name,
            $donation->donor_phone,
            $donation->donor_email,
            $donation->campaign?->title,
            $donation->amount,
            strtoupper((string) $donation->currency),
            $donation->amount_usd,
            str_replace('_', ' ', (string) $donation->payment_method),
            optional($donation->donated_at)->format('Y-m-d'),
            $donation->notes,
        ])->all();

        $xml = ExcelWorkbook::spreadsheetMl('Donors', [
            'Donor name',
            'Phone',
            'Email',
            'Campaign',
            'Amount given',
            'Currency',
            'Amount (USD)',
            'Payment method',
            'Date',
            'Notes',
        ], $rows);

        $filename = 'layya-donors-'.now()->format('Y-m-d').'.xls';

        return response()->streamDownload(function () use ($xml) {
            echo $xml;
        }, $filename, [
            'Content-Type' => 'application/vnd.ms-excel; charset=UTF-8',
        ]);
    }

    /**
     * @return \Illuminate\Support\Collection<int, array<string, mixed>>
     */
    private function campaignCards()
    {
        $raised = FundraisingPrograms::raisedTotals();
        $storedTargets = FundraisingCampaign::query()->pluck('target_amount', 'title');
        $donorsByTitle = Donation::query()
            ->join('fundraising_campaigns', 'fundraising_campaigns.id', '=', 'donations.fundraising_campaign_id')
            ->selectRaw('fundraising_campaigns.title as title, COUNT(*) as donors')
            ->groupBy('fundraising_campaigns.title')
            ->pluck('donors', 'title');

        return collect(FundraisingPrograms::all())->map(function (array $meta, string $title) use ($raised, $storedTargets, $donorsByTitle) {
            $raisedUsd = (float) ($raised['usd'][$title] ?? 0);
            $raisedSsp = (float) ($raised['ssp'][$title] ?? 0);
            $target = (float) ($storedTargets[$title] ?? $meta['target']);
            $targetSsp = (float) ($meta['target_ssp'] ?? 0);
            $percent = $target > 0
                ? min(100, round(($raisedUsd / $target) * 100))
                : ($targetSsp > 0 ? min(100, round(($raisedSsp / $targetSsp) * 100)) : 0);

            return [
                'title' => $title,
                'description' => $meta['description'],
                'image' => $meta['image'] ?? '/images/cover.jpg',
                'target' => $target,
                'target_ssp' => $targetSsp,
                'raised' => $raisedUsd,
                'raised_ssp' => $raisedSsp,
                'donors' => (int) ($donorsByTitle[$title] ?? 0),
                'percent' => $percent,
                'status' => 'active',
            ];
        })->values();
    }

    private function campaignNamed(string $title): FundraisingCampaign
    {
        $meta = FundraisingPrograms::all()[$title] ?? ['description' => '', 'target' => 0];

        return FundraisingCampaign::query()->firstOrCreate(
            ['title' => $title],
            [
                'slug' => Str::slug($title).'-'.Str::lower(Str::random(4)),
                'description' => $meta['description'],
                'target_amount' => $meta['target'],
                'status' => 'active',
                'created_by' => request()->user()?->id,
            ]
        );
    }
}
