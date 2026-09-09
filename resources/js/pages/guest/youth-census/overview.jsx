import GuestLayout from '@/layouts/GuestLayout';
import PageHero from '../components/PageHero';

export default function YouthCensusOverview({ total, byGender, byCounty }) {
    const totalCount = total || 0;
    const genders = byGender || [];
    const counties = byCounty || [];

    return (
        <GuestLayout title="Youth Census Overview">
            <PageHero
                label="Youth Census"
                title="A live"
                italic="community snapshot"
                subtitle="Aggregated numbers only. Individual records stay with authorized LAYYA staff."
            />
            <section className="bg-brand-soft py-20 md:py-28">
                <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
                    <div className="rounded-3xl bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber">Total youth</p>
                        <p className="mt-3 font-display text-4xl font-bold text-brand">{totalCount}</p>
                        <p className="mt-1 text-sm text-brand-muted">Registered in PIGI (Khorfulus)</p>
                    </div>
                    <div className="rounded-3xl bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber">By gender</p>
                        <ul className="mt-3 space-y-2 text-sm text-brand-ink">
                            {genders.length === 0 ? <li className="text-brand-muted">No data yet</li> : null}
                            {genders.map((g) => (
                                <li key={g.gender || 'unknown'} className="flex justify-between">
                                    <span>{g.gender || 'Unknown'}</span>
                                    <span className="font-semibold">{g.total}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber">Top counties</p>
                        <ul className="mt-3 space-y-2 text-sm text-brand-ink">
                            {counties.length === 0 ? <li className="text-brand-muted">No data yet</li> : null}
                            {counties.map((c, i) => (
                                <li key={`${c.county}-${i}`} className="flex justify-between">
                                    <span>{c.county || 'Unknown'}</span>
                                    <span className="font-semibold">{c.total}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
