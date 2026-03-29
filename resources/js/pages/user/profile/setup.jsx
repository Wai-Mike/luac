import { Head, useForm } from '@inertiajs/react';
import UserLayout from '../../../components/Layout/UserLayout';

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
        <UserLayout user={user} role="user" currentPath="/user/profile/setup">
            <Head title="Complete your profile" />

            <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Complete your profile</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        A few details help us tailor your experience on the LAYYA member portal.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                    <div>
                        <label htmlFor="gender" className="mb-2 block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
                    </div>

                    <div>
                        <label htmlFor="date_of_birth" className="mb-2 block text-sm font-medium text-gray-700">
                            Date of birth <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            value={data.date_of_birth}
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                        />
                        {errors.date_of_birth && <p className="mt-2 text-sm text-red-600">{errors.date_of_birth}</p>}
                    </div>

                    <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                            Phone <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                        <label htmlFor="bio" className="mb-2 block text-sm font-medium text-gray-700">
                            About you <span className="text-gray-400">(optional)</span>
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                        />
                        {errors.bio && <p className="mt-2 text-sm text-red-600">{errors.bio}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving…' : 'Save and continue'}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
