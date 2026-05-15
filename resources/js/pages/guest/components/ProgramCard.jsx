import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import FadeIn from './FadeIn';

export default function ProgramCard({ title, summary, href, delay = 0 }) {
    const inner = (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-3 flex-1 text-slate-600 leading-relaxed">{summary}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-teal-600">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
        </div>
    );

    return (
        <FadeIn delay={delay}>
            {href ? (
                <Link href={href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
                    {inner}
                </Link>
            ) : (
                inner
            )}
        </FadeIn>
    );
}
