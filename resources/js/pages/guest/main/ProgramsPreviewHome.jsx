import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import CensusSnapshotCard from '../components/CensusSnapshotCard';
import ProgramCard from '../components/ProgramCard';

function programSlug(title) {
    return String(title || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function ProgramsPreviewHome() {
    const { programs } = useSiteContent();
    return (
        <section className="bg-brand-soft py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-black">
                            Where youth
                            <br />
                            <span className="font-fraunces italic text-amber-dark">lead the work</span>
                        </h2>
                        <p className="mt-4 text-[16px] leading-relaxed text-brand-muted">
                            Five pillars, one youth-led movement — leadership, gender equality, community service, digital skills,
                            and reflection, each built and run by LAYYA members.
                        </p>
                    </div>
                    <GuestButton href={route('programs')} variant="outline" className="shrink-0">
                        View all programs →
                    </GuestButton>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {programs.slice(0, 5).map((p, i) => (
                        <ProgramCard
                            key={p.title}
                            title={p.title}
                            summary={p.summary || p.body}
                            image={p.image || '/images/education.jpg'}
                            href={`${route('programs')}#${programSlug(p.title)}`}
                            delay={i * 0.08}
                            index={i + 1}
                        />
                    ))}
                </div>
                <div className="mt-6">
                    <CensusSnapshotCard delay={0.4} />
                </div>
            </div>
        </section>
    );
}
