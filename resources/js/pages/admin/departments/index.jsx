import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Departments' },
];

export default function DepartmentsIndex({ departments: deptPaginator }) {
    const rows = paginatorItems(deptPaginator);
    const meta = deptPaginator && !Array.isArray(deptPaginator) ? deptPaginator : null;

    const toggle = (id) => {
        router.patch(
            `/admin/departments/${id}/toggle-status`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const remove = (id) => {
        if (!window.confirm('Archive this department?')) return;
        router.delete(`/admin/departments/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Departments" />

            <div className="mx-auto max-w-6xl space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Departments</h1>
                        <p className="mt-1 text-sm text-slate-600">Executive office and programme units.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/admin" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                            ← Dashboard
                        </Link>
                        <Link
                            href="/admin/departments/create"
                            className="rounded-lg bg-[rgb(4,50,75)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                        >
                            Add department
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Slug</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                                        No departments yet.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((d) => (
                                    <tr key={d.id} className="hover:bg-slate-50/80">
                                        <td className="px-4 py-3 font-medium text-slate-900">{d.name}</td>
                                        <td className="px-4 py-3 text-slate-600">{d.slug}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() => toggle(d.id)}
                                                className={`rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                                                    d.status === 'active'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-slate-200 text-slate-700'
                                                }`}
                                            >
                                                {d.status}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap justify-end gap-3 text-[rgb(29,84,114)]">
                                                <Link href={`/admin/departments/${d.id}`} className="hover:underline">
                                                    View
                                                </Link>
                                                <Link href={`/admin/departments/${d.id}/edit`} className="hover:underline">
                                                    Edit
                                                </Link>
                                                <button type="button" className="text-red-600 hover:underline" onClick={() => remove(d.id)}>
                                                    Archive
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {meta && meta.links?.length ? (
                    <nav className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <p className="text-slate-600">
                            Page {meta.current_page} / {meta.last_page}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {meta.links.map((link, i) => (
                                <button
                                    type="button"
                                    key={`${link.label}-${i}`}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                                    className={`rounded border px-2 py-1 ${
                                        link.active ? 'border-[rgb(29,84,114)] bg-slate-900 text-white' : 'border-slate-300 bg-white'
                                    } ${!link.url ? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-50'}`}
                                />
                            ))}
                        </div>
                    </nav>
                ) : null}
            </div>
        </AppLayout>
    );
}
