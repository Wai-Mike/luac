import { BookOpen, HeartHandshake, Shield, Users } from 'lucide-react';
import GuestLayout from '@/layouts/GuestLayout';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from './components/FadeIn';
import FocusAreasSection from './main/FocusAreasSection';
import PageHero from './components/PageHero';
import { constitutionFacts } from './data/siteContent';

const facts = [
    { icon: Shield, label: 'Non-political', description: constitutionFacts.status },
    { icon: Users, label: 'Who may join', description: constitutionFacts.membership },
    { icon: BookOpen, label: 'Languages', description: constitutionFacts.languages },
    { icon: HeartHandshake, label: 'Where we work', description: constitutionFacts.places },
];

export default function About({ aboutGallery = [] }) {
    const { missionVision } = useSiteContent();

    return (
        <GuestLayout title="About">
            <PageHero
                label="About"
                title="Luac Akook Yieu Youth Association"
                subtitle={constitutionFacts.aim}
                image={aboutGallery[0]}
            />
            <section className="bg-brand-soft py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                    <div className="rounded-2xl bg-white p-6 md:p-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber">Mission</p>
                        <p className="mt-3 text-xl font-semibold text-brand-ink">{missionVision.mission}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-6 md:p-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber">Vision</p>
                        <p className="mt-3 text-xl font-semibold text-brand-ink">{missionVision.vision}</p>
                    </div>
                </div>
            </section>
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <FadeIn>
                        <div className="space-y-6">
                            {facts.map((p) => (
                                <div key={p.label} className="flex gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                        <p.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-semibold text-brand-ink">{p.label}</p>
                                        <p className="text-sm text-brand-muted">{p.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.08}>
                        <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-dark">
                            {aboutGallery[1] ? <img src={aboutGallery[1]} alt="" className="photo-fill" /> : null}
                        </div>
                    </FadeIn>
                </div>
            </section>
            <section className="bg-brand-soft py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-10">Key pillars</h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {constitutionFacts.pillars.map((p) => (
                            <div key={p.label} className="rounded-2xl bg-white p-6">
                                <p className="font-semibold text-brand">{p.label}</p>
                                <p className="mt-2 text-sm text-brand-muted">{p.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {constitutionFacts.symbols.map((s) => (
                            <div key={s.name} className="rounded-2xl border border-brand/10 bg-white p-5">
                                <p className="text-xs font-semibold uppercase tracking-widest text-amber">{s.name}</p>
                                <p className="mt-2 text-sm text-brand-muted">{s.meaning}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-sm text-brand-muted">
                        LAYYA is led by 17 executive members, including the Chairman, and a council of seven members headed by the
                        Speaker.
                    </p>
                </div>
            </section>
            <FocusAreasSection />
        </GuestLayout>
    );
}
