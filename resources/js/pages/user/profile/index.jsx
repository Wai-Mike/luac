import { Head, Link } from '@inertiajs/react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserProfile({ user, profile }) {
    return (
        <UserLayout user={user} role="user" currentPath="/user/profile">
            <Head title="Profile" />
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow">
                <h1 className="text-2xl font-bold text-gray-900">Your profile</h1>
                <p className="mt-2 text-sm text-gray-600">Information stored for your LAYYA member account.</p>
                <dl className="mt-6 space-y-4 text-sm">
                    <div>
                        <dt className="font-medium text-gray-500">Name</dt>
                        <dd className="text-gray-900">{user?.name}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Email</dt>
                        <dd className="text-gray-900">{user?.email}</dd>
                    </div>
                    {profile?.gender && (
                        <div>
                            <dt className="font-medium text-gray-500">Gender</dt>
                            <dd className="capitalize text-gray-900">{profile.gender}</dd>
                        </div>
                    )}
                    {profile?.date_of_birth && (
                        <div>
                            <dt className="font-medium text-gray-500">Date of birth</dt>
                            <dd className="text-gray-900">{profile.date_of_birth}</dd>
                        </div>
                    )}
                    {profile?.phone && (
                        <div>
                            <dt className="font-medium text-gray-500">Phone</dt>
                            <dd className="text-gray-900">{profile.phone}</dd>
                        </div>
                    )}
                    {profile?.bio && (
                        <div>
                            <dt className="font-medium text-gray-500">About</dt>
                            <dd className="text-gray-900">{profile.bio}</dd>
                        </div>
                    )}
                </dl>
                {!profile && (
                    <p className="mt-6 text-sm text-brand">
                        Complete your profile setup to add more details.{' '}
                        <Link href="/user/profile/setup" className="font-medium underline">
                            Continue setup
                        </Link>
                    </p>
                )}
            </div>
        </UserLayout>
    );
}
