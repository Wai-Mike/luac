import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import CensusSnapshotCard from '../components/CensusSnapshotCard';
import ProgramCard from '../components/ProgramCard';
import SectionLabel from '../components/SectionLabel';

export default function ProgramsPreviewHome() {
    const { programs } = useSiteContent();
    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Programs</SectionLabel>
                        <h2 className="text-black">
                            Where youth
                            <br />
                            lead the work
                        </h2>
                    </div>
                    <GuestButton href={route('programs')} variant="outline">
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
                            href={route('programs')}
                            delay={i * 0.08}
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
