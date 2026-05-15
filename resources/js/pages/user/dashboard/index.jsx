import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [{ title: 'Dashboard' }];

export default function UserDashboard({ user, stats = {} }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Dashboard" />

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-sm text-gray-600">
                    {stats.welcome_message || `Welcome back, ${user?.name || 'Member'}!`}
                </p>
            </div>
        </AppLayout>
    );
}
