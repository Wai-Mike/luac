import GuestButton from '@/components/GuestButton';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import { campaignFigures, formatSsp, formatUsd } from '../data/money';
import useSiteContent from '@/hooks/useSiteContent';

export default function FundraisingPreview({ raisedByProgram = {}, raisedSspByProgram = {} }) {
    const { campaigns } = useSiteContent();
    return (
        <section className="bg-brand-dark py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel light>Fundraising</SectionLabel>
                        <h2 className="text-white">
                            Support the
                            <br />
                            work that lasts
                        </h2>
                    </div>
                    <GuestButton href={`${route('fundraising')}#donate`} variant="amber">
                        Donate now ♥
                    </GuestButton>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((c, i) => {
                        const { raisedUsd, raisedSsp, targetUsd, targetSsp, pct } = campaignFigures(c, raisedByProgram, raisedSspByProgram);
                        return (
                            <FadeIn key={c.title} delay={i * 0.08}>
                                <article className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 transition duration-200 hover:-translate-y-1">
                                    <h3 className="font-sans text-lg font-semibold text-white">{c.title}</h3>
                                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/12">
                                        <div
                                            className={`h-full rounded-full ${i % 2 === 0 ? 'bg-brand-light' : 'bg-amber'}`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <div className="mt-3 flex items-start justify-between gap-3 text-sm">
                                        <span className="shrink-0 text-white/60">{pct}%</span>
                                        <span className="min-w-0 text-right text-white">
                                            <span className="block break-words">{formatUsd(raisedUsd)} / {formatUsd(targetUsd)}</span>
                                            <span className="mt-0.5 block break-words text-xs text-white/60">
                                                {formatSsp(raisedSsp)} / {formatSsp(targetSsp)}
                                            </span>
                                        </span>
                                    </div>
                                </article>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
