import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Departments', href: '/admin/departments' },
    { title: 'Create' },
];

export default function DepartmentsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/departments', { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · New department" />

            <div className="mx-auto max-w-2xl space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">New department</h1>
                        <p className="mt-1 text-sm text-slate-600">Add a departmental unit aligned with governance.</p>
                    </div>
                    <Link href="/admin/departments" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                        ← Departments
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]"
                            required
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Slug (optional)</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]"
                            placeholder="auto-generated when left blank"
                        />
                        {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]"
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-[rgb(4,50,75)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                        >
                            {processing ? 'Saving…' : 'Create department'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
