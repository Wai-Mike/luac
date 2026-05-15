import { Link } from '@inertiajs/react';
import { useMemo } from 'react';

function CountdownUnit({ value, label }) {
    return (
        <div className="text-center text-white">
            <span className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-wide text-white/80">{label}</span>
            <span className="inline-flex min-w-[2.75rem] items-center justify-center rounded border border-white/80 bg-[#161f37] px-2 py-2.5 font-sans text-lg font-bold tabular-nums shadow-inner">
                {String(value).padStart(2, '0')}
            </span>
        </div>
    );
}

export default function UpcomingEventSection({ eventImage }) {
    const target = useMemo(() => new Date('2026-06-15T09:00:00'), []);
    const { days, hours, mins } = useMemo(() => {
        const now = new Date();
        const diff = Math.max(0, target.getTime() - now.getTime());
        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        return { days: d, hours: h, mins: m };
    }, [target]);

    return (
        <section id="upcoming-area" className="relative z-[1] scroll-mt-24 bg-transparent py-16 lg:py-20">
            <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-sm bg-[#3b60c9] shadow-[0_24px_48px_-12px_rgba(22,31,55,0.35)]">
                    <div className="absolute right-1/2 top-[-31px] z-[2] translate-x-1/2 sm:right-10 sm:translate-x-0 lg:right-10">
                        <h3 className="m-0 rounded-sm bg-white px-6 py-2.5 font-sans text-xl font-bold capitalize text-[#131c33] shadow-[14px_0_26px_rgba(0,0,0,0.25)] sm:text-2xl lg:px-11 lg:text-[1.625rem]">
                            Upcoming event
                        </h3>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-8 px-4 pb-10 pt-6 sm:px-8 lg:mt-6 lg:grid-cols-12 lg:gap-0 lg:px-10 lg:pb-12 lg:pt-8">
                        <div className="relative min-h-[220px] overflow-hidden sm:min-h-[260px] lg:col-span-5">
                            {eventImage ? (
                                <img src={eventImage} alt="Tawus Day and community gathering" className="h-full min-h-[220px] w-full object-cover sm:min-h-[260px]" />
                            ) : (
                                <div className="h-full min-h-[220px] bg-gradient-to-br from-[#2f4da1] to-[#161f37]" aria-hidden />
                            )}
                            <h4 className="absolute bottom-0 left-0 w-full border-b-8 border-[#131c33] bg-white py-3 text-center font-sans text-base font-bold text-[#3a3b3c] sm:text-lg">
                                Tawus Day &amp; community gathering
                            </h4>
                        </div>
                        <div className="flex items-center lg:col-span-7 lg:pl-10">
                            <div className="w-full">
                                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4" aria-live="polite" aria-atomic="true">
                                    <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                                        <CountdownUnit value={days} label="Days" />
                                        <CountdownUnit value={hours} label="Hours" />
                                        <CountdownUnit value={mins} label="Mins" />
                                    </div>
                                    <p className="text-center font-sans text-sm font-bold uppercase tracking-wide text-white/90 sm:mb-2 sm:text-left sm:text-base">
                                        Remaining until event
                                    </p>
                                </div>
                                <h3 className="font-sans text-xl font-medium leading-snug sm:text-2xl lg:text-3xl">
                                    <Link
                                        href={route('tawus-hub')}
                                        className="text-white underline-offset-4 transition hover:text-[#ffe156] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe156] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b60c9]"
                                    >
                                        We are going to celebrate skills, culture, and unity together!
                                    </Link>
                                </h3>
                                <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-white/90">
                                    Join volunteers, families, and partners for Tawus Day—showcasing youth programs, Tawus Hub highlights, and community pride
                                    in Juba.
                                </p>
                                <Link
                                    href={route('contact')}
                                    className="mt-8 inline-flex min-h-[48px] items-center justify-center bg-[#2f4da1] px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-white transition motion-safe:duration-200 hover:bg-white hover:text-[#131c33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b60c9]"
                                >
                                    Join with us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
