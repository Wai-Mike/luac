import { Head } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function AdminAnalytics({ user, analytics }) {
    const totals = analytics?.totals ?? {};
    const userGrowth = analytics?.userGrowth ?? [];
    const youthGrowth = analytics?.youthGrowth ?? [];

    return (
        <AdminLayout user={user} currentPath="/admin/analytics">
            <Head title="Analytics" />
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-[rgb(4,50,75)]">Analytics</h1>
                <p className="text-gray-600">Sign-ups and youth census registrations over the last 30 days.</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-white p-6 shadow">
                        <p className="text-sm text-gray-500">Total user accounts</p>
                        <p className="mt-2 text-3xl font-bold text-[rgb(4,50,75)]">{totals.users ?? 0}</p>
                    </div>
                    <div className="rounded-xl border bg-white p-6 shadow">
                        <p className="text-sm text-gray-500">Youth census records</p>
                        <p className="mt-2 text-3xl font-bold text-[rgb(29,84,114)]">{totals.youth_members ?? 0}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border bg-white p-6 shadow">
                        <h2 className="mb-4 font-semibold text-gray-900">New accounts (by day)</h2>
                        <ul className="max-h-64 space-y-2 overflow-y-auto text-sm">
                            {userGrowth.length === 0 && <li className="text-gray-500">No data yet.</li>}
                            {userGrowth.map((row) => (
                                <li key={row.date} className="flex justify-between border-b border-gray-100 py-1">
                                    <span>{row.date}</span>
                                    <span className="font-medium">{row.users}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-xl border bg-white p-6 shadow">
                        <h2 className="mb-4 font-semibold text-gray-900">Youth census (by day)</h2>
                        <ul className="max-h-64 space-y-2 overflow-y-auto text-sm">
                            {youthGrowth.length === 0 && <li className="text-gray-500">No data yet.</li>}
                            {youthGrowth.map((row) => (
                                <li key={row.date} className="flex justify-between border-b border-gray-100 py-1">
                                    <span>{row.date}</span>
                                    <span className="font-medium">{row.registrations}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
