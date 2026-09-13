import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import FadeIn from './FadeIn';

export default function ProgramCard({ title, summary, image, href, delay = 0 }) {
    const inner = (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-dark bg-brand-dark shadow-[0_8px_24px_-16px_rgba(0,56,56,0.28)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(0,56,56,0.45)]">
            <div className="relative h-[200px] overflow-hidden bg-brand-dark">
                {image ? (
                    <img
                        src={image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center opacity-90 transition duration-500 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                    />
                ) : null}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand/30 mix-blend-multiply" />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/45 via-brand/15 to-transparent"
                />
            </div>
            <div className="flex flex-1 flex-col px-6 pt-6">
                <h3 className="font-fraunces text-xl font-semibold text-[#f3ece0]">{title}</h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#f3ece0]/80">{summary}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/15 py-4">
                    <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-[#f3ece0] transition-colors group-hover:text-white">
                        Learn more
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </span>
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3ece0] text-brand-dark transition-colors group-hover:bg-white"
                        aria-hidden
                    >
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                </div>
            </div>
        </article>
    );

    return (
        <FadeIn delay={delay} className="h-full">
            {href ? (
                <Link
                    href={href}
                    className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                    {inner}
                </Link>
            ) : (
                inner
            )}
        </FadeIn>
    );
}
