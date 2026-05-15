import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/user/dashboard' },
    { title: 'Profile setup' },
];

export default function ProfileSetup({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        gender: '',
        date_of_birth: '',
        phone: '',
        bio: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('user.profile.setup.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile Setup" />

            <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">Complete Your Profile</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Add your basic details to finish setting up your account.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            value={data.date_of_birth}
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                        {errors.date_of_birth && (
                            <p className="mt-1 text-xs text-red-600">{errors.date_of_birth}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="e.g. +211..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            rows={4}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                        {errors.bio && <p className="mt-1 text-xs text-red-600">{errors.bio}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {processing ? 'Saving...' : 'Save Profile'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
