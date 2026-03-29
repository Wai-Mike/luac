import { Head, Link } from '@inertiajs/react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserDashboard({ user, stats }) {
    const welcome = stats?.welcome_message ?? `Welcome, ${user?.name ?? 'member'}!`;

    return (
        <UserLayout user={user} role="user" currentPath="/user/dashboard">
            <Head title="Dashboard" />
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-900">{welcome}</h1>
                    <p className="mt-2 text-gray-600">
                        You are signed in to the Luac Akok Yieu Youth Association (LAYYA) member area. Use the sidebar to
                        open your profile.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                        href="/user/profile"
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow transition hover:border-emerald-300"
                    >
                        <h2 className="font-semibold text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm text-gray-500">View or update your member profile.</p>
                    </Link>
                    <a
                        href="/youth-census/register"
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow transition hover:border-emerald-300"
                    >
                        <h2 className="font-semibold text-gray-900">Youth census</h2>
                        <p className="mt-1 text-sm text-gray-500">Public registration form (opens in a new flow).</p>
                    </a>
                </div>
            </div>
        </UserLayout>
    );
}
