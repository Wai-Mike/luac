import { Calendar } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import useSiteContent, { splitLines } from '@/hooks/useSiteContent';
import CardScrim from '../components/CardScrim';
import FadeIn from '../components/FadeIn';

export default function AboutPreviewSection() {
    const { missionVision, cardImages } = useSiteContent();
    const aboutImage = cardImages.mission || '/images/youth.jpg';
    const visionImage = cardImages.vision || '/images/education.jpg';
    const headingLines = splitLines(missionVision.heading);

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2>
                        {headingLines.map((line, index) => (
                            <span key={line}>
                                {index > 0 ? <br /> : null}
                                {index === headingLines.length - 1 ? (
                                    <span className="font-fraunces italic text-amber-dark">{line}</span>
                                ) : (
                                    line
                                )}
                            </span>
                        ))}
                    </h2>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    <FadeIn>
                        <article className="relative h-80 overflow-hidden rounded-3xl bg-brand-dark md:h-96 lg:h-full">
                            {aboutImage ? <img src={aboutImage} alt="" className="photo-fill" /> : null}
                            <CardScrim />
                            <div className="relative flex h-full flex-col justify-end p-5 sm:p-8">
                                <p className="mb-2 text-sm font-semibold text-amber">Mission</p>
                                <p className="max-w-md text-xl font-semibold leading-snug text-[#f3ece0] sm:text-2xl">
                                    {missionVision.mission}
                                </p>
                            </div>
                        </article>
                    </FadeIn>
                    <FadeIn delay={0.08}>
                        <article className="relative h-80 overflow-hidden rounded-3xl bg-[#1a3333] md:h-96 lg:h-full">
                            {visionImage ? <img src={visionImage} alt="" className="photo-fill" /> : null}
                            <CardScrim />
                            <div className="relative flex h-full flex-col justify-end p-5 sm:p-8">
                                <p className="mb-2 text-sm font-semibold text-amber">Vision</p>
                                <p className="max-w-md text-xl font-semibold leading-snug text-[#f3ece0] sm:text-2xl">
                                    {missionVision.vision}
                                </p>
                            </div>
                        </article>
                    </FadeIn>
                    <FadeIn delay={0.16}>
                        <article className="flex h-80 flex-col justify-between rounded-3xl bg-amber p-6 text-brand-ink sm:p-8 md:h-96 lg:h-full">
                            <div>
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60">
                                    <Calendar className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <p className="mt-6 font-fraunces text-5xl font-bold leading-none sm:text-6xl">10+</p>
                                <p className="mt-3 max-w-[14rem] text-sm font-semibold uppercase tracking-wide text-brand-ink/70">
                                    Years of youth-led impact in Luac Akook Yieu
                                </p>
                            </div>
                            <GuestButton href={route('about')} className="w-full justify-center">
                                Learn about LAYYA →
                            </GuestButton>
                        </article>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
