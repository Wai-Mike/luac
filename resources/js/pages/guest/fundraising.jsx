import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import DonateForm from './components/DonateForm';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';
import SectionLabel from './components/SectionLabel';
import { dualMoney } from './data/money';
import { campaigns } from './data/siteContent';

function donateHref(title) {
    return `${route('fundraising')}?program=${encodeURIComponent(title)}#donate`;
}

export default function Fundraising({ heroImage, raisedByProgram = {}, selectedProgram = '' }) {
    return (
        <GuestLayout title="Fundraising">
            <PageHero
                label="Fundraising"
                title="Support our"
                italic="mission"
                subtitle="Give in South Sudanese pounds or US dollars. Fill in your details, the amount, and the work you want to fund."
                image={heroImage}
            />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {campaigns.map((c, i) => {
                        const raised = Number(raisedByProgram[c.title] ?? c.raised);
                        const pct = c.target > 0 ? Math.min(100, Math.round((raised / c.target) * 100)) : 0;
                        return (
                            <FadeIn key={c.title} delay={i * 0.06}>
                                <article className="overflow-hidden rounded-2xl border border-brand/10 bg-white">
                                    <div className="relative h-40 bg-brand-dark">
                                        {heroImage ? <img src={heroImage} alt="" className="photo-fill opacity-80" /> : null}
                                    </div>
                                    <div className="p-6">
                                        <h3>{c.title}</h3>
                                        <p className="mt-2 text-sm text-brand-muted">{c.description}</p>
                                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-brand-soft">
                                            <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                                        </div>
                                        <div className="mt-2 flex justify-between gap-3 text-sm text-brand-muted">
                                            <span>{pct}%</span>
                                            <span className="text-right text-brand-ink">
                                                <span className="block">{dualMoney(raised).usd} / {dualMoney(c.target).usd}</span>
                                                <span className="block text-xs text-brand-muted">
                                                    {dualMoney(raised).ssp} / {dualMoney(c.target).ssp}
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
            <section className="bg-brand-soft py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
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
                    <FadeIn delay={0.06}>
                        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                            <DonateForm selectedProgram={selectedProgram || ''} />
                        </div>
                    </FadeIn>
                </div>
            </section>
        </GuestLayout>
    );
}
