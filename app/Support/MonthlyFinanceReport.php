<?php

namespace App\Support;

use App\Models\AssociationExpense;
use App\Models\Donation;
use App\Models\YouthMembership;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;

class MonthlyFinanceReport
{
    /**
     * @return array<string, mixed>
     */
    public static function forMonth(int $year, int $month): array
    {
        $start = CarbonImmutable::create($year, $month, 1)->startOfMonth();
        $end = $start->endOfMonth();

        $memberships = YouthMembership::query()
            ->with('member:id,first_name,last_name')
            ->where('amount_paid', '>', 0)
            ->whereBetween('paid_at', [$start, $end])
            ->orderByDesc('paid_at')
            ->get();

        $donations = Donation::query()
            ->with('campaign:id,title')
            ->whereBetween('donated_at', [$start, $end])
            ->orderByDesc('donated_at')
            ->get();

        $expenses = AssociationExpense::query()
            ->with(['department:id,name', 'recorder:id,name'])
            ->whereBetween('spent_at', [$start, $end])
            ->orderByDesc('spent_at')
            ->get();

        $membershipTotals = self::sumByCurrency($memberships, 'amount_paid');
        $fundraisingTotals = self::sumByCurrency($donations, 'amount');
        $expenseTotals = self::sumByCurrency($expenses, 'amount');

        $incomeTotal = [
            'ssp' => $membershipTotals['ssp'] + $fundraisingTotals['ssp'],
            'usd' => $membershipTotals['usd'] + $fundraisingTotals['usd'],
        ];

        $byCampaign = $donations
            ->groupBy(fn (Donation $donation) => $donation->campaign?->title ?: 'Unassigned')
            ->map(function (Collection $gifts, string $title) {
                $totals = self::sumByCurrency($gifts, 'amount');

                return [
                    'title' => $title,
                    'count' => $gifts->count(),
                    'ssp' => $totals['ssp'],
                    'usd' => $totals['usd'],
                ];
            })
            ->values()
            ->all();

        $byCategory = collect(AssociationExpense::categories())->map(function (string $label, string $key) use ($expenses) {
            $totals = self::sumByCurrency($expenses->where('category', $key), 'amount');

            return [
                'key' => $key,
                'label' => $label,
                'count' => $expenses->where('category', $key)->count(),
                'ssp' => $totals['ssp'],
                'usd' => $totals['usd'],
            ];
        })->values()->all();

        return [
            'year' => $year,
            'month' => $month,
            'label' => $start->format('F Y'),
            'income' => [
                'membership' => $membershipTotals,
                'fundraising' => $fundraisingTotals,
                'total' => $incomeTotal,
                'by_campaign' => $byCampaign,
                'items' => $memberships->map(fn (YouthMembership $fee) => [
                    'type' => 'Membership',
                    'date' => optional($fee->paid_at)->format('Y-m-d'),
                    'description' => trim(($fee->member?->first_name.' '.$fee->member?->last_name)).' membership fee',
                    'amount' => $fee->amount_paid,
                    'currency' => strtoupper((string) $fee->currency),
                ])->concat($donations->map(fn (Donation $gift) => [
                    'type' => 'Fundraising',
                    'date' => optional($gift->donated_at)->format('Y-m-d'),
                    'description' => trim($gift->donor_name).($gift->campaign?->title ? ' · '.$gift->campaign->title : ''),
                    'amount' => $gift->amount,
                    'currency' => strtoupper((string) $gift->currency),
                ]))->values()->all(),
            ],
            'expenses' => [
                'total' => $expenseTotals,
                'by_category' => $byCategory,
                'items' => $expenses->map(fn (AssociationExpense $expense) => [
                    'id' => $expense->id,
                    'date' => optional($expense->spent_at)->format('Y-m-d'),
                    'department' => $expense->department?->name ?: 'Unassigned',
                    'category' => $expense->category,
                    'category_label' => $expense->categoryLabel(),
                    'title' => $expense->title,
                    'detail' => $expense->detail,
                    'amount' => $expense->amount,
                    'currency' => strtoupper((string) $expense->currency),
                    'recorded_by' => $expense->recorder?->name,
                    'recorded_by_id' => $expense->recorded_by,
                ])->values()->all(),
            ],
            'balance' => [
                'ssp' => $incomeTotal['ssp'] - $expenseTotals['ssp'],
                'usd' => $incomeTotal['usd'] - $expenseTotals['usd'],
            ],
        ];
    }

    /**
     * @param  iterable<mixed>  $rows
     * @return array{ssp: float, usd: float}
     */
    public static function sumByCurrency(iterable $rows, string $amountKey): array
    {
        $ssp = 0.0;
        $usd = 0.0;

        foreach ($rows as $row) {
            $amount = (float) (is_array($row) ? ($row[$amountKey] ?? 0) : $row->{$amountKey});
            $currency = strtolower((string) (is_array($row) ? ($row['currency'] ?? 'ssp') : $row->currency));
            if ($currency === 'usd') {
                $usd += $amount;
            } else {
                $ssp += $amount;
            }
        }

        return ['ssp' => round($ssp, 2), 'usd' => round($usd, 2)];
    }
}
