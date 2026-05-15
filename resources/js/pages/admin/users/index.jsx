import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Users' },
];

export default function AdminUsersIndex({ users: usersPaginator }) {

    const rows = paginatorItems(usersPaginator);
    const meta = usersPaginator && !Array.isArray(usersPaginator) ? usersPaginator : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Users" />

            <div className="mx-auto max-w-6xl space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
                        <p className="mt-1 text-sm text-slate-600">Manage accounts and roles</p>
                    </div>
                    <Link
                        href="/admin"
                        className="text-sm font-medium text-[rgb(29,84,114)] hover:underline"
                    >
                        ← Dashboard
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((u) => <UserRow key={u.id} u={u} />)
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

function UserRow({ u }) {
    const [role, setRole] = useState(u.role || 'member');
    const [saving, setSaving] = useState(false);

    const submitRole = (e) => {
        e.preventDefault();
        setSaving(true);
        router.patch(
            route('admin.users.role', u.id),
            { role },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            }
        );
    };

    const deleteUser = () => {
        if (!confirm(`Delete user ${u.email}?`)) return;
        router.delete(route('admin.users.destroy', u.id), { preserveScroll: true });
    };

    return (
        <tr className="hover:bg-slate-50/50">
            <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
            <td className="px-4 py-3 text-slate-600">{u.email}</td>
            <td className="px-4 py-3">
                <form onSubmit={submitRole} className="flex flex-wrap items-center gap-2">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
                    >
                        <option value="member">member</option>
                        <option value="management">management</option>
                        <option value="admin">admin</option>
                    </select>
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800 hover:bg-slate-200 disabled:opacity-50"
                    >
                        Save
                    </button>
                </form>
            </td>
            <td className="px-4 py-3 text-right">
                <Link
                    href={`/admin/users/${u.id}`}
                    className="mr-2 text-[rgb(29,84,114)] hover:underline"
                >
                    View
                </Link>
                <button type="button" onClick={deleteUser} className="text-xs font-medium text-red-600 hover:underline">
                    Delete
                </button>
            </td>
        </tr>
    );
}
