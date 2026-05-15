import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Youth census' },
];

export default function YouthCensusIndex({ members, filters = {}, charts = {} }) {
    const rows = paginatorItems(members);
    const meta = members && !Array.isArray(members) ? members : null;

    const search = filters.search || '';

    const onSearch = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const q = fd.get('search') || '';
        router.get('/admin/youth-members', q ? { search: q } : {}, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Youth census" />

            <div className="mx-auto max-w-6xl space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Youth census</h1>
                        <p className="mt-1 text-sm text-slate-600">Registered youth members</p>
                    </div>
                    <Link
                        href="/admin/youth-members/create"
                        className="rounded-lg bg-[rgb(4,50,75)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                        Add record
                    </Link>
                </div>

                <form onSubmit={onSearch} className="flex flex-wrap gap-2">
                    <input
                        name="search"
                        type="search"
                        defaultValue={search}
                        placeholder="Search name, phone, email…"
                        className="min-w-[200px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                    <button
                        type="submit"
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                    >
                        Search
                    </button>
                </form>

                <div className="grid gap-4 lg:grid-cols-3">
                    <ChartSummary title="By gender" rows={charts.byGender} labelKey="gender" />
                    <ChartSummary title="Top counties" rows={charts.byCounty} labelKey="county" />
                    <ChartSummary title="Education" rows={charts.byEducation} labelKey="education_level" />
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">County</th>
                                <th className="px-4 py-3">Gender</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                                        No records yet.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((m) => (
                                    <tr key={m.id} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-900">
                                            {m.first_name} {m.last_name}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">{m.county || '—'}</td>
                                        <td className="px-4 py-3 text-slate-600">{m.gender || '—'}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={`/admin/youth-members/${m.id}`}
                                                className="text-[rgb(29,84,114)] hover:underline"
                                            >
                                                View
                                            </Link>
                                            <span className="mx-2 text-slate-300">|</span>
                                            <Link
                                                href={`/admin/youth-members/${m.id}/edit`}
                                                className="text-slate-700 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {meta?.links && (
                    <nav className="flex flex-wrap justify-center gap-2 text-sm">
                        {meta.links.map((link, i) => (
                            <button
                                key={i}
                                type="button"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                className={`rounded-lg px-3 py-1 ${
                                    link.active
                                        ? 'bg-[rgb(4,50,75)] text-white'
                                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                } disabled:cursor-not-allowed disabled:opacity-40`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                )}
            </div>
        </AppLayout>
    );
}

function ChartSummary({ title, rows = [], labelKey }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
            <ul className="mt-3 max-h-48 space-y-1 overflow-auto text-sm">
                {rows.length === 0 ? (
                    <li className="text-slate-500">No data</li>
                ) : (
                    rows.map((r, i) => (
                        <li key={i} className="flex justify-between gap-2">
                            <span className="truncate text-slate-700">{r[labelKey] || '—'}</span>
                            <span className="tabular-nums font-medium text-slate-900">{r.total}</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
