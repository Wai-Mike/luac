<?php

namespace App\Support;

class FundraisingPrograms
{
    /**
     * Used only to store an internal USD equivalent of SSP gifts for export.
     * Campaign pound goals are entered by admins and are never derived from this rate.
     */
    public const SSP_PER_USD = 3500;

    /**
     * Public programs a guest can fund. Titles must match the fundraising page.
     *
     * @return array<string, array{target: int, target_ssp: int, description: string}>
     */
    public static function all(): array
    {
        $fromCms = [];
        foreach (SiteContentRepository::get()['campaigns'] ?? [] as $campaign) {
            $title = trim((string) ($campaign['title'] ?? ''));
            if ($title === '') {
                continue;
            }
            $fromCms[$title] = [
                'target' => (int) ($campaign['target'] ?? 0),
                'target_ssp' => (int) ($campaign['target_ssp'] ?? 0),
                'description' => (string) ($campaign['description'] ?? ''),
                'image' => (string) ($campaign['image'] ?? '/images/cover.jpg'),
            ];
        }

        $programs = $fromCms !== [] ? $fromCms : self::fallback();

        $newTitle = 'Support 12 girls with materials';
        $oldTitle = 'Support Girls Education';
        if (isset($programs[$oldTitle]) && ! isset($programs[$newTitle])) {
            $programs[$newTitle] = $programs[$oldTitle];
        }
        if (isset($programs[$newTitle])) {
            $programs[$oldTitle] = $programs[$newTitle];
        }

        return $programs;
    }

    /**
     * @return array<string, array{target: int, target_ssp: int, description: string}>
     */
    public static function fallback(): array
    {
        return [
            'Support 12 girls with materials' => [
                'target' => 25000,
                'target_ssp' => 0,
                'description' => 'Learning materials and school support for 12 girls.',
                'image' => '/images/education1.jpg',
            ],
            'Youth Skills Training' => [
                'target' => 18000,
                'target_ssp' => 0,
                'description' => 'Vocational and digital skills sessions for employability and confidence.',
                'image' => '/images/education.jpg',
            ],
            'Community Safe Spaces' => [
                'target' => 32000,
                'target_ssp' => 0,
                'description' => 'Rent, utilities, and supplies for youth-friendly hubs and mentors.',
                'image' => '/images/cover1.jpg',
            ],
            'Sports & Culture Program' => [
                'target' => 14000,
                'target_ssp' => 0,
                'description' => 'Equipment, events, and coaches for football, culture, and wellness.',
                'image' => '/images/football.jpg',
            ],
            'Digital Youth Lab' => [
                'target' => 22000,
                'target_ssp' => 0,
                'description' => 'Devices, connectivity stipends, and peer trainers for digital literacy.',
                'image' => '/images/Youth-engagement.jpeg',
            ],
        ];
    }

    /**
     * Actual gifts in each currency — not converted from a daily rate.
     *
     * @return array{usd: array<string, float>, ssp: array<string, float>}
     */
    public static function raisedTotals(): array
    {
        $rows = \App\Models\Donation::query()
            ->join('fundraising_campaigns', 'fundraising_campaigns.id', '=', 'donations.fundraising_campaign_id')
            ->selectRaw('fundraising_campaigns.title as title')
            ->selectRaw("COALESCE(SUM(CASE WHEN donations.currency = 'usd' THEN donations.amount ELSE 0 END), 0) as raised_usd")
            ->selectRaw("COALESCE(SUM(CASE WHEN donations.currency = 'ssp' THEN donations.amount ELSE 0 END), 0) as raised_ssp")
            ->groupBy('fundraising_campaigns.title')
            ->get();

        $usd = $rows->pluck('raised_usd', 'title')->map(fn ($value) => (float) $value)->all();
        $ssp = $rows->pluck('raised_ssp', 'title')->map(fn ($value) => (float) $value)->all();

        return [
            'usd' => self::mergeLegacyCampaignTotals($usd),
            'ssp' => self::mergeLegacyCampaignTotals($ssp),
        ];
    }

    /**
     * @param  array<string, float>  $totals
     * @return array<string, float>
     */
    private static function mergeLegacyCampaignTotals(array $totals): array
    {
        $old = $totals['Support Girls Education'] ?? 0;
        $new = $totals['Support 12 girls with materials'] ?? 0;
        if ($old > 0 || $new > 0) {
            $totals['Support 12 girls with materials'] = $old + $new;
            $totals['Support Girls Education'] = $old + $new;
        }

        return $totals;
    }

    /**
     * @return list<string>
     */
    public static function titles(): array
    {
        return array_keys(self::all());
    }

    public static function toUsd(float $amount, string $currency): float
    {
        if ($currency === 'ssp') {
            return round($amount / self::SSP_PER_USD, 2);
        }

        return round($amount, 2);
    }
}
