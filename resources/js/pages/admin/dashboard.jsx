import AppLayout from '@/layouts/app-layout';
import KpiCard from '@/components/admin/KpiCard';
import ChartTip from '@/components/admin/ChartTip';
import { BORDER, CAT, FALLBACK_PAYAMS, MUTED, SURFACE, TEAL, TEAL_PALE } from '@/lib/admin-theme';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, HeartHandshake, Image, Users } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function money(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
        Number(amount || 0),
    );
}

export default function AdminDashboard({
    stats = {},
    charts = {},
    recent_activity = [],
    recent_youth = [],
    recent_messages = [],
}) {
    const monthly = charts.monthly?.length ? charts.monthly : [{ month: 'Jan', count: 0 }];
    const gender = charts.gender?.length ? charts.gender : [{ name: 'No data', value: 1 }];
    const genderTotal = gender.reduce((sum, row) => sum + Number(row.value || 0), 0) || 1;
    const payam = charts.payam?.length
        ? charts.payam
        : FALLBACK_PAYAMS.map((name, i) => ({ name, total: [42, 31, 24, 18, 14, 11, 8][i] }));

    return (
        <AppLayout title="Dashboard Overview" subtitle="LAYYA performance at a glance · Updated today">
            <Head title="Executive · Dashboard" />

            <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <KpiCard icon={Users} value={stats.total_executives ?? 0} label="Executives" delta={4} />
                    <KpiCard icon={GraduationCap} value={stats.total_youth_members ?? 0} label="Youth members" hint="Census records" delta={12} />
                    <KpiCard icon={HeartHandshake} value={money(stats.donations_usd)} label="Raised (USD)" hint={`${stats.total_donations ?? 0} gifts`} delta={8} />
                    <KpiCard icon={Image} value={stats.gallery_items ?? 0} label="Gallery photos" hint={`${stats.video_items ?? 0} videos`} />
                </div>

                <div className="grid min-w-0 gap-4 lg:grid-cols-3">
                    <div className="min-w-0 rounded-2xl bg-white p-4 sm:p-5 lg:col-span-2" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Monthly registrations</h2>
                        <p className="mb-4 text-xs text-brand-muted">Youth census sign-ups over the last year</p>
                        <div className="h-56 min-w-0 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthly}>
                                    <CartesianGrid vertical={false} stroke="rgba(0,77,77,0.1)" strokeDasharray="3 3" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11, fontFamily: 'Instrument Sans' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11, fontFamily: 'Instrument Sans' }} />
                                    <Tooltip content={<ChartTip />} cursor={{ stroke: BORDER, strokeWidth: 1 }} />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke={TEAL}
                                        strokeWidth={2.5}
                                        dot={{ r: 4, fill: TEAL, stroke: '#fff', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: TEAL, stroke: '#fff', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="min-w-0 rounded-2xl bg-white p-4 sm:p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Gender distribution</h2>
                        <div className="mx-auto h-48 min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={gender} dataKey="value" innerRadius={50} outerRadius={72} paddingAngle={2} strokeWidth={0}>
                                        {gender.map((entry, i) => (
                                            <Cell key={entry.name} fill={CAT[i % CAT.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<ChartTip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <ul className="space-y-2">
                            {gender.map((row, i) => (
                                <li key={row.name} className="flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-2 text-brand-muted">
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: CAT[i % CAT.length] }} />
                                        {row.name}
                                    </span>
                                    <span className="font-semibold text-brand-ink">
                                        {Math.round((Number(row.value || 0) / genderTotal) * 100)}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="grid min-w-0 gap-4 lg:grid-cols-3">
                    <div className="min-w-0 rounded-2xl bg-white p-4 sm:p-5 lg:col-span-2" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Youth by payam</h2>
                        <div className="mt-4 h-56 min-w-0 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={payam} barSize={22} barCategoryGap="30%">
                                    <CartesianGrid vertical={false} stroke="rgba(0,77,77,0.1)" strokeDasharray="3 3" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 10, fontFamily: 'Instrument Sans' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
                                    <Tooltip content={<ChartTip />} cursor={{ fill: TEAL_PALE }} />
                                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                                        {payam.map((entry, i) => (
                                            <Cell key={entry.name} fill={i === 0 ? TEAL : `${TEAL}80`} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="min-w-0 rounded-2xl bg-white p-4 sm:p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Activity</h2>
                        <ul className="mt-4 space-y-3">
                            {(recent_activity.length ? recent_activity : recent_youth).slice(0, 6).map((entry, i) => (
                                <li key={entry.id || i} className="rounded-xl px-3 py-2" style={{ background: SURFACE }}>
                                    <p className="text-sm font-medium text-brand-ink">
                                        {entry.description || `${entry.first_name ?? ''} ${entry.last_name ?? ''}`.trim() || entry.name}
                                    </p>
                                    <p className="text-xs text-brand-muted">
                                        {entry.user?.name || entry.county || recent_messages[i]?.name || 'System'}
                                    </p>
                                </li>
                            ))}
                            {recent_activity.length === 0 && recent_youth.length === 0 ? (
                                <li className="text-sm text-brand-muted">Activity will appear as the association grows.</li>
                            ) : null}
                        </ul>
                        <Link href={route('admin.youth-members.index')} className="mt-4 inline-block text-xs font-semibold" style={{ color: TEAL }}>
                            View census →
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
