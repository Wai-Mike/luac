<?php

namespace App\Observers;

use App\Models\Donation;
use App\Models\FundraisingCampaign;

class DonationObserver
{
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
            ->sum('amount');

        FundraisingCampaign::query()->whereKey($campaignId)->update(['raised_amount' => $sum]);
    }
}
