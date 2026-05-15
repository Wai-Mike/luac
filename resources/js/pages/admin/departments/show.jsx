import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function DepartmentsShow({ department }) {
    const breadcrumbs = [
        { title: 'Admin', href: '/admin' },
        { title: 'Departments', href: '/admin/departments' },
        { title: department?.name ?? 'View' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin · ${department.name}`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">{department.name}</h1>
                        <p className="mt-1 text-sm text-slate-600">{department.slug}</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <Link href="/admin/departments" className="font-medium text-[rgb(29,84,114)] hover:underline">
                            ← Departments
                        </Link>
                        <Link href={`/admin/departments/${department.id}/edit`} className="font-medium text-[rgb(29,84,114)] hover:underline">
                            Edit
                        </Link>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</span>
                        <span
                            className={`rounded-full px-3 py-0.5 text-xs font-semibold uppercase ${
                                department.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                            }`}
                        >
                            {department.status}
                        </span>
                    </div>
                    {department.description ? (
                        <p className="mt-4 whitespace-pre-wrap text-sm text-slate-700">{department.description}</p>
                    ) : (
                        <p className="mt-4 text-sm italic text-slate-500">No description provided.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
