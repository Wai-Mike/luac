import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head } from '@inertiajs/react';

export default function YouthCensusOverview({ total, byGender, byCounty }) {
    const totalCount = total || 0;

    const genderLabels = (byGender || []).map((g) => g.gender || 'Unknown');
    const genderCounts = (byGender || []).map((g) => g.total);

    const countyLabels = (byCounty || []).map((c) => c.county || 'Unknown');
    const countyCounts = (byCounty || []).map((c) => c.total);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/40 to-amber-50/40">
            <Head title="Youth Census Overview - LAYYA" />
            <GuestNavbar />

            <main className="mx-auto max-w-5xl px-4 py-12">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        Luac Akok Yieu Youth Association
                    </p>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Youth Census Overview</h1>
                    <p className="mt-3 text-sm text-slate-600">
                        A live snapshot of the young people we serve. These numbers help us design better programs, trainings,
                        and opportunities across the community.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Total youth</p>
                        <p className="mt-3 text-3xl font-bold text-slate-900">{totalCount}</p>
                        <p className="mt-1 text-xs text-slate-500">Registered across Luac Akok Yieu</p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">By gender</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                            {genderLabels.length === 0 && <li className="text-xs text-slate-400">No data yet</li>}
                            {genderLabels.map((label, index) => (
                                <li key={label} className="flex items-center justify-between">
                                    <span>{label}</span>
                                    <span className="font-semibold">{genderCounts[index]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Top counties</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                            {countyLabels.length === 0 && <li className="text-xs text-slate-400">No data yet</li>}
                            {countyLabels.map((label, index) => (
                                <li key={`${label}-${index}`} className="flex items-center justify-between">
                                    <span>{label}</span>
                                    <span className="font-semibold">{countyCounts[index]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="mt-8 text-xs text-slate-500">
                    Note: For privacy and safety, all data displayed here is aggregated. Individual records are only visible to
                    authorized LAYYA administrators.
                </p>
            </main>

            <GuestFooter />
        </div>
    );
}

