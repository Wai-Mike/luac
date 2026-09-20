import { ArrowRight, GraduationCap, Laptop2, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { Link } from '@inertiajs/react';
import GuestButton from '@/components/GuestButton';
import FadeIn from '../components/FadeIn';
import { campaignFigures, campaignTitle, formatSsp, formatUsd } from '../data/money';
import useSiteContent from '@/hooks/useSiteContent';

const campaignIcons = [GraduationCap, Sparkles, ShieldCheck, Trophy, Laptop2];

function donateHref(title) {
    return `${route('fundraising')}?program=${encodeURIComponent(title)}#donate`;
}

function CurveDivider({ position }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 z-10 h-10 overflow-hidden text-white sm:h-16 ${
                position === 'top' ? 'top-0' : 'bottom-0 rotate-180'
            }`}
        >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
                <path d="M0,0 L1440,0 L1440,32 C1200,72 960,-8 720,32 C480,72 240,-8 0,32 Z" fill="currentColor" />
            </svg>
        </div>
    );
}

export default function FundraisingPreview({ raisedByProgram = {}, raisedSspByProgram = {} }) {
    const { campaigns } = useSiteContent();
    return (
        <section className="relative overflow-hidden bg-brand-dark py-20 md:py-28">
            <CurveDivider position="top" />

            <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-lg">
                        <h2 className="text-white">
                            Support the
                            <br />
                            <span className="font-fraunces italic text-amber">work that lasts</span>
                        </h2>
                        <p className="mt-4 text-[16px] leading-relaxed text-white/70">
                            Every gift funds a program youth already run — education, safe spaces, and community action across
                            Luac Akook Yieu.
                        </p>
                    </div>
                    <GuestButton href={`${route('fundraising')}#donate`} variant="amber" className="shrink-0">
                        Donate now ♥
                    </GuestButton>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((c, i) => {
                        const { raisedUsd, raisedSsp, targetUsd, targetSsp, pct } = campaignFigures(c, raisedByProgram, raisedSspByProgram);
                        const Icon = campaignIcons[i % campaignIcons.length];
                        return (
                            <FadeIn key={c.title} delay={i * 0.08} className="h-full">
                                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-amber/40 hover:bg-white/[0.1]">
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber transition-colors duration-200 group-hover:bg-amber group-hover:text-brand-ink">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70">
                                            {pct}% funded
                                        </span>
                                    </div>
                                    <h3 className="mt-5 font-sans text-lg font-semibold leading-snug text-[#f3ece0]">{campaignTitle(c)}</h3>
                                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/12">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-amber to-brand-light"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <div className="mt-3 flex items-baseline justify-between gap-3">
                                        <p className="text-sm font-semibold text-white">
                                            {formatUsd(raisedUsd)} <span className="font-normal text-white/50">raised</span>
                                        </p>
                                        <p className="shrink-0 text-xs text-white/50">of {formatUsd(targetUsd)}</p>
                                    </div>
                                    <p className="mt-0.5 text-[11px] text-white/40">
                                        {formatSsp(raisedSsp)} / {formatSsp(targetSsp)}
                                    </p>
                                    <Link
                                        href={donateHref(c.title)}
                                        className="mt-5 inline-flex items-center gap-1 border-t border-white/10 pt-4 text-sm font-semibold text-amber transition-[gap] duration-150 hover:gap-2"
                                    >
                                        Support this program
                                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </Link>
                                </article>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>

            <CurveDivider position="bottom" />
        </section>
    );
}
