import GuestLayout from '@/layouts/GuestLayout';
import CampaignCard from './components/CampaignCard';
import SectionHeader from './components/SectionHeader';
import FadeIn from './components/FadeIn';
import { campaigns } from './data/siteContent';

export default function Fundraising({ heroImage }) {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-gradient-to-b from-teal-50/40 to-white pb-20">
                <section id="campaigns" className="relative overflow-hidden bg-slate-900 py-16 md:py-24">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-900/90 to-slate-900/90" />
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                            <FadeIn>
                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">Fundraising</p>
                                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Support Our Mission</h1>
                                <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                                    LAYYA organizes fundraising initiatives to support youth programs, education, vulnerable families, gender equality
                                    activities, leadership trainings, and community development projects.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.08}>
                                <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                                    <img src={heroImage ?? '/images/cover1.jpg'} alt="" className="aspect-[5/4] w-full object-cover" />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                    <SectionHeader title="Active campaigns" subtitle="Give to what aligns with your values — progress updates shared with our community." />
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((c, i) => (
                            <CampaignCard key={c.title} {...c} delay={i * 0.06} />
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
