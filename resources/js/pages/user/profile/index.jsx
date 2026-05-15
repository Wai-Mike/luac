import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/user/dashboard' },
    { title: 'Profile' },
];

export default function UserProfile({ user, profile }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Profile" />

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
                <div className="mt-4 grid gap-3 text-sm text-gray-700">
                    <p>
                        <span className="font-medium">Name:</span> {user?.name || '-'}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {user?.email || '-'}
                    </p>
                    <p>
                        <span className="font-medium">Phone:</span> {profile?.phone || user?.phone || '-'}
                    </p>
                    <p>
                        <span className="font-medium">Gender:</span> {profile?.gender || '-'}
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
