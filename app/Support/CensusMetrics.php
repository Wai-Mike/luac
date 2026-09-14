<?php

namespace App\Support;

use App\Models\YouthMember;
use Illuminate\Support\Facades\Schema;

class CensusMetrics
{
    /**
     * @return list<array{name: string, total: int, share: int}>
     */
    public static function byPayam(): array
    {
        if (! Schema::hasTable('youth_members')) {
            return collect(LuacPayams::ALL)->map(fn (string $name) => [
                'name' => $name,
                'total' => 0,
                'share' => 0,
            ])->all();
        }

        $counts = YouthMember::query()
            ->selectRaw('payam, count(*) as total')
            ->whereIn('payam', LuacPayams::ALL)
            ->groupBy('payam')
            ->pluck('total', 'payam');

        $sum = (int) $counts->sum();

        return collect(LuacPayams::ALL)->map(function (string $name) use ($counts, $sum) {
            $total = (int) ($counts[$name] ?? 0);

            return [
                'name' => $name,
                'total' => $total,
                'share' => $sum > 0 ? (int) round(($total / $sum) * 100) : 0,
            ];
        })->all();
    }

    /**
     * @return list<array{name: string, total: int, share: int}>
     */
    public static function byProfession(int $limit = 10): array
    {
        if (! Schema::hasTable('youth_members')) {
            return [];
        }

        $rows = YouthMember::query()
            ->selectRaw("COALESCE(NULLIF(profession, ''), 'Unspecified') as name, count(*) as total")
            ->groupBy('name')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();

        $sum = max(1, (int) $rows->sum('total'));

        return $rows->map(fn ($row) => [
            'name' => (string) $row->name,
            'total' => (int) $row->total,
            'share' => (int) round(((int) $row->total / $sum) * 100),
        ])->all();
    }
}
