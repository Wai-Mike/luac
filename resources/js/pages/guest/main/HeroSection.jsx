import { Link, usePage } from '@inertiajs/react';

const primaryCta =
    'inline-flex min-h-[48px] min-w-[11rem] flex-1 items-center justify-center rounded-lg bg-[#3b60c9] px-6 py-3.5 text-center font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#3b60c9]/25 transition motion-safe:duration-200 hover:bg-[#2f52b3] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe156] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] sm:flex-initial sm:px-8 sm:text-[0.95rem]';

const secondaryCta =
    'inline-flex min-h-[48px] min-w-[11rem] flex-1 items-center justify-center rounded-lg border-2 border-white/40 bg-white/[0.08] px-6 py-3.5 text-center font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition motion-safe:duration-200 hover:border-white/70 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] sm:flex-initial sm:px-8 sm:text-[0.95rem]';

export default function HeroSection() {
    const { heroImage } = usePage().props;
    const hasPhoto = Boolean(heroImage);

    return (
        <section id="slider-area" className="relative isolate overflow-hidden text-white" aria-labelledby="hero-heading">
            <div className="relative min-h-[min(100dvh,900px)] lg:min-h-[min(92vh,880px)]">
                {hasPhoto ? (
                    <img
                        src={heroImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        decoding="async"
                        fetchPriority="high"
                    />
                ) : (
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-[#1a2744] via-[#243a5c] to-[#3b60c9]"
                        aria-hidden
                    />
                )}

                <div className="absolute inset-0 bg-[#0b1220]/55" aria-hidden />
                <div
                    className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/92 via-[#0b1220]/65 to-transparent lg:from-[#0b1220]/88 lg:via-[#0b1220]/45"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(59,96,201,0.22),transparent)]"
                    aria-hidden
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1220]/90 to-transparent" aria-hidden />

                <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[75rem] items-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
                        <div className="lg:col-span-7 xl:col-span-6">
                            <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 ring-1 ring-white/10 backdrop-blur-xl sm:p-8 md:p-10">
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1dd983]" aria-hidden />
                                    Luac Akok Yieu Youth Association
                                </div>

                                <h2
                                    id="hero-heading"
                                    className="m-0 font-sans text-[clamp(2.125rem,4.2vw+1rem,3.75rem)] font-bold leading-[1.08] tracking-tight text-white"
                                >
                                    Youth leadership that lifts communities
                                </h2>

                                <p className="mt-3 font-sans text-lg font-medium text-[#ffe156] sm:text-xl">
                                    LAYYA · <span className="text-white/95">Juba &amp; beyond</span>
                                </p>

                                <p className="mt-6 max-w-xl font-sans text-[0.95rem] leading-relaxed text-white/88 sm:text-base md:text-[1.05rem]">
                                    We connect young people to skills, mentorship, and community action—so creativity and civic courage can grow where it
                                    matters most.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                                    <Link href={route('programs')} className={primaryCta}>
                                        Explore programs
                                    </Link>
                                    <Link href={route('about')} className={secondaryCta}>
                                        About LAYYA
                                    </Link>
                                </div>

                                <p className="mt-8 border-t border-white/10 pt-6 font-sans text-xs leading-relaxed text-white/55 sm:text-sm">
                                    Non-profit youth association · Programs, Tawus Hub, youth census &amp; community events
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
}
