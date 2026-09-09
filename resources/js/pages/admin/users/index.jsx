import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Users' },
];

const fieldClass = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]';

export default function AdminUsersIndex({ users: usersPaginator, departments = [] }) {
    const { canManageUsers } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const rows = paginatorItems(usersPaginator);
    const meta = usersPaginator && !Array.isArray(usersPaginator) ? usersPaginator : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Users" />

            <div className="mx-auto max-w-6xl space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            {canManageUsers
                                ? 'Add executives and assign an admin or viewer role by department.'
                                : 'Executive accounts. Only the Chairman can add users or change roles.'}
                        </p>
                    </div>
                    <Link href="/admin" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                        ← Dashboard
                    </Link>
                </div>

                {flash.success ? <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{flash.success}</div> : null}
                {flash.error ? <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{flash.error}</div> : null}

                {canManageUsers ? <CreateUserForm departments={departments} /> : null}

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3">Access</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((u) => <UserRow key={u.id} u={u} departments={departments} canManage={canManageUsers} />)
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

function CreateUserForm({ departments }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'viewer',
        department_id: '',
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-slate-900">Add executive</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} className={fieldClass} required />
                    {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                    <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={fieldClass} required />
                    {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                    <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className={fieldClass} required />
                    {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
                    <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={fieldClass} />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
                    <select value={data.department_id} onChange={(e) => setData('department_id', e.target.value)} className={fieldClass}>
                        <option value="">No department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Access</label>
                    <select value={data.role} onChange={(e) => setData('role', e.target.value)} className={fieldClass}>
                        <option value="viewer">Viewer — can see records only</option>
                        <option value="admin">Admin — can edit website content</option>
                    </select>
                </div>
            </div>
            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-[rgb(4,50,75)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
                {processing ? 'Saving…' : 'Add user'}
            </button>
        </form>
    );
}

function UserRow({ u, departments, canManage }) {
    const [role, setRole] = useState(u.role === 'admin' ? 'admin' : 'viewer');
    const [departmentId, setDepartmentId] = useState(u.department_id ? String(u.department_id) : '');
    const [saving, setSaving] = useState(false);
    const accessLabel = u.is_chairman ? 'Chairman' : u.role === 'admin' ? 'Admin' : 'Viewer';

    const submitRole = (e) => {
        e.preventDefault();
        setSaving(true);
        router.patch(
            route('admin.users.role', u.id),
            { role, department_id: departmentId || null },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
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
            <td className="px-4 py-3 text-slate-600">{u.department?.name || '—'}</td>
            <td className="px-4 py-3">
                {canManage && !u.is_chairman ? (
                    <form onSubmit={submitRole} className="flex flex-wrap items-center gap-2">
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1 text-sm">
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
                        >
                            <option value="">No department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800 hover:bg-slate-200 disabled:opacity-50"
                        >
                            Save
                        </button>
                    </form>
                ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-700">{accessLabel}</span>
                )}
            </td>
            <td className="px-4 py-3 text-right">
                <Link href={`/admin/users/${u.id}`} className="mr-2 text-[rgb(29,84,114)] hover:underline">
                    View
                </Link>
                {canManage && !u.is_chairman ? (
                    <button type="button" onClick={deleteUser} className="text-xs font-medium text-red-600 hover:underline">
                        Delete
                    </button>
                ) : null}
            </td>
        </tr>
    );
}
