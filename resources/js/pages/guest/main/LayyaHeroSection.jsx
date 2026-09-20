import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Award, BookOpen, Calendar, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import useSiteContent, { splitLines } from '@/hooks/useSiteContent';

const heroIcons = [Users, BookOpen, Calendar, Award];
const SLIDE_MS = 6000;

function uniqueSlides(heroImages = [], heroImage) {
    const list = [...(Array.isArray(heroImages) ? heroImages : []), heroImage].filter(Boolean);
    return [...new Set(list)];
}

export default function LayyaHeroSection({ heroImage, heroImages = [] }) {
    const { hero, heroStats } = useSiteContent();
    const headlineLines = splitLines(hero.headline);
    const slides = useMemo(() => uniqueSlides(heroImages, heroImage), [heroImages, heroImage]);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const canSlide = slides.length > 1;

    useEffect(() => {
        if (index >= slides.length) {
            setIndex(0);
        }
    }, [index, slides.length]);

    useEffect(() => {
        if (!canSlide || paused) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setIndex((currentIndex) => (currentIndex + 1) % slides.length);
        }, SLIDE_MS);

        return () => window.clearInterval(timer);
    }, [canSlide, paused, slides.length]);

    const goTo = (next) => {
        if (!canSlide) {
            return;
        }
        setIndex((next + slides.length) % slides.length);
    };

    return (
        <>
            <section
                className="relative isolate overflow-hidden bg-brand-dark text-white"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className="relative min-h-[min(88svh,820px)]">
                    {slides.length ? (
                        slides.map((src, i) => {
                            const active = i === index;
                            const previous = i === (index - 1 + slides.length) % slides.length;
                            return (
                                <div
                                    key={src}
                                    className={`absolute inset-0 overflow-hidden transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                                        active
                                            ? 'z-[1] translate-x-0 opacity-100'
                                            : previous
                                              ? 'z-0 -translate-x-[7%] opacity-0'
                                              : 'z-0 translate-x-[7%] opacity-0'
                                    }`}
                                    aria-hidden={!active}
                                >
                                    <img
                                        src={src}
                                        alt={active ? 'Luac Akook Yieu Youth Association' : ''}
                                        className={`absolute inset-0 h-full w-full object-cover object-center ${active ? 'hero-slide-kenburns' : ''}`}
                                        decoding={i === 0 ? 'sync' : 'async'}
                                        fetchPriority={i === 0 ? 'high' : 'low'}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-[#061616]" aria-hidden="true" />
                    )}
                    <div className="absolute inset-0 z-[2] bg-brand-ink/45" aria-hidden="true" />
                    <div
                        className="absolute inset-0 z-[2] bg-gradient-to-r from-brand-ink/92 via-brand-ink/55 to-transparent lg:from-brand-ink/90 lg:via-brand-ink/35"
                        aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-brand-ink/70 to-transparent" aria-hidden="true" />

                    <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 sm:pb-24 lg:px-8">
                        <div className="max-w-2xl">
                            <h1 className="font-semibold text-white">
                                {headlineLines.map((line, lineIndex) => (
                                    <span key={`${line}-${lineIndex}`}>
                                        {lineIndex > 0 ? <br /> : null}
                                        {line}
                                    </span>
                                ))}
                            </h1>
                            <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-white/80 sm:text-[19px] md:text-[21px]">{hero.subtext}</p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <GuestButton href={route('get-involved')} variant="amber">
                                    Get involved <ArrowRight className="h-4 w-4" />
                                </GuestButton>
                                <GuestButton href={route('programs')} variant="ghost">
                                    Explore programs <ChevronRight className="h-4 w-4" />
                                </GuestButton>
                            </div>
                        </div>
                    </div>

                    {canSlide ? (
                        <div className="absolute inset-x-0 bottom-6 z-20 mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
                                {slides.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        role="tab"
                                        aria-selected={i === index}
                                        aria-label={`Show photo ${i + 1}`}
                                        onClick={() => goTo(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            i === index ? 'w-8 bg-amber' : 'w-2.5 bg-white/45 hover:bg-white/80'
                                        }`}
                                    />
                                ))}
                            </div>
                            <div className="hidden items-center gap-2 sm:flex">
                                <button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                                    onClick={() => goTo(index - 1)}
                                    aria-label="Previous photo"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                                    onClick={() => goTo(index + 1)}
                                    aria-label="Next photo"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>

            {heroStats.length ? (
                <section className="bg-white py-10 md:py-14">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
                            {heroStats.map((stat, i) => {
                                const Icon = heroIcons[i % heroIcons.length];
                                return (
                                    <div key={stat.label} className="flex items-center gap-3">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="font-display text-lg font-bold leading-none text-brand-ink sm:text-xl">{stat.value}</p>
                                            <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-wider text-brand-muted sm:text-[11px]">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
}
