<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\YouthMember;
use App\Models\YouthMembership;
use App\Support\ExcelWorkbook;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class YouthMembershipController extends Controller
{
    public function index(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $search = $request->input('search');

        $query = YouthMember::query()
            ->with(['memberships' => fn ($q) => $q->where('year', $year)])
            ->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $members = $query->paginate(20)->withQueryString();

        $members->getCollection()->transform(function (YouthMember $member) {
            $fee = $member->memberships->first();

            return [
                'id' => $member->id,
                'first_name' => $member->first_name,
                'last_name' => $member->last_name,
                'gender' => $member->gender,
                'age' => $member->age,
                'phone' => $member->phone,
                'email' => $member->email,
                'payam' => $member->payam,
                'county' => $member->county,
                'source' => $member->source ?? 'census',
                'amount_paid' => $fee?->amount_paid ?? 0,
                'currency' => $fee?->currency ?? 'ssp',
                'paid_at' => $fee?->paid_at,
            ];
        });

        $fees = YouthMembership::query()->where('year', $year);

        return Inertia::render('admin/memberships/index', [
            'members' => $members,
            'year' => $year,
            'filters' => ['search' => $search],
            'stats' => [
                'registered' => YouthMember::query()->count(),
                'paid' => (clone $fees)->where('amount_paid', '>', 0)->count(),
                'ssp' => (float) (clone $fees)->where('currency', 'ssp')->sum('amount_paid'),
                'usd' => (float) (clone $fees)->where('currency', 'usd')->sum('amount_paid'),
            ],
        ]);
    }

    public function update(Request $request, YouthMember $youthMember)
    {
        $data = $request->validate([
            'year' => ['required', 'integer', 'min:2020', 'max:2100'],
            'amount_paid' => ['required', 'numeric', 'min:0', 'max:9999999'],
            'currency' => ['required', 'string', 'in:ssp,usd'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $amount = (float) $data['amount_paid'];

        YouthMembership::query()->updateOrCreate(
            [
                'youth_member_id' => $youthMember->id,
                'year' => $data['year'],
            ],
            [
                'amount_paid' => $amount,
                'currency' => $data['currency'],
                'paid_at' => $amount > 0 ? now() : null,
                'recorded_by' => $request->user()?->id,
                'notes' => $data['notes'] ?? null,
            ]
        );

        return redirect()
            ->route('admin.memberships.index', array_filter([
                'year' => $data['year'],
                'search' => $request->input('search') ?: null,
            ]))
            ->with('success', 'Membership fee saved.');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'age' => ['required', 'integer', 'min:10', 'max:80'],
            'gender' => ['nullable', 'in:male,female,other'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'payam' => ['nullable', 'string', 'max:150'],
            'year' => ['required', 'integer', 'min:2020', 'max:2100'],
            'amount_paid' => ['required', 'numeric', 'min:0.01', 'max:9999999'],
            'currency' => ['required', 'string', 'in:ssp,usd'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $age = (int) $data['age'];
        $amount = (float) $data['amount_paid'];

        $member = YouthMember::query()->create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'gender' => $data['gender'] ?? null,
            'date_of_birth' => now()->subYears($age)->startOfDay(),
            'reported_age' => $age,
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null,
            'county' => 'PIGI (Khorfulus)',
            'payam' => $data['payam'] ?? null,
            'source' => 'membership',
        ]);

        YouthMembership::query()->updateOrCreate(
            [
                'youth_member_id' => $member->id,
                'year' => $data['year'],
            ],
            [
                'amount_paid' => $amount,
                'currency' => $data['currency'],
                'paid_at' => now(),
                'recorded_by' => $request->user()?->id,
                'notes' => $data['notes'] ?? null,
            ]
        );

        return redirect()
            ->route('admin.memberships.index', ['year' => $data['year']])
            ->with('success', 'Paid member added.');
    }

    public function export(Request $request): StreamedResponse
    {
        $year = (int) $request->input('year', now()->year);

        $members = YouthMember::query()
            ->with(['memberships' => fn ($q) => $q->where('year', $year)])
            ->orderBy('first_name')
            ->orderBy('last_name')
            ->get();

        $rows = $members->map(function (YouthMember $member) use ($year) {
            $fee = $member->memberships->first();

            return [
                $member->first_name,
                $member->last_name,
                $member->age,
                $member->gender,
                $member->phone,
                $member->email,
                $member->payam ?: $member->county,
                $year,
                $fee?->amount_paid ?? 0,
                strtoupper((string) ($fee?->currency ?? 'ssp')),
                optional($fee?->paid_at)->format('Y-m-d'),
                ($member->source ?? 'census') === 'membership' ? 'Walk-in' : 'Census',
            ];
        })->all();

        $xml = ExcelWorkbook::spreadsheetMl('Membership '.$year, [
            'First name',
            'Last name',
            'Age',
            'Gender',
            'Phone',
            'Email',
            'Payam',
            'Year',
            'Amount paid',
            'Currency',
            'Paid date',
            'Source',
        ], $rows);

        $filename = 'layya-membership-'.$year.'.xls';

        return response()->streamDownload(function () use ($xml) {
            echo $xml;
        }, $filename, [
            'Content-Type' => 'application/vnd.ms-excel; charset=UTF-8',
        ]);
    }
}
