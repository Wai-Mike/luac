import AppLayout from '@/layouts/app-layout';
import RoleBadge from '@/components/admin/RoleBadge';
import { AdminRow, AdminTable, PaginationBar } from '@/components/admin/AdminTable';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, TEAL } from '@/lib/admin-theme';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { paginatorItems } from '../useAdminPageProps';

const fieldClass = 'w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-brand';
const fieldStyle = { borderColor: BORDER };

export default function AdminUsersIndex({ users: usersPaginator, departments = [] }) {
    const { canManageUsers } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const rows = paginatorItems(usersPaginator);
    const meta = usersPaginator && !Array.isArray(usersPaginator) ? usersPaginator : null;

    return (
        <AppLayout title="Users" subtitle="Executive access levels across LAYYA">
            <Head title="Admin · Users" />

            <div className="space-y-6">
                {flash.success ? <div className="rounded-2xl bg-white px-4 py-3 text-sm text-brand">{flash.success}</div> : null}
                {flash.error ? <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{flash.error}</div> : null}

                {canManageUsers ? <CreateUserForm departments={departments} /> : null}

                <AdminTable
                    columns={['Name', 'Email', 'Department', 'Access', '']}
                    footer={<PaginationBar meta={meta} onPage={(url) => router.get(url, {}, { preserveState: true })} />}
                >
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-brand-muted">No users found.</td>
                        </tr>
                    ) : (
                        rows.map((u) => <UserRow key={u.id} u={u} departments={departments} canManage={canManageUsers} />)
                    )}
                </AdminTable>
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
        <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6" style={{ border: `1px solid ${BORDER}` }}>
            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Add executive</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} className={fieldClass} style={fieldStyle} required />
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
                className="rounded-full px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                style={{ background: TEAL }}
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
        <AdminRow>
            <td className="px-4 py-3 font-medium text-brand-ink">{u.name}</td>
            <td className="px-4 py-3 text-brand-muted">{u.email}</td>
            <td className="px-4 py-3 text-brand-muted">{u.department?.name || '—'}</td>
            <td className="px-4 py-3">
                {canManage && !u.is_chairman ? (
                    <form onSubmit={submitRole} className="flex flex-wrap items-center gap-2">
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg px-2 py-1 text-sm" style={{ border: `1px solid ${BORDER}` }}>
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            className="rounded-lg px-2 py-1 text-sm"
                            style={{ border: `1px solid ${BORDER}` }}
                        >
                            <option value="">No department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit" disabled={saving} className="rounded-lg px-2 py-1 text-xs font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                            Save
                        </button>
                    </form>
                ) : (
                    <RoleBadge role={u.is_chairman ? 'admin' : u.role === 'admin' ? 'admin' : 'viewer'} />
                )}
            </td>
            <td className="px-4 py-3 text-right">
                <Link href={`/admin/users/${u.id}`} className="mr-2 text-xs font-semibold" style={{ color: TEAL }}>
                    View
                </Link>
                {canManage && !u.is_chairman ? (
                    <button type="button" onClick={deleteUser} className="text-xs font-semibold text-red-600">
                        Delete
                    </button>
                ) : null}
            </td>
        </AdminRow>
    );
}
