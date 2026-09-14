import AppLayout from '@/layouts/app-layout';
import KpiCard from '@/components/admin/KpiCard';
import { AdminRow, AdminTable } from '@/components/admin/AdminTable';
import { BORDER, BLUE, BLUE_SOFT, BROWN, GOLD, GOLD_SOFT, GREEN, GREEN_SOFT, RED, RED_SOFT, TEAL, TEAL_LIGHT } from '@/lib/admin-theme';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { formatSsp, formatUsd } from '@/pages/guest/data/money';
import { Banknote, Download, Landmark, Receipt, Scale, Wallet } from 'lucide-react';

const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)', background: '#fff' };

const MONTHS = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

function yearsAround(year) {
    const current = Number(year) || new Date().getFullYear();
    const list = [];
    for (let value = current + 1; value >= 2024; value -= 1) {
        list.push(value);
    }
    return list;
}

function moneyPair(totals = {}) {
    return `${formatSsp(totals.ssp)} · ${formatUsd(totals.usd)}`;
}

export default function FinancesIndex({
    report = {},
    categories = {},
    departments = [],
    locked_department_id = null,
    can_choose_department = true,
    can_delete_any = false,
    can_manage_budgets = false,
    department_budgets = [],
}) {
    const flash = usePage().props.flash ?? {};
    const user = usePage().props.auth?.user;
    const year = Number(report.year) || new Date().getFullYear();
    const month = Number(report.month) || new Date().getMonth() + 1;
    const categoryEntries = Object.entries(categories);
    const lockedDept = departments.find((dept) => Number(dept.id) === Number(locked_department_id));

    const expense = useForm({
        department_id: locked_department_id || departments[0]?.id || '',
        category: categoryEntries[0]?.[0] || 'operations',
        title: '',
        detail: '',
        amount: '',
        currency: 'ssp',
        spent_at: new Date().toISOString().slice(0, 10),
        year,
        month,
    });

    const changePeriod = (nextYear, nextMonth) => {
        router.get(route('admin.finances.index'), { year: nextYear, month: nextMonth }, { preserveState: true });
    };

    return (
        <AppLayout title="Finances" subtitle={`Income, expenses, and the ${report.label || ''} report`}>
            <Head title="Admin · Finances" />

            <div className="space-y-6">
                {flash.success ? (
                    <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                        {flash.success}
                    </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-2">
                    <select
                        value={month}
                        onChange={(event) => changePeriod(year, event.target.value)}
                        className="min-w-0 flex-1 rounded-xl px-3 py-2 text-sm outline-none sm:flex-none"
                        style={{ border: `1.5px solid ${BORDER}` }}
                        aria-label="Report month"
                    >
                        {MONTHS.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    <select
                        value={year}
                        onChange={(event) => changePeriod(event.target.value, month)}
                        className="min-w-0 flex-1 rounded-xl px-3 py-2 text-sm outline-none sm:flex-none"
                        style={{ border: `1.5px solid ${BORDER}` }}
                        aria-label="Report year"
                    >
                        {yearsAround(year).map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                    <a
                        href={route('admin.finances.export', { year, month })}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                        style={{ background: TEAL }}
                    >
                        <Download className="h-4 w-4" />
                        Export monthly report
                    </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <KpiCard icon={Wallet} accent={BLUE} iconBg={BLUE_SOFT} value={moneyPair(report.income?.membership)} label="Membership fees" />
                    <KpiCard icon={Banknote} accent={BROWN} iconBg={GOLD_SOFT} value={moneyPair(report.income?.fundraising)} label="Donations & fundraising" />
                    <KpiCard icon={Receipt} accent={RED} iconBg={RED_SOFT} value={moneyPair(report.expenses?.total)} label="Expenses" />
                    <KpiCard icon={Scale} accent={GREEN} iconBg={GREEN_SOFT} value={moneyPair(report.balance)} label="Balance" />
                </div>

                {can_manage_budgets && department_budgets.length ? (
                    <div className="rounded-[14px] bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-manrope text-[20px] font-semibold text-brand-ink">Department budget caps</h2>
                        <p className="mt-1 text-sm text-brand-muted">Requisitions above remaining allocation go on automatic hold until Finance releases them.</p>
                        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            {department_budgets.map((desk) => (
                                <div key={desk.code} className="rounded-2xl px-3 py-3" style={{ background: TEAL_LIGHT }}>
                                    <p className="text-[10px] font-semibold tracking-widest text-brand">{desk.code}</p>
                                    <p className="font-semibold text-brand-ink">{desk.name}</p>
                                    <p className="text-xs text-brand-muted">{formatSsp(desk.committed_ssp)} of {formatSsp(desk.allocated_ssp)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                <div className="grid min-w-0 gap-4 lg:grid-cols-2">
                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Income this month</h2>
                        <p className="mt-1 text-sm text-brand-muted">Membership fees plus gifts recorded against fundraising campaigns.</p>
                        <dl className="mt-4 space-y-2 text-sm">
                            <div className="flex min-w-0 justify-between gap-3">
                                <dt className="min-w-0">Membership fees</dt>
                                <dd className="min-w-0 text-right font-semibold break-words">{moneyPair(report.income?.membership)}</dd>
                            </div>
                            <div className="flex min-w-0 justify-between gap-3">
                                <dt className="min-w-0">Donations &amp; fundraising</dt>
                                <dd className="min-w-0 text-right font-semibold break-words">{moneyPair(report.income?.fundraising)}</dd>
                            </div>
                            <div className="flex min-w-0 justify-between gap-3 border-t pt-2" style={{ borderColor: BORDER }}>
                                <dt className="min-w-0">Total income</dt>
                                <dd className="min-w-0 text-right font-semibold break-words" style={{ color: TEAL }}>{moneyPair(report.income?.total)}</dd>
                            </div>
                        </dl>
                        {(report.income?.by_campaign || []).length ? (
                            <div className="mt-4 space-y-1 text-sm">
                                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">By campaign</p>
                                {report.income.by_campaign.map((campaign) => (
                                    <div key={campaign.title} className="flex min-w-0 justify-between gap-3">
                                        <span className="min-w-0">{campaign.title} ({campaign.count})</span>
                                        <span className="min-w-0 text-right break-words">{moneyPair(campaign)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Expenses this month</h2>
                        <p className="mt-1 text-sm text-brand-muted">Meetings, transport, operations, and paid purchase and logistics papers.</p>
                        <dl className="mt-4 space-y-2 text-sm">
                            {(report.expenses?.by_category || []).map((category) => (
                                <div key={category.key} className="flex min-w-0 justify-between gap-3">
                                    <dt className="min-w-0">{category.label}</dt>
                                    <dd className="min-w-0 text-right font-semibold break-words">{moneyPair(category)}</dd>
                                </div>
                            ))}
                            <div className="flex min-w-0 justify-between gap-3 border-t pt-2" style={{ borderColor: BORDER }}>
                                <dt className="min-w-0">Total expenses</dt>
                                <dd className="min-w-0 text-right font-semibold break-words">{moneyPair(report.expenses?.total)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        expense.setData('year', year);
                        expense.setData('month', month);
                        if (locked_department_id) {
                            expense.setData('department_id', locked_department_id);
                        }
                        expense.post(route('admin.finances.expenses.store'), {
                            preserveScroll: true,
                            onSuccess: () => expense.reset('title', 'detail', 'amount'),
                        });
                    }}
                    className="min-w-0 space-y-4 overflow-hidden rounded-2xl bg-white p-5"
                    style={{ border: `1px solid ${BORDER}` }}
                >
                    <div>
                        <h2 className="inline-flex items-center gap-2 font-fraunces text-lg font-semibold text-brand-ink">
                            <Landmark className="h-5 w-5" />
                            Record an expense
                        </h2>
                        <p className="mt-1 text-sm text-brand-muted">
                            Department heads should enter what was spent, the category, and a short detail of the cost.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {can_choose_department ? (
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Department</label>
                                <select className={fieldClass} style={fieldStyle} value={expense.data.department_id} onChange={(e) => expense.setData('department_id', e.target.value)}>
                                    <option value="">Select department…</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                                {expense.errors.department_id ? <p className="mt-1 text-xs text-red-600">{expense.errors.department_id}</p> : null}
                            </div>
                        ) : (
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Department</label>
                                <input className={fieldClass} style={fieldStyle} value={lockedDept?.name || 'Your department'} readOnly />
                                <input type="hidden" value={locked_department_id || ''} />
                            </div>
                        )}
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Category</label>
                            <select className={fieldClass} style={fieldStyle} value={expense.data.category} onChange={(e) => expense.setData('category', e.target.value)}>
                                {categoryEntries.map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Date</label>
                            <input type="date" className={fieldClass} style={fieldStyle} value={expense.data.spent_at} onChange={(e) => expense.setData('spent_at', e.target.value)} required />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Expense</label>
                            <input className={fieldClass} style={fieldStyle} value={expense.data.title} onChange={(e) => expense.setData('title', e.target.value)} placeholder="e.g. Council sitting transport" required />
                            {expense.errors.title ? <p className="mt-1 text-xs text-red-600">{expense.errors.title}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Amount</label>
                            <input type="number" min="0.01" step="0.01" className={fieldClass} style={fieldStyle} value={expense.data.amount} onChange={(e) => expense.setData('amount', e.target.value)} required />
                            {expense.errors.amount ? <p className="mt-1 text-xs text-red-600">{expense.errors.amount}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Currency</label>
                            <select className={fieldClass} style={fieldStyle} value={expense.data.currency} onChange={(e) => expense.setData('currency', e.target.value)}>
                                <option value="ssp">SSP</option>
                                <option value="usd">USD</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-3">
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Detail</label>
                            <textarea
                                className={fieldClass}
                                style={fieldStyle}
                                rows={3}
                                value={expense.data.detail}
                                onChange={(e) => expense.setData('detail', e.target.value)}
                                placeholder="Who travelled, which meeting, or what operational cost this covers"
                                required
                            />
                            {expense.errors.detail ? <p className="mt-1 text-xs text-red-600">{expense.errors.detail}</p> : null}
                        </div>
                    </div>
                    <button type="submit" disabled={expense.processing} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                        {expense.processing ? 'Saving…' : 'Add expense'}
                    </button>
                </form>

                <div>
                    <h2 className="mb-3 font-fraunces text-lg font-semibold text-brand-ink">Expense ledger</h2>
                    <AdminTable columns={['Date', 'Department', 'Category', 'Expense', 'Amount', '']}>
                        {(report.expenses?.items || []).length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-sm text-brand-muted">
                                    No expenses recorded for {report.label}.
                                </td>
                            </tr>
                        ) : (
                            report.expenses.items.map((item) => (
                                <AdminRow key={item.id}>
                                    <td className="px-4 py-3 text-brand-muted">{item.date}</td>
                                    <td className="px-4 py-3">{item.department}</td>
                                    <td className="px-4 py-3">{item.category_label}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-brand-ink">{item.title}</p>
                                        <p className="text-xs text-brand-muted">{item.detail}</p>
                                    </td>
                                    <td className="px-4 py-3 font-semibold">{item.currency === 'USD' ? formatUsd(item.amount) : formatSsp(item.amount)}</td>
                                    <td className="px-4 py-3 text-right">
                                        {(!item.source) && (can_delete_any || item.recorded_by_id === user?.id) ? (
                                            <button
                                                type="button"
                                                className="text-xs font-semibold text-red-600"
                                                onClick={() => {
                                                    if (!confirm('Remove this expense?')) return;
                                                    router.delete(route('admin.finances.expenses.destroy', item.id), {
                                                        data: { year, month },
                                                        preserveScroll: true,
                                                    });
                                                }}
                                            >
                                                Remove
                                            </button>
                                        ) : null}
                                    </td>
                                </AdminRow>
                            ))
                        )}
                    </AdminTable>
                </div>

                <div>
                    <h2 className="mb-3 font-fraunces text-lg font-semibold text-brand-ink">Income this month</h2>
                    <AdminTable columns={['Date', 'Source', 'Description', 'Amount']}>
                        {(report.income?.items || []).length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-10 text-center text-sm text-brand-muted">
                                    No membership fees or fundraising gifts in {report.label}.
                                </td>
                            </tr>
                        ) : (
                            report.income.items.map((item, index) => (
                                <AdminRow key={`${item.type}-${item.date}-${index}`}>
                                    <td className="px-4 py-3 text-brand-muted">{item.date}</td>
                                    <td className="px-4 py-3">
                                        <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: TEAL_LIGHT, color: TEAL }}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{item.description}</td>
                                    <td className="px-4 py-3 font-semibold">{item.currency === 'USD' ? formatUsd(item.amount) : formatSsp(item.amount)}</td>
                                </AdminRow>
                            ))
                        )}
                    </AdminTable>
                </div>
            </div>
        </AppLayout>
    );
}
