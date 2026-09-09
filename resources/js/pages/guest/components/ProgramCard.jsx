import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import FadeIn from './FadeIn';

export default function ProgramCard({ title, summary, href, delay = 0 }) {
    const inner = (
        <div className="group flex h-full flex-col border border-brand/25 bg-white p-6">
            <h3>{title}</h3>
            <p className="mt-3 flex-1 text-[16px] leading-relaxed text-brand-ink/80">{summary}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-brand">
                Learn more
                <ArrowUpRight className="h-4 w-4" />
            </span>
        </div>
    );

    return (
        <FadeIn delay={delay}>
            {href ? (
                <Link href={href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                    {inner}
                </Link>
            ) : (
                inner
            )}
        </FadeIn>
    );
}
