import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';

export default function AdminDashboard({ user, stats, recent_youth }) {
    const list = recent_youth ?? [];

    return (
        <AdminLayout user={user} currentPath="/admin/dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <div className="rounded-2xl border border-[rgb(4,50,75)]/20 bg-gradient-to-r from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] p-6 shadow-xl">
                    <h1 className="text-3xl font-bold text-white">Welcome, {user?.name || 'Admin'}</h1>
                    <p className="mt-2 text-white/90">Luac Akok Yieu Youth Association (LAYYA) — admin overview.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <p className="text-sm font-medium text-gray-500">Registered accounts</p>
                        <p className="mt-2 text-3xl font-bold text-[rgb(4,50,75)]">{stats?.total_users ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <p className="text-sm font-medium text-gray-500">Youth census records</p>
                        <p className="mt-2 text-3xl font-bold text-[rgb(29,84,114)]">{stats?.total_youth_members ?? 0}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/admin/youth-members"
                        className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-[rgb(210,166,73)] hover:shadow-lg"
                    >
                        <h4 className="font-medium text-gray-900">Youth census</h4>
                        <p className="mt-1 text-xs text-gray-500">View and manage registrations</p>
                    </Link>
                    <Link
                        href="/admin/users"
                        className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-[rgb(210,166,73)] hover:shadow-lg"
                    >
                        <h4 className="font-medium text-gray-900">Users</h4>
                        <p className="mt-1 text-xs text-gray-500">Accounts and roles</p>
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-[rgb(210,166,73)] hover:shadow-lg"
                    >
                        <h4 className="font-medium text-gray-900">Settings</h4>
                        <p className="mt-1 text-xs text-gray-500">Site preferences</p>
                    </Link>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">Recent youth registrations</h3>
                    </div>
                    <div className="p-6">
                        {list.length > 0 ? (
                            <ul className="space-y-3">
                                {list.map((y) => (
                                    <li key={y.id} className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900">
                                            {y.first_name} {y.last_name}
                                        </span>
                                        <span className="text-gray-500">
                                            {y.created_at ? new Date(y.created_at).toLocaleDateString() : ''}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No youth census entries yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
