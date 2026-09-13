import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import FadeIn from './FadeIn';

export default function ProgramCard({ title, summary, image, href, delay = 0 }) {
    const inner = (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_8px_24px_-16px_rgba(12,31,31,0.16)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(12,31,31,0.32)]">
            <div className="relative h-[200px] overflow-hidden bg-brand-dark">
                {image ? (
                    <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover opacity-75 transition duration-500 ease-out group-hover:scale-[1.06] group-hover:opacity-90"
                    />
                ) : null}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-brand-dark/35 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60"
                />
            </div>
            <div className="flex flex-1 flex-col bg-white px-6 pt-6">
                <h3 className="font-fraunces text-xl font-semibold text-brand-ink">{title}</h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-brand-muted">{summary}</p>
                <div className="mt-6 flex items-center justify-between border-t border-black/[0.07] py-4">
                    <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand-ink transition-colors group-hover:text-amber">
                        Learn more
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white"
                        aria-hidden
                    >
                        <ArrowRight className="h-4 w-4" />
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
