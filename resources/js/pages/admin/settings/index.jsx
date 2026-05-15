import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Settings' },
];

export default function AdminSettings() {

    const { data, setData, post, processing, errors } = useForm({
        site_name: '',
        site_description: '',
        contact_email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Settings" />

            <div className="mx-auto max-w-2xl">
                <h1 className="text-2xl font-semibold text-slate-900">Site settings</h1>
                <p className="mt-1 text-sm text-slate-600">Update public site metadata (requires matching backend route).</p>

                <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Site name</label>
                        <input
                            type="text"
                            value={data.site_name}
                            onChange={(e) => setData('site_name', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]"
                        />
                        {errors.site_name && <p className="mt-1 text-xs text-red-600">{errors.site_name}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            rows={3}
                            value={data.site_description}
                            onChange={(e) => setData('site_description', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]"
                        />
                        {errors.site_description && (
                            <p className="mt-1 text-xs text-red-600">{errors.site_description}</p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Contact email</label>
                        <input
                            type="email"
                            value={data.contact_email}
                            onChange={(e) => setData('contact_email', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[rgb(29,84,114)]"
                        />
                        {errors.contact_email && <p className="mt-1 text-xs text-red-600">{errors.contact_email}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[rgb(4,50,75)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                    >
                        {processing ? 'Saving…' : 'Save settings'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
