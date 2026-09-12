import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import CardScrim from '../components/CardScrim';
import FadeIn from '../components/FadeIn';
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
                        <FadeIn key={p.title} delay={i * 0.08}>
                            <a href={route('programs')} className="group relative block h-72 overflow-hidden rounded-3xl bg-brand-dark">
                                <img
                                    src={p.image || '/images/education.jpg'}
                                    alt=""
                                    className="photo-fill"
                                />
                                <CardScrim />
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <h3 className="font-display text-xl text-[#f3ece0]">{p.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#f3ece0]/85">{p.summary || p.body}</p>
                                    <p className="mt-3 text-sm font-semibold text-amber">Learn more →</p>
                                </div>
                            </a>
                        </FadeIn>
                    ))}
                    <FadeIn delay={0.4}>
                        <article className="relative flex h-72 flex-col justify-between overflow-hidden rounded-3xl bg-brand p-6">
                            <div>
                                <h3 className="font-display text-2xl text-[#f3ece0]">Join the youth census</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#f3ece0]/85">Help us map skills, needs, and opportunities across Luac Akook Yieu.</p>
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
