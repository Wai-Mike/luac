import { Link, useForm } from '@inertiajs/react';
import { BORDER, GOLD, SURFACE, TEAL, TEAL_PALE } from '@/lib/admin-theme';
import { formatSsp, formatUsd } from '@/pages/guest/data/money';
import {
    ClipboardCheck,
    Landmark,
    Scale,
    ShieldCheck,
    Workflow,
} from 'lucide-react';

function pair(totals = {}) {
    return `${formatSsp(totals.ssp)} · ${formatUsd(totals.usd)}`;
}

const ROLES = [
    {
        id: 'department_secretary',
        title: 'Department Secretaries',
        body: 'Create event plans, submit requisitions, upload activity reports, and watch their remaining budget.',
    },
    {
        id: 'finance',
        title: 'Finance Officer / Treasurer',
        body: 'Review requisitions, process disbursements, record income, reconcile the books, and issue statements.',
    },
    {
        id: 'executive',
        title: 'Executive Leadership',
        body: 'See association-wide finances, approve high-value budgets, and export compiled annual reports.',
    },
];

export default function AmsOverview({ ams = {} }) {
    if (!ams?.ready) {
        return null;
    }

    const statement = ams.income_statement || {};
    const trial = ams.trial_balance || {};
    const sheet = ams.balance_sheet || {};
    const workflow = ams.workflow?.steps || [];
    const departments = ams.departments || [];
    const capabilities = ams.capabilities || {};

    return (
        <section className="space-y-4">
            <article className="overflow-hidden rounded-[14px] text-white" style={{ background: TEAL }}>
                <div className="grid min-w-0 gap-6 p-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:p-7">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Integrated AMS / ERP</p>
                        <h2 className="font-manrope mt-2 text-2xl md:text-3xl">One platform for administration, departments, and finance</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
                            Education, Information, Culture &amp; Sports, Gender &amp; Social Welfare, Legal Affairs, Logistics, and External Affairs post activity and money into a central ledger. You are signed in as {ams.role_label}.
                        </p>
                    </div>
                    <div className="grid min-w-0 grid-cols-2 gap-3">
                        <MiniStat label="Income YTD" value={pair(statement.income_total)} />
                        <MiniStat label="Expenses YTD" value={pair(statement.expense_total)} />
                        <MiniStat label="Net reserves" value={pair(sheet.equity?.reserves)} />
                        <MiniStat label="Trial balance" value={trial.balanced ? 'In balance' : 'Needs review'} />
                    </div>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-4">
                    {(ams.layers || []).map((layer) => (
                        <div key={layer.id} className="p-4" style={{ background: TEAL }}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: GOLD }}>{layer.title}</p>
                            <p className="mt-2 text-xs leading-5 text-white/75">{layer.body}</p>
                        </div>
                    ))}
                </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(ams.connections || []).map((item) => (
                    <article key={item.from} className="rounded-2xl bg-white p-4" style={{ border: `1px solid ${BORDER}` }}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">{item.from}</p>
                        <p className="mt-2 text-sm font-semibold text-brand-ink">{item.to}</p>
                        <p className="mt-1 text-xs leading-5 text-brand-muted">{item.flow}</p>
                    </article>
                ))}
            </div>

            <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Department connections</h3>
                        <p className="text-xs text-brand-muted">Annual SSP caps, live commitments, events, requisitions, and reports.</p>
                    </div>
                    <Link href={route('admin.operations.index')} className="text-xs font-semibold" style={{ color: TEAL }}>Open operations →</Link>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {departments.map((desk) => (
                        <div
                            key={desk.code}
                            className="rounded-2xl p-4"
                            style={{
                                background: Number(desk.id) === Number(ams.focus_department_id) ? TEAL_PALE : SURFACE,
                                border: `1px solid ${BORDER}`,
                            }}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-[10px] font-semibold tracking-widest text-brand">{desk.code}</p>
                                {desk.held ? <span className="text-[10px] font-semibold uppercase text-red-700">Over cap</span> : null}
                            </div>
                            <p className="mt-1 font-fraunces text-base font-semibold text-brand-ink">{desk.name}</p>
                            <p className="mt-1 text-[11px] leading-4 text-brand-muted">{desk.mandate}</p>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                                <div className="h-full rounded-full" style={{ width: `${desk.utilization || 0}%`, background: desk.held ? '#c62828' : TEAL }} />
                            </div>
                            <p className="mt-2 text-[11px] text-brand-muted">{formatSsp(desk.committed_ssp)} of {formatSsp(desk.allocated_ssp)}</p>
                            <p className="mt-1 text-[11px] text-brand-muted">{desk.events} events · {desk.requisitions} POs · {desk.reports} reports</p>
                        </div>
                    ))}
                </div>
            </article>

            <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                    <div className="mb-4 flex items-center gap-2">
                        <Landmark className="h-4 w-4" style={{ color: TEAL }} />
                        <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Statement of activities · {ams.year}</h3>
                    </div>
                    <StatementRow label="Member dues" value={statement.income?.dues} />
                    <StatementRow label="Donations & fundraising" value={statement.income?.donations} />
                    <StatementRow label="Grants" value={statement.income?.grants} />
                    <StatementRow label="Event fees & tickets" value={statement.income?.event_fees} />
                    <StatementRow label="Total income" value={statement.income_total} strong />
                    <div className="my-3 h-px" style={{ background: BORDER }} />
                    <StatementRow label="Meetings & delegations" value={statement.expenses?.meetings} />
                    <StatementRow label="Transport" value={statement.expenses?.transport} />
                    <StatementRow label="Operations" value={statement.expenses?.operations} />
                    <StatementRow label="Procurement & logistics" value={statement.expenses?.procurement} />
                    <StatementRow label="Other expenses" value={statement.expenses?.other} />
                    <StatementRow label="Total expenses" value={statement.expense_total} strong />
                    <StatementRow label="Surplus / (deficit)" value={statement.surplus} strong accent />
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link href={route('admin.finances.index')} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }}>Finance desk</Link>
                        <a href={route('admin.finances.export')} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL, border: `1px solid ${BORDER}` }}>Export statements</a>
                    </div>
                </article>

                <div className="space-y-4">
                    <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="mb-3 flex items-center gap-2">
                            <Scale className="h-4 w-4" style={{ color: TEAL }} />
                            <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Balance sheet</h3>
                        </div>
                        <StatementRow label="Cash on hand" value={sheet.assets?.cash} />
                        <StatementRow label="Bank accounts" value={sheet.assets?.bank} />
                        <StatementRow label="Equipment inventory" value={sheet.assets?.equipment} />
                        <StatementRow label="Total assets" value={sheet.assets?.total} strong />
                        <StatementRow label="Accounts payable" value={sheet.liabilities?.payables} />
                        <StatementRow label="Net reserves" value={sheet.equity?.reserves} strong accent />
                    </article>
                    <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Trial balance</h3>
                        <p className="mt-1 text-xs text-brand-muted">
                            Debits {pair(trial.debit_total)} · Credits {pair(trial.credit_total)} · {trial.balanced ? 'Books are in balance before monthly close.' : 'Debits and credits do not yet match.'}
                        </p>
                        <div className="mt-3 max-h-48 space-y-1 overflow-y-auto text-[11px]">
                            {(trial.rows || []).filter((row) => Number(row.debit_ssp) || Number(row.credit_ssp) || Number(row.debit_usd) || Number(row.credit_usd)).map((row) => (
                                <div key={row.code} className="flex min-w-0 justify-between gap-3 rounded-lg px-2 py-1" style={{ background: SURFACE }}>
                                    <span className="min-w-0 text-brand-muted">{row.code} {row.name}</span>
                                    <span className="min-w-0 text-right break-words tabular-nums text-brand-ink">{row.debit_ssp || row.debit_usd ? pair({ ssp: row.debit_ssp, usd: row.debit_usd }) : pair({ ssp: row.credit_ssp, usd: row.credit_usd })}</span>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </div>

            <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                <div className="mb-4 flex items-center gap-2">
                    <Workflow className="h-4 w-4" style={{ color: TEAL }} />
                    <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Unified operational workflow</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {workflow.map((step, index) => (
                        <div key={step.id} className="rounded-2xl p-4" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">0{index + 1} {step.title}</p>
                            <p className="mt-2 font-fraunces text-2xl text-brand-ink">{step.count}</p>
                            <p className="mt-2 text-xs leading-5 text-brand-muted">{step.body}</p>
                            {step.holds ? <p className="mt-2 text-[11px] font-semibold text-red-700">{step.holds} on budget hold</p> : null}
                        </div>
                    ))}
                </div>
            </article>

            <div className="grid gap-4 lg:grid-cols-3">
                <article className="rounded-2xl bg-white p-5 lg:col-span-2" style={{ border: `1px solid ${BORDER}` }}>
                    <div className="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <ClipboardCheck className="h-4 w-4" style={{ color: TEAL }} />
                            <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Narrative reports</h3>
                        </div>
                        <Link href={route('admin.operations.index')} className="text-xs font-semibold" style={{ color: TEAL }}>Templates →</Link>
                    </div>
                    {(ams.reports || []).length === 0 ? (
                        <p className="text-sm text-brand-muted">Weekly, monthly, and post-event reports will collect here for board review.</p>
                    ) : (
                        <ul className="space-y-3">
                            {ams.reports.map((report) => (
                                <li key={report.id} className="rounded-xl px-3 py-2" style={{ background: SURFACE }}>
                                    <p className="text-sm font-semibold text-brand-ink">{report.title}</p>
                                    <p className="text-[11px] text-brand-muted">{report.department || 'Association'} · {report.template} · {report.period || 'Open period'}</p>
                                    <p className="mt-1 text-xs text-brand-muted">{report.summary}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </article>
                <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                    <div className="mb-3 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" style={{ color: TEAL }} />
                        <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Audit trail</h3>
                    </div>
                    {(ams.audit || []).length === 0 ? (
                        <p className="text-sm text-brand-muted">Receipts attached to expenses will appear as an immutable payment trail.</p>
                    ) : (
                        <ul className="space-y-2 text-xs">
                            {ams.audit.map((item) => (
                                <li key={item.id} className="rounded-xl px-3 py-2" style={{ background: SURFACE }}>
                                    <p className="font-semibold text-brand-ink">{item.title}</p>
                                    <p className="text-brand-muted">{item.amount} {item.currency} · {item.linked || item.department || 'Unassigned'}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                    {(ams.holds || []).length ? (
                        <div className="mt-4 space-y-2">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-red-700">Budget holds</p>
                            {ams.holds.map((item) => (
                                <p key={item.id} className="text-xs text-brand-muted">{item.title} · {item.amount} {item.currency}</p>
                            ))}
                        </div>
                    ) : null}
                </article>
            </div>

            <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">Role-based access</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {ROLES.map((item) => (
                        <div key={item.id} className="rounded-2xl p-4" style={{ background: ams.role === item.id || (item.id === 'executive' && ams.role === 'secretariat') ? TEAL_PALE : SURFACE, border: `1px solid ${BORDER}` }}>
                            <p className="text-sm font-semibold text-brand-ink">{item.title}</p>
                            <p className="mt-2 text-xs leading-5 text-brand-muted">{item.body}</p>
                        </div>
                    ))}
                </div>
                {capabilities.manage_budgets ? <BudgetForm departments={departments} year={ams.year} /> : null}
            </article>
        </section>
    );
}

function MiniStat({ label, value }) {
    return (
        <div className="min-w-0 overflow-hidden rounded-2xl bg-white/10 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/55">{label}</p>
            <p className="font-manrope mt-1 break-words text-[clamp(0.8rem,1.6vw,1.125rem)] leading-tight text-white">{value}</p>
        </div>
    );
}

function StatementRow({ label, value, strong = false, accent = false }) {
    return (
        <div className="flex min-w-0 items-start justify-between gap-3 py-1.5 text-sm">
            <span className={`min-w-0 ${strong ? 'font-semibold text-brand-ink' : 'text-brand-muted'}`}>{label}</span>
            <span className="min-w-0 max-w-[55%] text-right break-words tabular-nums font-semibold" style={{ color: accent ? TEAL : undefined }}>{pair(value)}</span>
        </div>
    );
}

function BudgetForm({ departments, year }) {
    const form = useForm({
        department_id: departments[0]?.id || '',
        year,
        amount: departments[0]?.allocated_ssp || '',
        currency: 'SSP',
        notes: '',
    });

    return (
        <form
            className="mt-4 grid min-w-0 gap-2 overflow-hidden rounded-2xl p-4 sm:grid-cols-[minmax(0,1fr)_8rem_auto]"
            style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
            onSubmit={(e) => {
                e.preventDefault();
                form.post(route('admin.finances.budgets.update'), { preserveScroll: true });
            }}
        >
            <select className="rounded-xl px-3 py-2 text-sm" style={{ border: `1.5px solid ${BORDER}` }} value={form.data.department_id} onChange={(e) => form.setData('department_id', e.target.value)}>
                {departments.map((desk) => (
                    <option key={desk.code} value={desk.id}>{desk.name}</option>
                ))}
            </select>
            <input type="number" className="rounded-xl px-3 py-2 text-sm" style={{ border: `1.5px solid ${BORDER}` }} value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} placeholder="SSP cap" />
            <button type="submit" disabled={form.processing} className="rounded-full px-4 py-2 text-xs font-semibold text-white" style={{ background: TEAL }}>Save allocation</button>
        </form>
    );
}
