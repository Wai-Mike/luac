import { GraduationCap, Landmark, Laptop2, MessageCircle, ShieldCheck, Smartphone, Sparkles, Trophy, Wallet } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import DonateForm from './components/DonateForm';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';
import { campaignFigures, campaignTitle, formatSsp, formatUsd } from './data/money';
import useSiteContent from '@/hooks/useSiteContent';

const campaignIcons = [GraduationCap, Sparkles, ShieldCheck, Trophy, Laptop2];

const payWays = [
    { icon: Landmark, label: 'Bank transfer' },
    { icon: Smartphone, label: 'MPESA' },
    { icon: Wallet, label: 'MTN Mobile Money' },
];

function donateHref(title) {
    return `${route('fundraising')}?program=${encodeURIComponent(title)}#donate`;
}

export default function Fundraising({ heroImage, raisedByProgram = {}, raisedSspByProgram = {}, selectedProgram = '' }) {
    const { campaigns } = useSiteContent();
    return (
        <GuestLayout title="Fundraising">
            <PageHero
                label="Fundraising"
                title="Support our"
                italic="mission"
                subtitle="Give in South Sudanese pounds or US dollars. Fill in your details, the amount, and the work you want to fund."
                image={heroImage}
            />
            <section className="bg-white py-12 sm:py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-xl">
                        <h2>
                            Active <span className="font-fraunces italic text-amber-dark">campaigns</span>
                        </h2>
                        <p className="mt-3 text-brand-muted">Choose a program below, or scroll down to fill in your own gift.</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((c, i) => {
                            const { raisedUsd, raisedSsp, targetUsd, targetSsp, pct } = campaignFigures(c, raisedByProgram, raisedSspByProgram);
                            const Icon = campaignIcons[i % campaignIcons.length];
                            return (
                                <FadeIn key={c.title} delay={i * 0.06} className="min-w-0 h-full">
                                    <article className="group flex h-full flex-col rounded-2xl border border-brand/10 bg-white p-6 shadow-[0_1px_2px_rgba(12,31,31,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_16px_32px_-20px_rgba(12,31,31,0.25)]">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-200 group-hover:bg-amber/15 group-hover:text-amber-dark">
                                                <Icon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-muted">
                                                {pct}% funded
                                            </span>
                                        </div>
                                        <h3 className="mt-5 break-words">{campaignTitle(c)}</h3>
                                        {c.description ? <p className="mt-2 text-sm leading-relaxed text-brand-muted">{c.description}</p> : null}
                                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-brand-soft">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <div className="mt-3 flex items-baseline justify-between gap-3">
                                            <p className="text-sm font-semibold text-brand-ink">
                                                {formatUsd(raisedUsd)} <span className="font-normal text-brand-muted">raised</span>
                                            </p>
                                            <p className="shrink-0 text-xs text-brand-muted">of {formatUsd(targetUsd)}</p>
                                        </div>
                                        <p className="mt-0.5 text-[11px] text-brand-muted/80">
                                            {formatSsp(raisedSsp)} / {formatSsp(targetSsp)}
                                        </p>
                                        <GuestButton href={donateHref(c.title)} variant={i % 2 ? 'amber' : 'primary'} className="mt-5 w-full">
                                            Donate to this program
                                        </GuestButton>
                                    </article>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="bg-brand-soft py-12 sm:py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
                    <FadeIn>
                        <h2>
                            Fill in
                            <br />
                            <span className="font-fraunces italic text-amber-dark">your gift</span>
                        </h2>
                        <p className="mt-4 max-w-xl text-brand-muted">
                            Tell us who you are, how much you are giving, and which program it should support. We will
                            record it and follow up if we need to confirm payment.
                        </p>
                        <div className="mt-6 rounded-2xl border border-brand/10 bg-white p-5">
                            <p className="text-sm font-semibold text-brand-ink">How to pay</p>
                            <ul className="mt-3 space-y-3">
                                {payWays.map((w) => (
                                    <li key={w.label} className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                            <w.icon className="h-4 w-4" aria-hidden="true" />
                                        </span>
                                        <span className="text-sm text-brand-ink">{w.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 flex items-center gap-2 border-t border-brand/10 pt-4 text-sm text-brand-muted">
                                <MessageCircle className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                                Or <a href={route('contact')} className="font-semibold text-brand hover:underline">contact us for details</a>
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.06} className="min-w-0">
                        <div className="rounded-2xl border border-brand/10 bg-white p-4 shadow-[0_24px_48px_-28px_rgba(12,31,31,0.2)] sm:rounded-3xl sm:p-6 md:p-8">
                            <p className="mb-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em] text-amber-dark">
                                <span className="h-[2px] w-6 shrink-0 rounded-full bg-amber-dark" aria-hidden="true" />
                                Send your gift
                            </p>
                            <DonateForm selectedProgram={selectedProgram || ''} />
                        </div>
                    </FadeIn>
                </div>
            </section>
        </GuestLayout>
    );
}
