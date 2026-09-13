import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import ProgramCard from '../components/ProgramCard';
import SectionLabel from '../components/SectionLabel';

export default function ProgramsPreviewHome() {
    const { programs } = useSiteContent();
    return (
        <section className="bg-brand-soft py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Programs</SectionLabel>
                        <h2>
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
                    <FadeIn delay={0.4} className="h-full">
                        <article className="relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl bg-brand p-6">
                            <div>
                                <h3 className="font-fraunces text-2xl text-[#f3ece0]">Join the youth census</h3>
                                <p className="mt-2 font-sans text-sm leading-relaxed text-[#f3ece0]/85">
                                    Help us map skills, needs, and opportunities across Luac Akook Yieu.
                                </p>
                            </div>
                            <GuestButton href={route('youth-census.register')} variant="amber" className="w-full justify-center">
                                Register now
                            </GuestButton>
                        </article>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
