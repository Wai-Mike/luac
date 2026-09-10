<?php

namespace App\Observers;

use App\Models\AdminNotification;
use App\Models\Donation;
use App\Models\FundraisingCampaign;

class DonationObserver
{
    public function created(Donation $donation): void
    {
        $amount = rtrim(rtrim((string) $donation->amount, '0'), '.');
        $currency = strtoupper((string) $donation->currency);

        AdminNotification::record(
            'donation',
            'New donation',
            trim($donation->donor_name).' gave '.$amount.' '.$currency.'.',
            route('admin.donations.index')
        );
    }

    public function saved(Donation $donation): void
    {
        $this->recalculate($donation->fundraising_campaign_id);
    }

    public function deleted(Donation $donation): void
    {
        $this->recalculate($donation->fundraising_campaign_id);
    }

    protected function recalculate(int $campaignId): void
    {
        $sum = (float) Donation::query()
            ->where('fundraising_campaign_id', $campaignId)
            ->sum('amount_usd');

        FundraisingCampaign::query()->whereKey($campaignId)->update(['raised_amount' => $sum]);
    }
}
