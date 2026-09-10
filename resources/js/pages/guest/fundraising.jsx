import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import DonateForm from './components/DonateForm';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';
import SectionLabel from './components/SectionLabel';
import { campaignFigures, formatSsp, formatUsd } from './data/money';
import useSiteContent from '@/hooks/useSiteContent';

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
                <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:gap-6 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {campaigns.map((c, i) => {
                        const { raisedUsd, raisedSsp, targetUsd, targetSsp, pct } = campaignFigures(c, raisedByProgram, raisedSspByProgram);
                        return (
                            <FadeIn key={c.title} delay={i * 0.06} className="min-w-0">
                                <article className="overflow-hidden rounded-2xl border border-brand/10 bg-white">
                                    <div className="relative h-36 bg-brand-dark sm:h-40">
                                        {heroImage ? <img src={heroImage} alt="" className="photo-fill opacity-80" /> : null}
                                    </div>
                                    <div className="p-4 sm:p-6">
                                        <h3 className="break-words">{c.title}</h3>
                                        <p className="mt-2 text-sm text-brand-muted">{c.description}</p>
                                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-brand-soft">
                                            <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                                        </div>
                                        <div className="mt-3 flex items-start justify-between gap-3 text-sm text-brand-muted">
                                            <span className="shrink-0">{pct}%</span>
                                            <span className="min-w-0 text-right text-brand-ink">
                                                <span className="block break-words">{formatUsd(raisedUsd)} / {formatUsd(targetUsd)}</span>
                                                <span className="mt-0.5 block break-words text-xs text-brand-muted">
                                                    {formatSsp(raisedSsp)} / {formatSsp(targetSsp)}
                                                </span>
                                            </span>
                                        </div>
                                        <GuestButton href={donateHref(c.title)} variant={i % 2 ? 'amber' : 'primary'} className="mt-5 w-full">
                                            Donate
                                        </GuestButton>
                                    </div>
                                </article>
                            </FadeIn>
                        );
                    })}
                </div>
            </section>
            <section className="bg-brand-soft py-12 sm:py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
                    <FadeIn>
                        <SectionLabel>Donate</SectionLabel>
                        <h2>
                            Fill in your gift
                        </h2>
                        <p className="mt-4 max-w-xl text-brand-muted">
                            Tell us who you are, how much you are giving, and which program it should support. We will
                            record it and follow up if we need to confirm payment.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.06} className="min-w-0">
                        <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
                            <DonateForm selectedProgram={selectedProgram || ''} />
                        </div>
                    </FadeIn>
                </div>
            </section>
        </GuestLayout>
    );
}
