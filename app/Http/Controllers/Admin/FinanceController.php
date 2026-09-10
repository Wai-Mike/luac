<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssociationExpense;
use App\Models\Department;
use App\Models\User;
use App\Support\ExcelWorkbook;
use App\Support\MonthlyFinanceReport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FinanceController extends Controller
{
    public function index(Request $request): Response
    {
        [$year, $month] = $this->period($request);
        $user = $request->user();

        return Inertia::render('admin/finances/index', [
            'report' => MonthlyFinanceReport::forMonth($year, $month),
            'categories' => AssociationExpense::categories(),
            'departments' => Department::query()->orderBy('name')->get(['id', 'name']),
            'locked_department_id' => $this->lockedDepartmentId($user),
            'can_choose_department' => $this->canChooseDepartment($user),
            'can_delete_any' => $user instanceof User && $user->canEditContent(),
        ]);
    }

    public function storeExpense(Request $request): RedirectResponse
    {
        $user = $request->user();
        $locked = $this->lockedDepartmentId($user);
        $request->merge([
            'department_id' => $request->input('department_id') ?: $locked,
        ]);

        $data = $request->validate([
            'department_id' => [
                $this->canChooseDepartment($user) ? 'nullable' : 'required',
                'integer',
                Rule::exists('departments', 'id'),
            ],
            'category' => ['required', 'string', Rule::in(array_keys(AssociationExpense::categories()))],
            'title' => ['required', 'string', 'max:255'],
            'detail' => ['required', 'string', 'max:2000'],
            'amount' => ['required', 'numeric', 'min:0.01', 'max:9999999'],
            'currency' => ['required', 'string', 'in:ssp,usd'],
            'spent_at' => ['required', 'date'],
            'year' => ['nullable', 'integer'],
            'month' => ['nullable', 'integer'],
        ]);

        AssociationExpense::query()->create([
            'department_id' => $locked ?: ($data['department_id'] ?? null),
            'recorded_by' => $user?->id,
            'category' => $data['category'],
            'title' => $data['title'],
            'detail' => $data['detail'],
            'amount' => $data['amount'],
            'currency' => $data['currency'],
            'spent_at' => $data['spent_at'],
        ]);

        return redirect()
            ->route('admin.finances.index', $this->periodQuery($request))
            ->with('success', 'Expense recorded.');
    }

    public function destroyExpense(Request $request, AssociationExpense $associationExpense): RedirectResponse
    {
        $user = $request->user();
        $allowed = $user instanceof User && ($user->canEditContent() || (int) $associationExpense->recorded_by === (int) $user->id);

        abort_unless($allowed, 403);

        $associationExpense->delete();

        return redirect()
            ->route('admin.finances.index', $this->periodQuery($request))
            ->with('success', 'Expense removed.');
    }

    public function export(Request $request): StreamedResponse
    {
        [$year, $month] = $this->period($request);
        $report = MonthlyFinanceReport::forMonth($year, $month);

        $summaryRows = [
            ['Income', '', '', ''],
            ['Membership fees', $report['income']['membership']['ssp'], 'SSP', $report['income']['membership']['usd'].' USD'],
            ['Donations & fundraising', $report['income']['fundraising']['ssp'], 'SSP', $report['income']['fundraising']['usd'].' USD'],
            ['Total income', $report['income']['total']['ssp'], 'SSP', $report['income']['total']['usd'].' USD'],
            ['', '', '', ''],
            ['Expenses', '', '', ''],
        ];

        foreach ($report['expenses']['by_category'] as $category) {
            $summaryRows[] = [$category['label'], $category['ssp'], 'SSP', $category['usd'].' USD'];
        }

        $summaryRows[] = ['Total expenses', $report['expenses']['total']['ssp'], 'SSP', $report['expenses']['total']['usd'].' USD'];
        $summaryRows[] = ['', '', '', ''];
        $summaryRows[] = ['Balance', $report['balance']['ssp'], 'SSP', $report['balance']['usd'].' USD'];

        $incomeRows = collect($report['income']['items'])->map(fn (array $item) => [
            $item['date'],
            $item['type'],
            $item['description'],
            $item['amount'],
            $item['currency'],
        ])->all();

        $expenseRows = collect($report['expenses']['items'])->map(fn (array $item) => [
            $item['date'],
            $item['department'],
            $item['category_label'],
            $item['title'],
            $item['detail'],
            $item['amount'],
            $item['currency'],
            $item['recorded_by'],
        ])->all();

        $xml = ExcelWorkbook::workbook([
            [
                'name' => 'Summary',
                'headers' => ['LAYYA financial report · '.$report['label'], 'SSP', 'Unit', 'USD'],
                'rows' => $summaryRows,
            ],
            [
                'name' => 'Income',
                'headers' => ['Date', 'Source', 'Description', 'Amount', 'Currency'],
                'rows' => $incomeRows,
            ],
            [
                'name' => 'Expenses',
                'headers' => ['Date', 'Department', 'Category', 'Expense', 'Detail', 'Amount', 'Currency', 'Recorded by'],
                'rows' => $expenseRows,
            ],
        ]);

        $filename = 'layya-finance-'.$year.'-'.str_pad((string) $month, 2, '0', STR_PAD_LEFT).'.xls';

        return response()->streamDownload(function () use ($xml) {
            echo $xml;
        }, $filename, [
            'Content-Type' => 'application/vnd.ms-excel; charset=UTF-8',
        ]);
    }

    /**
     * @return array{0: int, 1: int}
     */
    protected function period(Request $request): array
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);

        $year = max(2020, min(2100, $year));
        $month = max(1, min(12, $month));

        return [$year, $month];
    }

    /**
     * @return array{year: int, month: int}
     */
    protected function periodQuery(Request $request): array
    {
        [$year, $month] = $this->period($request);

        return ['year' => $year, 'month' => $month];
    }

    protected function canChooseDepartment(?User $user): bool
    {
        return $user instanceof User && ($user->canEditContent() || ! $user->department_id);
    }

    protected function lockedDepartmentId(?User $user): ?int
    {
        if (! $user instanceof User || $this->canChooseDepartment($user)) {
            return null;
        }

        return $user->department_id ? (int) $user->department_id : null;
    }
}
