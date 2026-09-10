import AppLayout from '@/layouts/app-layout';
import KpiCard from '@/components/admin/KpiCard';
import ChartTip from '@/components/admin/ChartTip';
import { AdminRow, AdminTable, PaginationBar } from '@/components/admin/AdminTable';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, CAT, CAT_LIGHT, FALLBACK_PAYAMS, MUTED, TEAL, TEAL_LIGHT, TEAL_PALE, initials } from '@/lib/admin-theme';
import { Head, Link, router } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';
import { BookOpen, Download, Edit2, Eye, GraduationCap, MapPin, Trash2, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function YouthCensusIndex({ members, filters = {}, charts = {} }) {
    const { canEditContent } = useCapabilities();
    const rows = paginatorItems(members);
    const meta = members && !Array.isArray(members) ? members : null;
    const search = filters.search || '';
    const payam = (charts.byPayam || []).map((row) => ({ name: row.name || row.payam, total: Number(row.total || 0) }));
    const chartData = payam.length ? payam : FALLBACK_PAYAMS.map((name, i) => ({ name, total: [42, 31, 24, 18, 14, 11, 8][i] }));

    const onSearch = (e) => {
        e.preventDefault();
        const q = new FormData(e.target).get('search') || '';
        router.get('/admin/youth-members', q ? { search: q } : {}, { preserveState: true });
    };

    return (
        <AppLayout title="Youth Members" subtitle="Census records for Luac Akook Yieu">
            <Head title="Admin · Youth Members" />

            <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <KpiCard icon={Users} value={meta?.total ?? rows.length} label="Registered" />
                    <KpiCard icon={GraduationCap} value={charts.byGender?.length ?? 0} label="Gender groups" />
                    <KpiCard icon={MapPin} value={charts.byCounty?.[0]?.total ?? 0} label="Largest county" hint={charts.byCounty?.[0]?.county || '—'} />
                    <KpiCard icon={BookOpen} value={charts.byEducation?.[0]?.total ?? 0} label="Top education" hint={charts.byEducation?.[0]?.education_level || '—'} />
                </div>

                <form onSubmit={onSearch} className="flex flex-wrap gap-2">
                    <input
                        name="search"
                        type="search"
                        defaultValue={search}
                        placeholder="Search name, phone, email…"
                        className="min-w-[200px] flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                        style={{ border: `1.5px solid ${BORDER}` }}
                    />
                    <button type="submit" className="rounded-xl px-4 py-2 text-sm font-semibold text-white" style={{ background: TEAL }}>
                        Search
                    </button>
                    <a
                        href={route('admin.youth-members.export')}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
                        style={{ background: TEAL_LIGHT, color: TEAL }}
                    >
                        <Download className="h-4 w-4" />
                        Export Excel
                    </a>
                    <Link href={route('admin.memberships.index')} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ background: TEAL_LIGHT, color: TEAL }}>
                        Membership fees
                    </Link>
                    {canEditContent ? (
                        <Link href="/admin/youth-members/create" className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ background: TEAL_LIGHT, color: TEAL }}>
                            Add record
                        </Link>
                    ) : null}
                </form>

                <AdminTable
                    columns={['Member', 'Age', 'Payam', 'Gender', 'Skills', '']}
                    footer={<PaginationBar meta={meta} onPage={(url) => router.get(url, {}, { preserveState: true })} />}
                >
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-10 text-center text-sm text-brand-muted">
                                No census records yet.
                            </td>
                        </tr>
                    ) : (
                        rows.map((m, i) => {
                            const name = `${m.first_name} ${m.last_name}`.trim();
                            const skills = Array.isArray(m.skills) ? m.skills.slice(0, 2) : [];
                            const color = CAT[i % CAT.length];
                            return (
                                <AdminRow key={m.id}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
                                                style={{ background: CAT_LIGHT[i % CAT_LIGHT.length], color }}
                                            >
                                                {initials(name)}
                                            </span>
                                            <div>
                                                <p className="font-medium text-brand-ink">{name}</p>
                                                <p className="text-xs text-brand-muted">{m.email || m.phone || '—'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-brand-muted">{m.age ?? '—'}</td>
                                    <td className="px-4 py-3 text-brand-muted">{m.payam || m.county || '—'}</td>
                                    <td className="px-4 py-3 capitalize text-brand-muted">{m.gender || '—'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {skills.length ? skills.map((skill) => (
                                                <span key={skill} className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ background: TEAL_LIGHT, color: TEAL }}>
                                                    {skill}
                                                </span>
                                            )) : <span className="text-xs text-brand-muted">—</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Link href={`/admin/youth-members/${m.id}`} className="rounded-lg p-1.5 text-brand-muted hover:text-brand">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            {canEditContent ? (
                                                <>
                                                    <Link href={`/admin/youth-members/${m.id}/edit`} className="rounded-lg p-1.5 text-brand-muted hover:text-brand">
                                                        <Edit2 className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="rounded-lg p-1.5 text-brand-muted hover:text-red-600"
                                                        onClick={() => {
                                                            if (!confirm('Remove this record?')) return;
                                                            router.delete(`/admin/youth-members/${m.id}`);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </>
                                            ) : null}
                                        </div>
                                    </td>
                                </AdminRow>
                            );
                        })
                    )}
                </AdminTable>

                <div className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                    <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Youth by payam</h2>
                    <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} barSize={22} barCategoryGap="30%">
                                <CartesianGrid vertical={false} stroke="rgba(0,77,77,0.1)" strokeDasharray="3 3" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 10 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
                                <Tooltip content={<ChartTip />} cursor={{ fill: TEAL_PALE }} />
                                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, i) => (
                                        <Cell key={entry.name} fill={i === 0 ? TEAL : `${TEAL}80`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
