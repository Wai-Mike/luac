import AdminLayout from '@/components/AdminLayout';
import Chart from '@/components/admin/Chart';
import { Head, Link, useForm } from '@inertiajs/react';

export default function YouthCensusAdminIndex({ members, filters, charts, auth, user, role, currentPath }) {
    const { data, setData, get } = useForm({
        search: filters?.search || '',
    });

    const submitSearch = (e) => {
        e.preventDefault();
        get(route('admin.youth-members.index'), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const genderChartData = {
        labels: (charts?.byGender || []).map((g) => g.gender || 'Unknown'),
        datasets: [
            {
                data: (charts?.byGender || []).map((g) => g.total),
                backgroundColor: ['#047857', '#0ea5e9', '#f59e0b', '#6b7280'],
            },
        ],
    };

    const educationChartData = {
        labels: (charts?.byEducation || []).map((e) => e.education_level || 'Unknown'),
        datasets: [
            {
                data: (charts?.byEducation || []).map((e) => e.total),
                backgroundColor: ['#22c55e', '#10b981', '#0ea5e9', '#6366f1', '#f97316', '#e11d48'],
            },
        ],
    };

    return (
        <AdminLayout user={user || auth?.user} role={role || 'admin'} currentPath={currentPath || 'admin/youth-members'}>
            <Head title="Youth Census - LAYYA" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Youth Census</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            View registrations from the Luac Akok Yieu youth census and explore key demographics.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('youth-census.register')}
                            className="inline-flex items-center rounded-full border border-emerald-600 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50"
                        >
                            Public registration form
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-slate-900">Census records</h2>
                            <form onSubmit={submitSearch} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by name, phone, email..."
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                    className="w-56 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-300"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                                >
                                    Filter
                                </button>
                            </form>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100 text-xs">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Name</th>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Gender</th>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Age</th>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">County / Payam</th>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Education</th>
                                        <th className="px-3 py-2 text-right font-semibold text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {members.data.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-3 py-6 text-center text-xs text-slate-400">
                                                No youth census records yet.
                                            </td>
                                        </tr>
                                    )}
                                    {members.data.map((member) => (
                                        <tr key={member.id}>
                                            <td className="px-3 py-2 text-xs text-slate-800">
                                                {member.first_name} {member.last_name}
                                            </td>
                                            <td className="px-3 py-2 text-xs capitalize text-slate-700">
                                                {member.gender || '—'}
                                            </td>
                                            <td className="px-3 py-2 text-xs text-slate-700">
                                                {member.date_of_birth ? member.date_of_birth : '—'}
                                            </td>
                                            <td className="px-3 py-2 text-xs text-slate-700">
                                                {[member.county, member.payam].filter(Boolean).join(' / ') || '—'}
                                            </td>
                                            <td className="px-3 py-2 text-xs text-slate-700">
                                                {member.education_level || '—'}
                                            </td>
                                            <td className="px-3 py-2 text-right text-xs">
                                                <Link
                                                    href={route('admin.youth-members.show', member.id)}
                                                    className="text-emerald-700 hover:text-emerald-900"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <h2 className="mb-3 text-sm font-semibold text-slate-900">By gender</h2>
                            <Chart data={genderChartData} type="doughnut" height={220} />
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <h2 className="mb-3 text-sm font-semibold text-slate-900">By education level</h2>
                            <Chart data={educationChartData} type="bar" height={220} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

