import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

const breadcrumbsBase = [
    { title: 'Admin', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
];

export default function AdminUserShow({ user: targetUser }) {
    const breadcrumbs =
        targetUser != null ? [...breadcrumbsBase, { title: targetUser.name }] : breadcrumbsBase;

    if (!targetUser) {
        return (
            <AppLayout breadcrumbs={breadcrumbsBase}>
                <Head title="Admin · User" />
                <p className="text-slate-600">User not found.</p>
            </AppLayout>
        );
    }

    const u = targetUser;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin · ${u.name}`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Link href="/admin/users" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                    ← Back to users
                </Link>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">{u.name}</h1>
                    <p className="mt-1 text-sm text-slate-600">{u.email}</p>
                    <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                            <dt className="text-slate-500">Role</dt>
                            <dd className="font-medium text-slate-900">{u.role ?? '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">ID</dt>
                            <dd className="font-medium text-slate-900">{u.id}</dd>
                        </div>
                        {u.phone != null && (
                            <div>
                                <dt className="text-slate-500">Phone</dt>
                                <dd className="font-medium text-slate-900">{u.phone || '—'}</dd>
                            </div>
                        )}
                        {u.status != null && (
                            <div>
                                <dt className="text-slate-500">Status</dt>
                                <dd className="font-medium text-slate-900">{u.status}</dd>
                            </div>
                        )}
                    </dl>
                </div>

                {Array.isArray(u.roles) && u.roles.length > 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-slate-900">Roles (RBAC)</h2>
                        <ul className="mt-2 list-inside list-disc text-sm text-slate-700">
                            {u.roles.map((r) => (
                                <li key={r.id}>{r.display_name || r.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
