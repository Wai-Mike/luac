import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs = [{ title: 'Dashboard' }];

export default function AdminDashboard({
    stats = {},
    recent_youth = [],
    recent_activity = [],
}) {
    const page = usePage();
    const permissions = page.props.auth?.permissions ?? [];
    const canManageDepartments = permissions.includes('manage_departments');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Dashboard" />

            <div className="mx-auto max-w-6xl space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-600">LAYYA administration overview</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Users</p>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.total_users ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Youth census</p>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.total_youth_members ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Departments</p>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.total_departments ?? 0}</p>
                        <p className="mt-1 text-xs text-slate-500">{stats.active_departments ?? 0} active</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Quick links</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <Link
                                href="/admin/youth-members"
                                className="rounded-lg bg-[rgb(4,50,75)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                            >
                                Youth census
                            </Link>
                            {canManageDepartments ? (
                                <Link
                                    href="/admin/departments"
                                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                                >
                                    Departments
                                </Link>
                            ) : null}
                            <Link
                                href="/admin/users"
                                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                            >
                                Users
                            </Link>
                            <Link
                                href="/admin/analytics"
                                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                            >
                                Analytics
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-1">
                        <div className="border-b border-slate-100 px-5 py-4">
                            <h2 className="text-lg font-medium text-slate-900">Recent activity</h2>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {recent_activity.length === 0 ? (
                                <li className="px-5 py-8 text-center text-sm text-slate-500">Activity will appear as you manage the system.</li>
                            ) : (
                                recent_activity.map((entry) => (
                                    <li key={entry.id} className="flex flex-col gap-1 px-5 py-3 text-sm">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-700">
                                                {entry.action}
                                            </span>
                                            <span className="font-medium text-slate-900">{entry.description}</span>
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            {entry.user?.name ?? 'System'} · {entry.created_at ? new Date(entry.created_at).toLocaleString() : '—'}
                                        </p>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-1">
                        <div className="border-b border-slate-100 px-5 py-4">
                            <h2 className="text-lg font-medium text-slate-900">Recent youth registrations</h2>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {recent_youth.length === 0 ? (
                                <li className="px-5 py-8 text-center text-sm text-slate-500">No records yet.</li>
                            ) : (
                                recent_youth.map((y) => (
                                    <li key={y.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                                        <span className="font-medium text-slate-900">
                                            {y.first_name} {y.last_name}
                                        </span>
                                        <span className="text-slate-500">{y.county || '—'}</span>
                                        <Link
                                            href={`/admin/youth-members/${y.id}`}
                                            className="text-[rgb(29,84,114)] hover:underline"
                                        >
                                            View
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
