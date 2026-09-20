import { Crown, Megaphone, ShieldCheck } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from './components/FadeIn';
import LeaderCard from './components/LeaderCard';
import PageHero from './components/PageHero';

export default function Team({ heroImage }) {
    const { executiveMembers, councilMembers } = useSiteContent();
    const chair = executiveMembers.find((m) => m.role === 'Chairman') ?? executiveMembers[0];
    const secretaryGeneral = executiveMembers.find((m) => m.role === 'Secretary General') ?? executiveMembers[1];
    const speaker = councilMembers.find((m) => m.role === 'Speaker') ?? councilMembers[0];
    const executiveRest = executiveMembers.filter((m) => m !== chair && m !== secretaryGeneral);
    const councilRest = councilMembers.filter((m) => m !== speaker);

    const officers = [
        chair ? { ...chair, icon: Crown } : null,
        secretaryGeneral ? { ...secretaryGeneral, icon: ShieldCheck } : null,
        speaker ? { ...speaker, icon: Megaphone } : null,
    ].filter(Boolean);

    return (
        <GuestLayout title="Leadership">
            <PageHero
                label="Leadership"
                title="How LAYYA is structured"
                subtitle="An executive of 17, including the Chairman, and a youth council of seven headed by the Speaker."
                image={heroImage}
            />

            <section className="border-b border-brand/10 bg-white py-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8">
                    <a href="#officers" className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white">
                        Top offices
                    </a>
                    <a href="#executive" className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white">
                        Executive committee
                    </a>
                    <a href="#council" className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white">
                        Youth council
                    </a>
                </div>
            </section>

            <section className="bg-white py-8">
                <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
                    {[
                        { value: executiveMembers.length || 17, label: 'Executive' },
                        { value: councilMembers.length || 7, label: 'Youth council' },
                        { value: 3, label: 'Top offices' },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-brand-soft px-3 py-4 text-center sm:px-6 sm:py-5">
                            <p className="font-display text-2xl font-semibold text-brand sm:text-3xl">{stat.value}</p>
                            <p className="mt-1 text-[11px] font-semibold text-brand-muted sm:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="officers" className="scroll-mt-24 bg-brand-soft py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 max-w-xl">
                        <h2>Top offices</h2>
                        <p className="mt-2 text-sm text-brand-muted">Chairman, Secretary General, and Speaker.</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {officers.map((officer, i) => (
                            <FadeIn key={officer.role} delay={i * 0.05}>
                                <LeaderCard {...officer} featured />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section id="executive" className="scroll-mt-24 bg-white py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2>Executive committee</h2>
                            <p className="mt-2 max-w-xl text-sm text-brand-muted">
                                {executiveMembers.length} members who lead LAYYA day to day and represent Luac youth.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                        {executiveRest.map((member, i) => (
                            <FadeIn key={`${member.role}-${i}`} delay={Math.min(i * 0.03, 0.24)}>
                                <LeaderCard {...member} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section id="council" className="scroll-mt-24 bg-brand-soft py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2>Youth council</h2>
                        <p className="mt-2 max-w-xl text-sm text-brand-muted">
                            {councilMembers.length} members, headed by the Speaker, supporting the executive and speaking for Luac youth.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3">
                        {councilRest.map((member, i) => (
                            <FadeIn key={`${member.role}-${i}`} delay={i * 0.04}>
                                <LeaderCard {...member} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-brand-dark py-10 md:py-14">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>
                        <h2 className="text-white">Work with LAYYA leadership</h2>
                        <p className="mt-2 max-w-xl text-sm text-white/70">
                            Partnerships, programs, and press go through the executive office.
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <GuestButton href={route('contact')} variant="amber">
                            Contact us
                        </GuestButton>
                        <GuestButton href={route('get-involved')} variant="ghost">
                            Get involved
                        </GuestButton>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
