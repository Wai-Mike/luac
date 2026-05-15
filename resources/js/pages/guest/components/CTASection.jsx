import { Link } from '@inertiajs/react';
import FadeIn from './FadeIn';

export default function CTASection({
    title,
    text,
    primaryHref,
    primaryLabel,
    secondaryHref,
    secondaryLabel,
    tertiaryHref,
    tertiaryLabel,
}) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 py-16 md:py-24">
            <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                <FadeIn>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100 leading-relaxed">{text}</p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                        {primaryHref && (
                            <Link
                                href={primaryHref}
                                className="inline-flex min-h-12 min-w-[200px] items-center justify-center rounded-full bg-emerald-500 px-8 text-base font-bold text-white shadow-lg transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-900"
                            >
                                {primaryLabel}
                            </Link>
                        )}
                        {secondaryHref && (
                            <Link
                                href={secondaryHref}
                                className="inline-flex min-h-12 min-w-[200px] items-center justify-center rounded-full border-2 border-white/40 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-900"
                            >
                                {secondaryLabel}
                            </Link>
                        )}
                        {tertiaryHref && (
                            <Link
                                href={tertiaryHref}
                                className="inline-flex min-h-12 min-w-[200px] items-center justify-center rounded-full border border-emerald-400/50 px-8 text-base font-semibold text-emerald-100 transition hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-900"
                            >
                                {tertiaryLabel}
                            </Link>
                        )}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
