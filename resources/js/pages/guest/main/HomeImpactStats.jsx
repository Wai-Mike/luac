import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import { impactStats } from '../data/siteContent';

export default function HomeImpactStats() {
    return (
        <section className="bg-brand py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Impact"
                    title="Momentum you can feel"
                    subtitle="Numbers shift every season — here is a snapshot of what youth-led action can grow."
                    light
                />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {impactStats.map((s, i) => (
                        <FadeIn key={s.label} delay={i * 0.06}>
                            <div className="border border-white/40 bg-white p-8 text-center">
                                <p className="text-4xl font-bold text-brand sm:text-5xl">{s.value}</p>
                                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand-ink">{s.label}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
