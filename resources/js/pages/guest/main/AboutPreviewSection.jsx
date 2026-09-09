import GuestButton from '@/components/GuestButton';
import useSiteContent, { splitLines } from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

export default function AboutPreviewSection({ aboutImage, visionImage }) {
    const { missionVision } = useSiteContent();
    const headingLines = splitLines(missionVision.heading);

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <SectionLabel>Mission & vision</SectionLabel>
                    <h2>
                        {headingLines.map((line, index) => (
                            <span key={line}>
                                {index > 0 ? <br /> : null}
                                {line}
                            </span>
                        ))}
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <FadeIn>
                        <article className="relative h-80 overflow-hidden rounded-3xl bg-brand-dark md:h-96">
                            {aboutImage ? (
                                <img src={aboutImage} alt="" className="photo-fill opacity-60 transition duration-500 hover:opacity-75" />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-transparent" />
                            <div className="relative flex h-full flex-col justify-end p-8">
                                <span className="mb-3 w-fit rounded-full bg-amber px-3 py-1 text-xs font-semibold text-brand-ink">Mission</span>
                                <p className="max-w-md text-2xl font-semibold leading-snug text-white md:text-3xl">
                                    {missionVision.mission}
                                </p>
                            </div>
                        </article>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <article className="relative h-80 overflow-hidden rounded-3xl bg-[#1a3333] md:h-96">
                            {visionImage ? (
                                <img src={visionImage} alt="" className="photo-fill opacity-60 transition duration-500 hover:opacity-75" />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3333] via-[#1a3333]/55 to-transparent" />
                            <div className="relative flex h-full flex-col justify-end p-8">
                                <span className="mb-3 w-fit rounded-full border border-brand-light px-3 py-1 text-xs font-semibold text-brand-light">
                                    Vision
                                </span>
                                <p className="max-w-md text-2xl font-semibold leading-snug text-white md:text-3xl">
                                    {missionVision.vision}
                                </p>
                            </div>
                        </article>
                    </FadeIn>
                </div>
                <div className="mt-10 text-center">
                    <GuestButton href={route('about')} variant="outline">
                        Learn about LAYYA →
                    </GuestButton>
                </div>
            </div>
        </section>
    );
}
