import AppLayout from '@/layouts/app-layout';
import KpiCard from '@/components/admin/KpiCard';
import ChartTip from '@/components/admin/ChartTip';
import StatusBadge from '@/components/admin/StatusBadge';
import {
    BORDER,
    BLUE,
    BLUE_SOFT,
    FALLBACK_PAYAMS,
    GOLD,
    GOLD_SOFT,
    GREEN,
    GREEN_SOFT,
    INK,
    MUTED,
    PURPLE,
    PURPLE_SOFT,
    SURFACE,
    TEAL,
    compactSsp,
    compactUsd,
    firstName,
    greetingForHour,
} from '@/lib/admin-theme';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, HeartHandshake, Image, Users } from 'lucide-react';
import AdminChart from '@/components/admin/AdminChart';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function AdminDashboard({
    stats = {},
    charts = {},
    recent_activity = [],
    recent_youth = [],
    recent_messages = [],
    census = {},
    ams = {},
}) {
    const user = usePage().props.auth?.user;
    const statement = ams.income_statement || {};
    const trial = ams.trial_balance || {};
    const sheet = ams.balance_sheet || {};
    const desks = ams.departments || [];
    const financeMonths = ams.monthly?.length ? ams.monthly : [{ month: 'Jan', income: 0, expenses: 0 }];
    const payam = (charts.payam?.length ? charts.payam : FALLBACK_PAYAMS.map((name) => ({ name, total: 0 }))).filter((row) =>
        FALLBACK_PAYAMS.includes(row.name),
    );
    const snapshotPayams = census.payams?.length ? census.payams : payam;
    const raised = Number(stats.donations_usd || 0);
    const target = Number(stats.fundraising_target || 0);
    const raisedPct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : null;
    const ledger = Number(sheet.assets?.total?.ssp ?? statement.surplus?.ssp ?? 0);

    return (
        <AppLayout title="Leadership Dashboard" subtitle={`${ams.year || new Date().getFullYear()} year to date`}>
            <Head title="Executive · Dashboard" />

            <div className="space-y-7">
                <div className="flex min-w-0 flex-wrap items-end justify-between gap-4">
                    <div className="min-w-0 max-w-2xl">
                        <h2 className="font-manrope text-[22px] font-semibold leading-tight sm:text-[28px]" style={{ color: INK }}>
                            {greetingForHour()}, {firstName(user?.name)}
                        </h2>
                        <p className="mt-2 max-w-2xl text-[13px] leading-6" style={{ color: MUTED }}>
                            This dashboard combines the youth census, association finance, departmental operations, and approvals in one leadership view.
                        </p>
                    </div>
                    <span
                        className="inline-flex h-10 shrink-0 items-center rounded-[10px] px-3 text-[13px] font-semibold"
                        style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEAL }}
                    >
                        {ams.year || new Date().getFullYear()} year to date
                    </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <KpiCard
                        icon={Users}
                        accent={BLUE}
                        iconBg={BLUE_SOFT}
                        value={stats.total_executives ?? 0}
                        label="Executive accounts"
                        hint={`${stats.total_departments ?? desks.length} departments`}
                    />
                    <KpiCard
                        icon={Users}
                        accent={GREEN}
                        iconBg={GREEN_SOFT}
                        value={Number(stats.total_youth_members || 0).toLocaleString()}
                        label="Youth census"
                        delta={stats.census_growth}
                        deltaLabel={stats.census_growth == null ? 'Census records' : 'this month'}
                    />
                    <KpiCard
                        icon={HeartHandshake}
                        accent={GOLD}
                        iconBg={GOLD_SOFT}
                        value={compactUsd(raised)}
                        label="Fundraising raised"
                        hint={raisedPct == null ? `${stats.total_donations ?? 0} gifts` : `${raisedPct}% of annual target`}
                    />
                    <KpiCard
                        icon={Image}
                        accent={PURPLE}
                        iconBg={PURPLE_SOFT}
                        value={Number(stats.gallery_items || 0).toLocaleString()}
                        label="Gallery library"
                        hint={`${stats.gallery_items ?? 0} photos and ${stats.video_items ?? 0} videos`}
                    />
                </div>

                <div className="grid min-w-0 gap-4 xl:grid-cols-[1.05fr_1fr]">
                    <article className="overflow-hidden p-5 text-white sm:p-6" style={{ background: TEAL, borderRadius: 14 }}>
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>AMS / ERP</p>
                                <h3 className="font-manrope mt-2 text-[20px] font-semibold">Financial position</h3>
                            </div>
                            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10">
                                <BookOpen className="h-4 w-4" style={{ color: GOLD }} />
                            </span>
                        </div>
                        <p className="font-manrope mt-6 break-words text-[clamp(1.25rem,3vw,1.875rem)] font-semibold leading-tight">{compactSsp(ledger)}</p>
                        <p className="mt-2 text-[13px] text-white/70">Ledger balance</p>
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                            <StatusBadge status={trial.balanced ? 'reconciled' : 'pending'} label={trial.balanced ? 'Reconciled' : 'Needs review'} />
                            <span className="text-[12px] text-white/65">Last close {ams.year || new Date().getFullYear()}</span>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="min-w-0 overflow-hidden rounded-[12px] bg-white/10 p-3">
                                <p className="text-[11px] text-white/60">YTD income</p>
                                <p className="font-manrope mt-1 break-words text-[16px] font-semibold">{compactSsp(statement.income_total?.ssp)}</p>
                            </div>
                            <div className="min-w-0 overflow-hidden rounded-[12px] bg-white/10 p-3">
                                <p className="text-[11px] text-white/60">Expenses</p>
                                <p className="font-manrope mt-1 break-words text-[16px] font-semibold">{compactSsp(statement.expense_total?.ssp)}</p>
                            </div>
                        </div>
                        <p className="mt-5 text-[12px] text-white/65">
                            Memberships, donations, expenses, and approved purchase orders post into the central ledger automatically.
                        </p>
                    </article>

                    <article className="min-w-0 bg-white p-5" style={{ border: `1px solid ${BORDER}`, borderRadius: 14 }}>
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h3 className="font-manrope text-[20px] font-semibold" style={{ color: INK }}>Income and expenses</h3>
                                <p className="mt-1 text-[12px]" style={{ color: MUTED }}>Six-month SSP movement</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-[11px]" style={{ color: MUTED }}>
                                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: GREEN }} /> Income</span>
                                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: GOLD }} /> Expenses</span>
                            </div>
                        </div>
                        <AdminChart height={256}>
                            <BarChart data={financeMonths} barGap={4} barCategoryGap="28%">
                                <CartesianGrid vertical={false} stroke={BORDER} strokeDasharray="3 3" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11, fontFamily: 'Inter' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11, fontFamily: 'Inter' }} />
                                <Tooltip content={<ChartTip />} cursor={{ fill: SURFACE }} />
                                <Bar dataKey="income" name="Income" fill={GREEN} radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expenses" name="Expenses" fill={GOLD} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </AdminChart>
                    </article>
                </div>

                <div className="grid min-w-0 gap-4 xl:grid-cols-[1.4fr_0.8fr]">
                    <article className="min-w-0 overflow-hidden bg-white p-5" style={{ border: `1px solid ${BORDER}`, borderRadius: 14 }}>
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h3 className="font-manrope text-[20px] font-semibold" style={{ color: INK }}>Operating desks</h3>
                                <p className="mt-1 text-[12px]" style={{ color: MUTED }}>Annual SSP caps, live commitments, events, requisitions, and reports.</p>
                            </div>
                            <Link href={route('admin.operations.index')} className="text-[12px] font-semibold" style={{ color: TEAL }}>Open operations →</Link>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {desks.map((desk) => (
                                <div key={desk.code} className="min-w-0 overflow-hidden p-4" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14 }}>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[10px] font-semibold tracking-widest" style={{ color: TEAL }}>{desk.code}</p>
                                        {desk.held ? <span className="text-[10px] font-semibold uppercase" style={{ color: '#C94B4B' }}>Hold</span> : null}
                                    </div>
                                    <p className="font-manrope mt-1 text-[15px] font-semibold" style={{ color: INK }}>{desk.name}</p>
                                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, desk.utilization || 0)}%`, background: desk.held ? '#C94B4B' : GREEN }} />
                                    </div>
                                    <p className="mt-2 text-[11px]" style={{ color: MUTED }}>{compactSsp(desk.committed_ssp)} of {compactSsp(desk.allocated_ssp)}</p>
                                    <p className="mt-1 text-[11px]" style={{ color: MUTED }}>{desk.events} events · {desk.requisitions} POs · {desk.reports} {desk.reports === 1 ? 'report' : 'reports'}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="min-w-0 overflow-hidden bg-white p-5" style={{ border: `1px solid ${BORDER}`, borderRadius: 14 }}>
                        <h3 className="font-manrope text-[20px] font-semibold" style={{ color: INK }}>Recent activity</h3>
                        <ul className="mt-4 space-y-3">
                            {(recent_activity.length ? recent_activity : recent_youth).slice(0, 6).map((entry, i) => (
                                <li key={entry.id || i} className="rounded-[12px] px-3 py-2.5" style={{ background: SURFACE }}>
                                    {entry.kind ? (
                                        <span className="mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: GREEN_SOFT, color: GREEN }}>
                                            {entry.kind}
                                        </span>
                                    ) : null}
                                    <p className="text-[13px] font-medium" style={{ color: INK }}>
                                        {entry.description || `${entry.first_name ?? ''} ${entry.last_name ?? ''}`.trim() || entry.name}
                                    </p>
                                    <p className="text-[12px]" style={{ color: MUTED }}>
                                        {entry.user?.name || entry.county || recent_messages[i]?.name || 'System'}
                                    </p>
                                </li>
                            ))}
                            {recent_activity.length === 0 && recent_youth.length === 0 ? (
                                <li className="text-sm" style={{ color: MUTED }}>Activity will appear as the association grows.</li>
                            ) : null}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-3 text-[12px] font-semibold">
                            <Link href={route('admin.youth-members.index')} style={{ color: TEAL }}>View census →</Link>
                            <Link href={route('admin.finances.index')} style={{ color: TEAL }}>Finance desk →</Link>
                        </div>
                        {snapshotPayams.length ? (
                            <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                                <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>Youth by payam</p>
                                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {snapshotPayams.map((row) => (
                                        <div key={row.name} className="min-w-0">
                                            <p className="font-manrope text-[18px] font-semibold" style={{ color: INK }}>{row.total}</p>
                                            <p className="text-[11px]" style={{ color: MUTED }}>{row.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </article>
                </div>
            </div>
        </AppLayout>
    );
}
