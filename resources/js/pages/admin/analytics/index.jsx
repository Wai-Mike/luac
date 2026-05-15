import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Analytics' },
];

export default function AdminAnalytics({ analytics }) {

    const totals = analytics?.totals ?? {};
    const userGrowth = analytics?.userGrowth ?? [];
    const youthGrowth = analytics?.youthGrowth ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Analytics" />

            <div className="mx-auto max-w-6xl space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
                    <p className="mt-1 text-sm text-slate-600">Last 30 days (where applicable)</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase text-slate-500">Total users</p>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.users ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase text-slate-500">Youth members</p>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.youth_members ?? 0}</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <GrowthTable title="User sign-ups by day" rows={userGrowth} valueKey="users" />
                    <GrowthTable title="Youth registrations by day" rows={youthGrowth} valueKey="registrations" />
                </div>
            </div>
        </AppLayout>
    );
}

function GrowthTable({ title, rows, valueKey }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
            </div>
            <div className="max-h-80 overflow-auto">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-slate-50 text-left text-xs font-medium text-slate-500">
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2 text-right">Count</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="px-4 py-6 text-center text-slate-500">
                                    No data in range.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/80">
                                    <td className="px-4 py-2 text-slate-800">{row.date}</td>
                                    <td className="px-4 py-2 text-right tabular-nums text-slate-900">{row[valueKey] ?? 0}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
