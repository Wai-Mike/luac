<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\StoreGuestDonationRequest;
use App\Models\Donation;
use App\Models\FundraisingCampaign;
use App\Support\FundraisingPrograms;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DonationController extends Controller
{
    public function store(StoreGuestDonationRequest $request)
    {
        $data = $request->validated();
        $programs = FundraisingPrograms::all();
        $program = $programs[$data['program']];

        $campaign = FundraisingCampaign::query()->firstOrCreate(
            ['title' => $data['program']],
            [
                'slug' => Str::slug($data['program']),
                'description' => $program['description'],
                'target_amount' => $program['target'],
                'status' => 'active',
            ]
        );

        Donation::query()->create([
            'fundraising_campaign_id' => $campaign->id,
            'donor_name' => $data['name'],
            'donor_phone' => $data['phone'],
            'donor_email' => $data['email'] ?? null,
            'amount' => $data['amount'],
            'currency' => $data['currency'],
            'payment_method' => $data['payment_method'],
            'donated_at' => now(),
            'notes' => $data['notes'] ?? null,
        ]);

        return redirect()->route('fundraising.thank-you');
    }

    public function thankYou(): Response
    {
        return Inertia::render('guest/fundraising-thank-you');
    }
}
