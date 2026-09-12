import GuestButton from '@/components/GuestButton';
import useSiteContent, { splitLines } from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

export default function AboutPreviewSection() {
    const { missionVision, cardImages } = useSiteContent();
    const aboutImage = cardImages.mission || '/images/youth.jpg';
    const visionImage = cardImages.vision || '/images/education.jpg';
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
                                <img src={aboutImage} alt="" className="photo-fill" />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                            <div className="relative flex h-full flex-col justify-end p-5 sm:p-8">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-amber drop-shadow">Mission</p>
                                <p className="max-w-md text-xl font-semibold leading-snug text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] sm:text-2xl md:text-3xl">
                                    {missionVision.mission}
                                </p>
                            </div>
                        </article>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <article className="relative h-80 overflow-hidden rounded-3xl bg-[#1a3333] md:h-96">
                            {visionImage ? (
                                <img src={visionImage} alt="" className="photo-fill" />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                            <div className="relative flex h-full flex-col justify-end p-5 sm:p-8">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-amber drop-shadow">Vision</p>
                                <p className="max-w-md text-xl font-semibold leading-snug text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] sm:text-2xl md:text-3xl">
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
