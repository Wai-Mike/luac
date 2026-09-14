import AppLayout from '@/layouts/app-layout';
import { BORDER, TEAL } from '@/lib/admin-theme';
import { Head, Link, useForm } from '@inertiajs/react';

const fieldClass = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]';

export default function DepartmentsEdit({ department, executives = [] }) {
    const breadcrumbs = [
        { title: 'Admin', href: '/admin' },
        { title: 'Departments', href: '/admin/departments' },
        { title: `Edit · ${department?.name ?? ''}` },
    ];
    const { data, setData, put, processing, errors } = useForm({
        name: department.name ?? '',
        slug: department.slug ?? '',
        description: department.description ?? '',
        status: department.status ?? 'active',
        head_id: department.head_id ?? '',
        member_ids: (department.users || []).map((user) => user.id),
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/departments/${department.id}`, { preserveScroll: true });
    };

    const toggleMember = (id) => {
        const next = data.member_ids.includes(id)
            ? data.member_ids.filter((value) => value !== id)
            : [...data.member_ids, id];
        setData('member_ids', next);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin · Edit ${department.name}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Edit department</h1>
                        <p className="mt-1 text-sm text-slate-600">Name the head and the people who work under this office.</p>
                    </div>
                    <Link href="/admin/departments" className="text-sm font-medium" style={{ color: TEAL }}>
                        ← Departments
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className={fieldClass} required />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
                        <input type="text" value={data.slug} onChange={(e) => setData('slug', e.target.value)} className={fieldClass} />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                        <textarea rows={3} value={data.description} onChange={(e) => setData('description', e.target.value)} className={fieldClass} />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                        <select value={data.status} onChange={(e) => setData('status', e.target.value)} className={fieldClass}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Department head</label>
                        <select value={data.head_id || ''} onChange={(e) => setData('head_id', e.target.value ? Number(e.target.value) : '')} className={fieldClass}>
                            <option value="">Select who heads this department</option>
                            {executives.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">People under this department</label>
                        <p className="mb-2 text-xs text-slate-500">These users can plan meetings, events, and upload department reports when they sign in.</p>
                        <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl p-3" style={{ border: `1px solid ${BORDER}` }}>
                            {executives.map((user) => (
                                <label key={user.id} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={data.member_ids.includes(user.id)} onChange={() => toggleMember(user.id)} />
                                    <span>{user.name}</span>
                                    <span className="text-xs text-slate-500">{user.email}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" disabled={processing} className="rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50" style={{ background: TEAL }}>
                        {processing ? 'Saving…' : 'Save changes'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
