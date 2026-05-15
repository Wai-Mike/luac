import { Link } from '@inertiajs/react';
import SectionHeader from '../components/SectionHeader';
import ProgramCard from '../components/ProgramCard';
import { programsPreview } from '../data/siteContent';

export default function ProgramsPreviewHome() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Programs"
                    title="Where youth lead the work"
                    subtitle="From advocacy to digital labs — explore how we show up for young people."
                />
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {programsPreview.map((p, i) => (
                        <ProgramCard key={p.title} title={p.title} summary={p.summary} href={route('programs')} delay={i * 0.05} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        href={route('programs')}
                        className="inline-flex min-h-11 items-center rounded-full bg-emerald-500 px-8 text-sm font-bold text-white shadow-md transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                    >
                        View all programs
                    </Link>
                </div>
            </div>
        </section>
    );
}
