<?php

namespace App\Support;

class FundraisingPrograms
{
    /** Approximate display / conversion rate. 1 USD ≈ this many SSP. */
    public const SSP_PER_USD = 3500;

    /**
     * Public programs a guest can fund. Titles must match the fundraising page.
     *
     * @return array<string, array{target: int, description: string}>
     */
    public static function all(): array
    {
        return [
            'Support Girls Education' => [
                'target' => 25000,
                'description' => 'Scholarship support, learning materials, and safe transport where possible.',
            ],
            'Youth Skills Training' => [
                'target' => 18000,
                'description' => 'Vocational and digital skills sessions for employability and confidence.',
            ],
            'Community Safe Spaces' => [
                'target' => 32000,
                'description' => 'Rent, utilities, and supplies for youth-friendly hubs and mentors.',
            ],
            'Sports & Culture Program' => [
                'target' => 14000,
                'description' => 'Equipment, events, and coaches for football, culture, and wellness.',
            ],
            'Digital Youth Lab' => [
                'target' => 22000,
                'description' => 'Devices, connectivity stipends, and peer trainers for digital literacy.',
            ],
        ];
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
