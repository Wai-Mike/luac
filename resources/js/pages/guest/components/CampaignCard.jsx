import { Link } from '@inertiajs/react';
import FadeIn from './FadeIn';

export default function CampaignCard({ title, description, target, raised, targetLabel = 'Goal', delay = 0 }) {
    const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;

    return (
        <FadeIn delay={delay}>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-2 flex-1 text-slate-600 leading-relaxed">{description}</p>
                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>{targetLabel}</span>
                        <span className="font-medium text-slate-700">
                            ${raised.toLocaleString()} / ${target.toLocaleString()}
                        </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-[width] duration-500"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                </div>
                <Link
                    href={route('fundraising')}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-600 px-4 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                    Donate
                </Link>
            </div>
        </FadeIn>
    );
}
