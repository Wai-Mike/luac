<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\YouthCensusRequest;
use App\Mail\YouthCensusThankYouMail;
use App\Models\YouthMember;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class YouthCensusController extends Controller
{
    /**
     * Show the multi-step youth census registration form.
     */
    public function create()
    {
        return Inertia::render('guest/youth-census/register');
    }

    /**
     * Store a newly registered youth member.
     */
    public function store(YouthCensusRequest $request)
    {
        $member = YouthMember::create([
            ...$this->prepareData($request),
            'source' => 'census',
        ]);

        $this->sendThankYouEmail($member);

        return redirect()->route('youth-census.thank-you');
    }

    /**
     * Simple thank you page after submission.
     */
    public function thankYou()
    {
        return Inertia::render('guest/youth-census/thank-you');
    }

    /**
     * Optional public overview of aggregated census data.
     */
    public function overview()
    {
        $total = YouthMember::query()->census()->count();

        $byGender = YouthMember::query()->census()->select('gender', DB::raw('count(*) as total'))
            ->groupBy('gender')
            ->get();

        $byCounty = YouthMember::query()->census()->select('county', DB::raw('count(*) as total'))
            ->groupBy('county')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        return Inertia::render('guest/youth-census/overview', [
            'total' => $total,
            'byGender' => $byGender,
            'byCounty' => $byCounty,
        ]);
    }

    protected function prepareData(YouthCensusRequest $request): array
    {
        $data = $request->safe()->except(['consent', 'barriers']);
        $barriers = $request->validated('barriers');

        if (isset($data['skills']) && is_string($data['skills'])) {
            $data['skills'] = array_filter(array_map('trim', explode(',', $data['skills'])));
        }

        if (isset($data['interests']) && is_string($data['interests'])) {
            $data['interests'] = array_filter(array_map('trim', explode(',', $data['interests'])));
        }

        $interests = is_array($data['interests'] ?? null) ? $data['interests'] : [];
        $data['interests'] = array_values(array_unique([...$interests, ...$barriers]));

        return $data;
    }

    protected function sendThankYouEmail(YouthMember $member): void
    {
        $email = trim((string) $member->email);

        if ($email === '') {
            return;
        }

        try {
            Mail::to($email)->send(new YouthCensusThankYouMail($member));
        } catch (\Throwable $exception) {
            Log::error('Youth census thank-you email failed.', [
                'youth_member_id' => $member->id,
                'email' => $email,
                'mailer' => config('mail.default'),
                'error' => $exception->getMessage(),
            ]);
        }
    }
}

