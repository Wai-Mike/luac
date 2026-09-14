<?php

namespace App\Support;

use App\Models\AssociationEvent;
use App\Models\AssociationExpense;
use App\Models\AssociationReceipt;
use App\Models\AssociationReport;
use App\Models\AssociationTask;
use App\Models\Department;
use App\Models\DepartmentBudget;
use App\Models\Donation;
use App\Models\LedgerAccount;
use App\Models\LedgerJournal;
use App\Models\LogisticsDocument;
use App\Models\PurchaseRequest;
use App\Models\User;
use App\Models\YouthMembership;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AssociationAms
{
    public const DEFAULT_ALLOCATION_SSP = 2000000;

    public const ACCOUNT_CASH = '1100';

    public const ACCOUNT_BANK = '1200';

    public const ACCOUNT_EQUIPMENT = '1500';

    public const ACCOUNT_PAYABLE = '2100';

    public const ACCOUNT_RESERVES = '3100';

    public const ACCOUNT_DUES = '4100';

    public const ACCOUNT_DONATIONS = '4200';

    public const ACCOUNT_GRANTS = '4300';

    public const ACCOUNT_EVENT_FEES = '4400';

    /**
     * @return array<string, array{name: string, type: string}>
     */
    public static function chartOfAccounts(): array
    {
        return [
            self::ACCOUNT_CASH => ['name' => 'Cash on hand', 'type' => LedgerAccount::TYPE_ASSET],
            self::ACCOUNT_BANK => ['name' => 'Bank accounts', 'type' => LedgerAccount::TYPE_ASSET],
            self::ACCOUNT_EQUIPMENT => ['name' => 'Equipment inventory', 'type' => LedgerAccount::TYPE_ASSET],
            self::ACCOUNT_PAYABLE => ['name' => 'Accounts payable', 'type' => LedgerAccount::TYPE_LIABILITY],
            self::ACCOUNT_RESERVES => ['name' => 'Unrestricted reserves', 'type' => LedgerAccount::TYPE_EQUITY],
            self::ACCOUNT_DUES => ['name' => 'Member dues', 'type' => LedgerAccount::TYPE_INCOME],
            self::ACCOUNT_DONATIONS => ['name' => 'Donations & fundraising', 'type' => LedgerAccount::TYPE_INCOME],
            self::ACCOUNT_GRANTS => ['name' => 'Grants', 'type' => LedgerAccount::TYPE_INCOME],
            self::ACCOUNT_EVENT_FEES => ['name' => 'Event fees & tickets', 'type' => LedgerAccount::TYPE_INCOME],
            '5100' => ['name' => 'Meetings & delegations', 'type' => LedgerAccount::TYPE_EXPENSE],
            '5200' => ['name' => 'Transport', 'type' => LedgerAccount::TYPE_EXPENSE],
            '5300' => ['name' => 'Operations', 'type' => LedgerAccount::TYPE_EXPENSE],
            '5400' => ['name' => 'Procurement & logistics', 'type' => LedgerAccount::TYPE_EXPENSE],
            '5500' => ['name' => 'Department programmes', 'type' => LedgerAccount::TYPE_EXPENSE],
            '5600' => ['name' => 'Other expenses', 'type' => LedgerAccount::TYPE_EXPENSE],
        ];
    }

    /**
     * @return list<array{code: string, name: string, slug: string, mandate: string}>
     */
    public static function operatingDesks(): array
    {
        return [
            ['code' => 'EDU', 'name' => 'Education', 'slug' => 'education', 'mandate' => 'Skills, schooling support, and youth learning programmes.'],
            ['code' => 'INF', 'name' => 'Information', 'slug' => 'information', 'mandate' => 'Communications, records, and public information.'],
            ['code' => 'CUL', 'name' => 'Culture & Sports', 'slug' => 'culture-sports', 'mandate' => 'Heritage, arts, games, and community tournaments.'],
            ['code' => 'GSW', 'name' => 'Gender & Social Welfare', 'slug' => 'gender-social-welfare', 'mandate' => 'Inclusion, welfare cases, and social protection.'],
            ['code' => 'LEG', 'name' => 'Legal Affairs', 'slug' => 'legal-affairs', 'mandate' => 'Compliance, MoUs, and association legal files.'],
            ['code' => 'LOG', 'name' => 'Logistics', 'slug' => 'logistics', 'mandate' => 'Assets, equipment issue, and procurement support.'],
            ['code' => 'EXT', 'name' => 'External Affairs', 'slug' => 'external-affairs', 'mandate' => 'Partners, donors, and stakeholder reporting.'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function snapshot(?User $user = null, ?int $year = null): array
    {
        $year = $year ?: (int) now()->year;

        if (! Schema::hasTable('departments')) {
            return ['year' => $year, 'ready' => false];
        }

        static::ensureStructure($year);
        static::syncLedgers($year);

        $desks = static::departmentRows($year);
        $statement = static::incomeStatement($year);
        $trial = static::trialBalance($year);
        $sheet = static::balanceSheet($trial, $statement);
        $workflow = static::workflow($year);
        $role = $user instanceof User ? $user->amsRole() : 'executive';

        return [
            'year' => $year,
            'ready' => true,
            'architecture' => 'Integrated Association Management System (AMS)',
            'role' => $role,
            'role_label' => $user instanceof User ? $user->amsRoleLabel() : 'Executive Leadership',
            'capabilities' => $user instanceof User ? static::capabilitiesFor($user) : [],
            'focus_department_id' => $user?->department_id,
            'chart_of_accounts' => collect(static::chartOfAccounts())->map(fn (array $account, string $code) => [
                'code' => $code,
                'name' => $account['name'],
                'type' => $account['type'],
            ])->values()->all(),
            'connections' => [
                ['from' => 'Secretariat & Departments', 'to' => 'Central ledger', 'flow' => 'Activity proposals, budget requests, event schedules, and narrative reports.'],
                ['from' => 'Logistics & Admin', 'to' => 'Department budgets', 'flow' => 'Resource checks, asset issue, and procurement requisitions.'],
                ['from' => 'Finance & Treasury', 'to' => 'Executive dashboard', 'flow' => 'Vouchers, income, payments, and financial statements.'],
                ['from' => 'Legal & External Affairs', 'to' => 'Governance files', 'flow' => 'Compliance, MoUs, and donor / stakeholder reporting.'],
            ],
            'layers' => [
                ['id' => 'ledger', 'title' => 'Centralized finance & ledger', 'body' => 'Multi-dimensional tagging (account · department · event) with budget caps, trial balance, and audit trails.'],
                ['id' => 'events', 'title' => 'Event planning & projects', 'body' => 'Work plans, logistics reservation, and ticket revenue posting into the department ledger.'],
                ['id' => 'reports', 'title' => 'Departmental narrative reporting', 'body' => 'Weekly, monthly, and post-event templates rolled into an umbrella leadership view.'],
                ['id' => 'rbac', 'title' => 'Role-based governance', 'body' => 'Secretaries raise work; Finance posts money; Leadership sees the association-wide picture.'],
            ],
            'departments' => $desks,
            'income_statement' => $statement,
            'trial_balance' => $trial,
            'balance_sheet' => $sheet,
            'workflow' => $workflow,
            'reports' => static::narrativeFeed(),
            'audit' => static::auditFeed(),
            'holds' => static::openHolds(),
            'monthly' => \App\Support\MonthlyFinanceReport::lastMonths(6),
        ];
    }

    public static function ensureStructure(?int $year = null): void
    {
        $year = $year ?: (int) now()->year;

        foreach (static::chartOfAccounts() as $code => $account) {
            LedgerAccount::query()->firstOrCreate(
                ['code' => $code],
                ['name' => $account['name'], 'type' => $account['type'], 'is_system' => true]
            );
        }

        Department::withoutEvents(function () use ($year) {
            foreach (static::operatingDesks() as $desk) {
                $department = Department::withTrashed()->firstOrCreate(
                    ['slug' => $desk['slug']],
                    [
                        'name' => $desk['name'],
                        'description' => $desk['mandate'],
                        'status' => 'active',
                        'code' => $desk['code'],
                    ]
                );

                if ($department->trashed()) {
                    $department->restore();
                }

                if ($department->code !== $desk['code'] || $department->status !== 'active') {
                    $department->forceFill([
                        'code' => $desk['code'],
                        'status' => 'active',
                    ])->save();
                }

                DepartmentBudget::query()->firstOrCreate(
                    [
                        'department_id' => $department->id,
                        'year' => $year,
                        'currency' => 'SSP',
                    ],
                    [
                        'amount' => self::DEFAULT_ALLOCATION_SSP,
                        'notes' => 'Annual operating cap for '.$desk['name'],
                    ]
                );
            }
        });
    }

    /**
     * @return array{hold: bool, reason: ?string, remaining: ?float, allocated: ?float}
     */
    public static function evaluateHold(?int $departmentId, float $amount, string $currency, ?int $year = null, ?int $ignoreRequestId = null): array
    {
        $year = $year ?: (int) now()->year;
        $currency = AssociationMoney::currency($currency);

        if (! $departmentId || $amount <= 0 || ! Schema::hasTable('department_budgets')) {
            return ['hold' => false, 'reason' => null, 'remaining' => null, 'allocated' => null];
        }

        $budget = DepartmentBudget::query()
            ->where('department_id', $departmentId)
            ->where('year', $year)
            ->where('currency', $currency)
            ->first();

        if (! $budget) {
            return ['hold' => false, 'reason' => null, 'remaining' => null, 'allocated' => null];
        }

        $allocated = (float) $budget->amount;
        $committed = static::committedSpend($departmentId, $year, $currency, $ignoreRequestId);
        $remaining = round($allocated - $committed, 2);

        if ($amount > $remaining) {
            return [
                'hold' => true,
                'reason' => 'Exceeds remaining '.$currency.' '.number_format($remaining, 2).' allocation for '.$year,
                'remaining' => $remaining,
                'allocated' => $allocated,
            ];
        }

        return ['hold' => false, 'reason' => null, 'remaining' => $remaining, 'allocated' => $allocated];
    }

    public static function committedSpend(int $departmentId, int $year, string $currency, ?int $ignoreRequestId = null): float
    {
        $currency = AssociationMoney::currency($currency);
        $start = Carbon::create($year, 1, 1)->startOfYear();
        $end = $start->copy()->endOfYear();
        $total = 0.0;

        if (Schema::hasTable('association_expenses')) {
            $total += (float) AssociationExpense::query()
                ->where('department_id', $departmentId)
                ->whereYear('spent_at', $year)
                ->whereRaw('upper(currency) = ?', [$currency])
                ->sum('amount');
        }

        if (Schema::hasTable('purchase_requests')) {
            $query = PurchaseRequest::query()
                ->where('department_id', $departmentId)
                ->where('currency', $currency)
                ->whereNotIn('status', [PurchaseRequest::STATUS_REJECTED, PurchaseRequest::STATUS_PAID])
                ->where(function ($q) use ($start, $end) {
                    $q->whereBetween('created_at', [$start, $end])
                        ->orWhereBetween('paid_at', [$start, $end]);
                });

            if ($ignoreRequestId) {
                $query->whereKeyNot($ignoreRequestId);
            }

            $total += (float) $query->sum('amount');
        }

        return round($total, 2);
    }

    public static function syncLedgers(?int $year = null): void
    {
        if (! Schema::hasTable('ledger_journals') || ! Schema::hasTable('ledger_accounts')) {
            return;
        }

        $year = $year ?: (int) now()->year;
        $start = Carbon::create($year, 1, 1)->startOfYear();
        $end = $start->copy()->endOfYear();
        $accounts = LedgerAccount::query()->pluck('id', 'code');

        $seen = [];

        if (Schema::hasTable('youth_memberships')) {
            YouthMembership::query()
                ->where('amount_paid', '>', 0)
                ->whereBetween('paid_at', [$start, $end])
                ->get()
                ->each(function (YouthMembership $fee) use ($accounts, &$seen) {
                    $amount = round((float) $fee->amount_paid, 2);
                    $currency = AssociationMoney::currency($fee->currency);
                    static::post('membership', (int) $fee->id, optional($fee->paid_at)->toDateString() ?: now()->toDateString(), 'Member dues', $currency, [
                        ['code' => self::ACCOUNT_CASH, 'debit' => $amount, 'credit' => 0],
                        ['code' => self::ACCOUNT_DUES, 'debit' => 0, 'credit' => $amount],
                    ], $accounts);
                    $seen[] = 'membership:'.$fee->id.':'.$currency;
                });
        }

        if (Schema::hasTable('donations')) {
            Donation::query()
                ->with('campaign:id,title')
                ->whereBetween('donated_at', [$start, $end])
                ->get()
                ->each(function (Donation $gift) use ($accounts, &$seen) {
                    $amount = round((float) $gift->amount, 2);
                    $currency = AssociationMoney::currency($gift->currency);
                    $grant = str_contains(strtolower((string) $gift->campaign?->title), 'grant');
                    $bank = in_array(strtolower((string) $gift->payment_method), ['bank_transfer', 'bank', 'transfer'], true);
                    static::post('donation', (int) $gift->id, optional($gift->donated_at)->toDateString() ?: now()->toDateString(), 'Donation: '.$gift->donor_name, $currency, [
                        ['code' => $bank ? self::ACCOUNT_BANK : self::ACCOUNT_CASH, 'debit' => $amount, 'credit' => 0],
                        ['code' => $grant ? self::ACCOUNT_GRANTS : self::ACCOUNT_DONATIONS, 'debit' => 0, 'credit' => $amount],
                    ], $accounts);
                    $seen[] = 'donation:'.$gift->id.':'.$currency;
                });
        }

        if (Schema::hasTable('association_expenses')) {
            AssociationExpense::query()
                ->whereBetween('spent_at', [$start, $end])
                ->get()
                ->each(function (AssociationExpense $expense) use ($accounts, &$seen) {
                    $amount = round((float) $expense->amount, 2);
                    $currency = AssociationMoney::currency($expense->currency);
                    static::post('expense', (int) $expense->id, optional($expense->spent_at)->toDateString() ?: now()->toDateString(), $expense->title, $currency, [
                        ['code' => static::expenseAccount($expense->category), 'debit' => $amount, 'credit' => 0, 'department_id' => $expense->department_id],
                        ['code' => self::ACCOUNT_CASH, 'debit' => 0, 'credit' => $amount],
                    ], $accounts);
                    $seen[] = 'expense:'.$expense->id.':'.$currency;
                });
        }

        if (Schema::hasTable('purchase_requests')) {
            PurchaseRequest::query()
                ->where('status', '!=', PurchaseRequest::STATUS_REJECTED)
                ->where(function ($q) use ($start, $end) {
                    $q->whereBetween('created_at', [$start, $end])
                        ->orWhereBetween('paid_at', [$start, $end])
                        ->orWhereBetween('approved_at', [$start, $end]);
                })
                ->get()
                ->each(function (PurchaseRequest $order) use ($accounts, &$seen) {
                    $amount = round((float) $order->amount, 2);
                    if ($amount <= 0) {
                        return;
                    }
                    $currency = AssociationMoney::currency($order->currency);
                    $date = optional($order->paid_at ?: $order->approved_at ?: $order->created_at)->toDateString() ?: now()->toDateString();

                    if ($order->status === PurchaseRequest::STATUS_PAID) {
                        return;
                    } elseif (in_array($order->status, [PurchaseRequest::STATUS_APPROVED, PurchaseRequest::STATUS_REVIEWED], true)) {
                        $lines = [
                            ['code' => '5400', 'debit' => $amount, 'credit' => 0, 'department_id' => $order->department_id, 'event_id' => $order->event_id],
                            ['code' => self::ACCOUNT_PAYABLE, 'debit' => 0, 'credit' => $amount],
                        ];
                    } else {
                        return;
                    }

                    static::post('purchase_request', (int) $order->id, $date, $order->title, $currency, $lines, $accounts);
                    $seen[] = 'purchase_request:'.$order->id.':'.$currency;
                });
        }

        if (Schema::hasTable('association_events')) {
            AssociationEvent::query()
                ->where('ticket_revenue', '>', 0)
                ->where(function ($q) use ($year) {
                    $q->whereYear('event_date', $year)->orWhereYear('created_at', $year);
                })
                ->get()
                ->each(function (AssociationEvent $event) use ($accounts, &$seen) {
                    $amount = round((float) $event->ticket_revenue, 2);
                    $currency = AssociationMoney::currency($event->currency);
                    $date = optional($event->event_date)->toDateString() ?: optional($event->created_at)->toDateString() ?: now()->toDateString();
                    static::post('event_tickets', (int) $event->id, $date, 'Event revenue: '.$event->title, $currency, [
                        ['code' => self::ACCOUNT_CASH, 'debit' => $amount, 'credit' => 0, 'department_id' => $event->department_id, 'event_id' => $event->id],
                        ['code' => self::ACCOUNT_EVENT_FEES, 'debit' => 0, 'credit' => $amount, 'department_id' => $event->department_id, 'event_id' => $event->id],
                    ], $accounts);
                    $seen[] = 'event_tickets:'.$event->id.':'.$currency;
                });
        }

        $orphans = LedgerJournal::query()
            ->whereYear('posted_on', $year)
            ->get()
            ->filter(fn (LedgerJournal $journal) => ! in_array($journal->source_type.':'.$journal->source_id.':'.AssociationMoney::currency($journal->currency), $seen, true));

        if ($orphans->isNotEmpty()) {
            LedgerJournal::query()->whereIn('id', $orphans->pluck('id'))->delete();
        }
    }

    /**
     * @param  list<array{code: string, debit: float, credit: float, department_id?: mixed, event_id?: mixed}>  $lines
     * @param  Collection<string, int>  $accounts
     */
    protected static function post(string $sourceType, int $sourceId, string $date, string $memo, string $currency, array $lines, Collection $accounts): void
    {
        $currency = AssociationMoney::currency($currency);
        $journal = LedgerJournal::query()->updateOrCreate(
            [
                'source_type' => $sourceType,
                'source_id' => $sourceId,
                'currency' => $currency,
            ],
            [
                'reference' => strtoupper($sourceType).'-'.$sourceId,
                'posted_on' => $date,
                'memo' => $memo,
                'posted_by' => auth()->id(),
            ]
        );

        $journal->lines()->delete();

        foreach ($lines as $line) {
            $accountId = $accounts[$line['code']] ?? null;
            if (! $accountId) {
                continue;
            }
            $journal->lines()->create([
                'account_id' => $accountId,
                'department_id' => $line['department_id'] ?? null,
                'event_id' => $line['event_id'] ?? null,
                'debit' => round((float) $line['debit'], 2),
                'credit' => round((float) $line['credit'], 2),
                'memo' => $memo,
            ]);
        }
    }

    protected static function expenseAccount(?string $category): string
    {
        return match ($category) {
            AssociationExpense::CATEGORY_MEETINGS => '5100',
            AssociationExpense::CATEGORY_TRANSPORT => '5200',
            AssociationExpense::CATEGORY_OPERATIONS => '5300',
            AssociationExpense::CATEGORY_PROCUREMENT => '5400',
            default => '5600',
        };
    }

    /**
     * @return list<array<string, mixed>>
     */
    protected static function departmentRows(int $year): array
    {
        $desks = collect(static::operatingDesks())->keyBy('code');
        $departments = Department::query()
            ->whereIn('code', $desks->keys())
            ->with(['head:id,name'])
            ->withCount('users')
            ->orderBy('name')
            ->get()
            ->keyBy('code');

        $events = Schema::hasTable('association_events')
            ? AssociationEvent::query()->select('department_id', DB::raw('count(*) as total'))->groupBy('department_id')->pluck('total', 'department_id')
            : collect();
        $reports = Schema::hasTable('association_reports')
            ? AssociationReport::query()->select('department_id', DB::raw('count(*) as total'))->groupBy('department_id')->pluck('total', 'department_id')
            : collect();
        $orders = Schema::hasTable('purchase_requests')
            ? PurchaseRequest::query()->select('department_id', DB::raw('count(*) as total'))->groupBy('department_id')->pluck('total', 'department_id')
            : collect();

        return $desks->map(function (array $desk) use ($departments, $year, $events, $reports, $orders) {
            $department = $departments->get($desk['code']);
            $allocated = 0.0;
            $committed = 0.0;
            if ($department) {
                $allocated = (float) (DepartmentBudget::query()
                    ->where('department_id', $department->id)
                    ->where('year', $year)
                    ->where('currency', 'SSP')
                    ->value('amount') ?: 0);
                $committed = static::committedSpend((int) $department->id, $year, 'SSP');
            }
            $remaining = round($allocated - $committed, 2);

            return [
                'id' => $department?->id,
                'code' => $desk['code'],
                'name' => $department?->name ?: $desk['name'],
                'mandate' => $desk['mandate'],
                'head' => $department?->head?->name,
                'members' => (int) ($department?->users_count ?? 0),
                'events' => (int) ($events[$department?->id] ?? 0),
                'reports' => (int) ($reports[$department?->id] ?? 0),
                'requisitions' => (int) ($orders[$department?->id] ?? 0),
                'allocated_ssp' => $allocated,
                'committed_ssp' => $committed,
                'remaining_ssp' => $remaining,
                'held' => $remaining < 0,
                'utilization' => $allocated > 0 ? min(100, (int) round(($committed / $allocated) * 100)) : 0,
            ];
        })->values()->all();
    }

    /**
     * @return array<string, mixed>
     */
    protected static function incomeStatement(int $year): array
    {
        $empty = ['ssp' => 0.0, 'usd' => 0.0];
        $bucket = fn () => $empty;

        $income = [
            'dues' => $bucket(),
            'donations' => $bucket(),
            'grants' => $bucket(),
            'event_fees' => $bucket(),
        ];
        $expenses = [
            'meetings' => $bucket(),
            'transport' => $bucket(),
            'operations' => $bucket(),
            'procurement' => $bucket(),
            'other' => $bucket(),
        ];

        if (! Schema::hasTable('ledger_lines')) {
            return [
                'income' => $income,
                'expenses' => $expenses,
                'income_total' => $empty,
                'expense_total' => $empty,
                'surplus' => $empty,
            ];
        }

        $rows = DB::table('ledger_lines')
            ->join('ledger_journals', 'ledger_lines.journal_id', '=', 'ledger_journals.id')
            ->join('ledger_accounts', 'ledger_lines.account_id', '=', 'ledger_accounts.id')
            ->whereYear('ledger_journals.posted_on', $year)
            ->select('ledger_accounts.code', 'ledger_journals.currency', DB::raw('sum(ledger_lines.credit) as credit'), DB::raw('sum(ledger_lines.debit) as debit'))
            ->groupBy('ledger_accounts.code', 'ledger_journals.currency')
            ->get();

        $add = function (array &$target, string $key, string $currency, float $amount) {
            $side = strtoupper($currency) === 'USD' ? 'usd' : 'ssp';
            $target[$key][$side] = round($target[$key][$side] + $amount, 2);
        };

        foreach ($rows as $row) {
            $currency = AssociationMoney::currency($row->currency);
            match ($row->code) {
                self::ACCOUNT_DUES => $add($income, 'dues', $currency, (float) $row->credit),
                self::ACCOUNT_DONATIONS => $add($income, 'donations', $currency, (float) $row->credit),
                self::ACCOUNT_GRANTS => $add($income, 'grants', $currency, (float) $row->credit),
                self::ACCOUNT_EVENT_FEES => $add($income, 'event_fees', $currency, (float) $row->credit),
                '5100' => $add($expenses, 'meetings', $currency, (float) $row->debit),
                '5200' => $add($expenses, 'transport', $currency, (float) $row->debit),
                '5300' => $add($expenses, 'operations', $currency, (float) $row->debit),
                '5400' => $add($expenses, 'procurement', $currency, (float) $row->debit),
                default => str_starts_with((string) $row->code, '5')
                    ? $add($expenses, 'other', $currency, (float) $row->debit)
                    : null,
            };
        }

        $sum = function (array $groups) {
            $ssp = 0.0;
            $usd = 0.0;
            foreach ($groups as $row) {
                $ssp += $row['ssp'];
                $usd += $row['usd'];
            }

            return ['ssp' => round($ssp, 2), 'usd' => round($usd, 2)];
        };

        $incomeTotal = $sum($income);
        $expenseTotal = $sum($expenses);

        return [
            'income' => $income,
            'expenses' => $expenses,
            'income_total' => $incomeTotal,
            'expense_total' => $expenseTotal,
            'surplus' => [
                'ssp' => round($incomeTotal['ssp'] - $expenseTotal['ssp'], 2),
                'usd' => round($incomeTotal['usd'] - $expenseTotal['usd'], 2),
            ],
        ];
    }

    /**
     * @return array{rows: list<array<string, mixed>>, debit_total: array{ssp: float, usd: float}, credit_total: array{ssp: float, usd: float}, balanced: bool}
     */
    protected static function trialBalance(int $year): array
    {
        $accounts = collect(static::chartOfAccounts())->map(fn (array $account, string $code) => [
            'code' => $code,
            'name' => $account['name'],
            'type' => $account['type'],
            'debit_ssp' => 0.0,
            'credit_ssp' => 0.0,
            'debit_usd' => 0.0,
            'credit_usd' => 0.0,
        ]);

        if (Schema::hasTable('ledger_lines')) {
            $rows = DB::table('ledger_lines')
                ->join('ledger_journals', 'ledger_lines.journal_id', '=', 'ledger_journals.id')
                ->join('ledger_accounts', 'ledger_lines.account_id', '=', 'ledger_accounts.id')
                ->whereYear('ledger_journals.posted_on', $year)
                ->select('ledger_accounts.code', 'ledger_journals.currency', DB::raw('sum(ledger_lines.debit) as debit'), DB::raw('sum(ledger_lines.credit) as credit'))
                ->groupBy('ledger_accounts.code', 'ledger_journals.currency')
                ->get();

            foreach ($rows as $row) {
                if (! $accounts->has($row->code)) {
                    continue;
                }
                $item = $accounts->get($row->code);
                $usd = AssociationMoney::currency($row->currency) === 'USD';
                if ($usd) {
                    $item['debit_usd'] = round((float) $row->debit, 2);
                    $item['credit_usd'] = round((float) $row->credit, 2);
                } else {
                    $item['debit_ssp'] = round((float) $row->debit, 2);
                    $item['credit_ssp'] = round((float) $row->credit, 2);
                }
                $accounts->put($row->code, $item);
            }
        }

        $rows = $accounts->values()->all();
        $debitSsp = round(array_sum(array_column($rows, 'debit_ssp')), 2);
        $creditSsp = round(array_sum(array_column($rows, 'credit_ssp')), 2);
        $debitUsd = round(array_sum(array_column($rows, 'debit_usd')), 2);
        $creditUsd = round(array_sum(array_column($rows, 'credit_usd')), 2);

        return [
            'rows' => $rows,
            'debit_total' => ['ssp' => $debitSsp, 'usd' => $debitUsd],
            'credit_total' => ['ssp' => $creditSsp, 'usd' => $creditUsd],
            'balanced' => abs($debitSsp - $creditSsp) < 0.01 && abs($debitUsd - $creditUsd) < 0.01,
        ];
    }

    /**
     * @param  array{rows: list<array<string, mixed>>}  $trial
     * @param  array<string, mixed>  $statement
     * @return array<string, mixed>
     */
    protected static function balanceSheet(array $trial, array $statement): array
    {
        $pick = function (string $code, string $side) use ($trial) {
            $row = collect($trial['rows'])->firstWhere('code', $code) ?: [];

            return [
                'ssp' => (float) ($row[$side.'_ssp'] ?? 0) - (float) ($row[($side === 'debit' ? 'credit' : 'debit').'_ssp'] ?? 0),
                'usd' => (float) ($row[$side.'_usd'] ?? 0) - (float) ($row[($side === 'debit' ? 'credit' : 'debit').'_usd'] ?? 0),
            ];
        };

        $cash = $pick(self::ACCOUNT_CASH, 'debit');
        $bank = $pick(self::ACCOUNT_BANK, 'debit');
        $equipment = $pick(self::ACCOUNT_EQUIPMENT, 'debit');
        $payable = $pick(self::ACCOUNT_PAYABLE, 'credit');
        $assets = [
            'ssp' => round($cash['ssp'] + $bank['ssp'] + $equipment['ssp'], 2),
            'usd' => round($cash['usd'] + $bank['usd'] + $equipment['usd'], 2),
        ];
        $liabilities = $payable;
        $reserves = [
            'ssp' => round($assets['ssp'] - $liabilities['ssp'], 2),
            'usd' => round($assets['usd'] - $liabilities['usd'], 2),
        ];

        return [
            'assets' => [
                'cash' => $cash,
                'bank' => $bank,
                'equipment' => $equipment,
                'total' => $assets,
            ],
            'liabilities' => [
                'payables' => $liabilities,
                'total' => $liabilities,
            ],
            'equity' => [
                'reserves' => $reserves,
                'surplus' => $statement['surplus'] ?? ['ssp' => 0, 'usd' => 0],
                'total' => $reserves,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected static function workflow(int $year): array
    {
        $events = Schema::hasTable('association_events') ? AssociationEvent::query()->whereYear('created_at', $year) : null;
        $orders = Schema::hasTable('purchase_requests') ? PurchaseRequest::query()->whereYear('created_at', $year) : null;
        $reports = Schema::hasTable('association_reports') ? AssociationReport::query()->whereYear('created_at', $year) : null;
        $receipts = Schema::hasTable('association_receipts') ? AssociationReceipt::query()->whereYear('created_at', $year) : null;
        $logistics = Schema::hasTable('logistics_documents') ? LogisticsDocument::query()->whereYear('created_at', $year) : null;
        $tasks = Schema::hasTable('association_tasks') ? AssociationTask::query()->whereYear('created_at', $year) : null;

        $initiation = (int) ($events?->clone()->whereIn('status', ['planning', 'budgeting'])->count() ?? 0)
            + (int) ($orders?->clone()->where('status', PurchaseRequest::STATUS_SUBMITTED)->count() ?? 0);
        $approval = (int) ($orders?->clone()->whereIn('status', [PurchaseRequest::STATUS_REVIEWED, PurchaseRequest::STATUS_APPROVED])->where('budget_hold', false)->count() ?? 0);
        $holds = (int) ($orders?->clone()->where('budget_hold', true)->count() ?? 0);
        $execution = (int) ($events?->clone()->whereIn('status', ['procurement', 'programme', 'execution'])->count() ?? 0)
            + (int) ($orders?->clone()->where('status', PurchaseRequest::STATUS_PAID)->count() ?? 0)
            + (int) ($logistics?->count() ?? 0);
        $reconciliation = (int) ($events?->clone()->whereIn('status', ['reporting', 'done'])->count() ?? 0)
            + (int) ($reports?->count() ?? 0)
            + (int) ($receipts?->count() ?? 0);

        return [
            'steps' => [
                ['id' => 'initiation', 'title' => 'Initiation', 'body' => 'Secretaries submit event & budget requests with dates and itemized costs.', 'count' => $initiation],
                ['id' => 'approval', 'title' => 'Approval', 'body' => 'Legal / Secretariat reviews compliance; Finance checks remaining budget.', 'count' => $approval, 'holds' => $holds],
                ['id' => 'execution', 'title' => 'Execution & procurement', 'body' => 'Logistics issues equipment; Finance disburses against approved invoices.', 'count' => $execution, 'open_tasks' => (int) ($tasks?->where('status', '!=', 'done')->count() ?? 0)],
                ['id' => 'reconciliation', 'title' => 'Post-event reconciliation', 'body' => 'Activity report and receipts close the event budget and refresh the trial balance.', 'count' => $reconciliation],
            ],
            'events' => (int) ($events?->count() ?? 0),
            'open_holds' => $holds,
            'attendance' => (int) (Schema::hasTable('association_events') ? AssociationEvent::query()->whereYear('created_at', $year)->sum('attendance_count') : 0),
            'ticket_revenue_ssp' => (float) (Schema::hasTable('association_events')
                ? AssociationEvent::query()->whereYear('created_at', $year)->whereRaw('upper(currency) = ?', ['SSP'])->sum('ticket_revenue')
                : 0),
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    protected static function narrativeFeed(): array
    {
        if (! Schema::hasTable('association_reports')) {
            return [];
        }

        return AssociationReport::query()
            ->with(['department:id,name,code', 'author:id,name'])
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (AssociationReport $report) => [
                'id' => $report->id,
                'title' => $report->title,
                'period' => $report->period,
                'template' => $report->template ?: 'departmental',
                'department' => $report->department?->name,
                'author' => $report->author?->name,
                'summary' => $report->summary,
                'context' => $report->context,
                'deliverables' => $report->deliverables,
                'challenges' => $report->challenges,
                'attendance' => $report->attendance,
                'financial_summary' => $report->financial_summary,
                'status' => $report->approval_status,
            ])
            ->all();
    }

    /**
     * @return list<array<string, mixed>>
     */
    protected static function auditFeed(): array
    {
        if (! Schema::hasTable('association_receipts')) {
            return [];
        }

        return AssociationReceipt::query()
            ->with(['purchaseRequest:id,title', 'department:id,name'])
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (AssociationReceipt $receipt) => [
                'id' => $receipt->id,
                'title' => $receipt->title,
                'amount' => $receipt->amount,
                'currency' => $receipt->currency,
                'department' => $receipt->department?->name,
                'linked' => $receipt->purchaseRequest?->title,
                'received_on' => optional($receipt->received_on)->format('Y-m-d'),
            ])
            ->all();
    }

    /**
     * @return list<array<string, mixed>>
     */
    protected static function openHolds(): array
    {
        if (! Schema::hasTable('purchase_requests') || ! Schema::hasColumn('purchase_requests', 'budget_hold')) {
            return [];
        }

        return PurchaseRequest::query()
            ->with(['department:id,name,code', 'requester:id,name'])
            ->where('budget_hold', true)
            ->latest()
            ->limit(8)
            ->get()
            ->map(fn (PurchaseRequest $order) => [
                'id' => $order->id,
                'title' => $order->title,
                'amount' => $order->amount,
                'currency' => $order->currency,
                'department' => $order->department?->name,
                'requester' => $order->requester?->name,
                'reason' => $order->hold_reason,
            ])
            ->all();
    }

    /**
     * @return array<string, bool>
     */
    public static function capabilitiesFor(User $user): array
    {
        $role = $user->amsRole();

        return [
            'create_plans' => true,
            'submit_requisitions' => true,
            'upload_reports' => true,
            'view_department_budget' => true,
            'review_requisitions' => $user->canReviewPurchaseOrders(),
            'process_disbursements' => $user->canReleasePayment(),
            'record_income' => $role === User::AMS_ROLE_FINANCE || $role === User::AMS_ROLE_EXECUTIVE,
            'reconcile' => $role === User::AMS_ROLE_FINANCE || $role === User::AMS_ROLE_EXECUTIVE,
            'manage_budgets' => $user->canManageBudgets(),
            'release_holds' => $user->canReleaseBudgetHold(),
            'view_association_ledger' => $user->canViewAssociationLedger(),
            'approve_high_value' => $user->canApprovePurchaseOrders(),
            'export_annual' => $role === User::AMS_ROLE_EXECUTIVE || $role === User::AMS_ROLE_FINANCE,
        ];
    }
}
