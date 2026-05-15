import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import { impactStats } from '../data/siteContent';

export default function HomeImpactStats() {
    return (
        <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 py-16 md:py-24">
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
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                                <p className="text-4xl font-extrabold text-[#ffe156] sm:text-5xl">{s.value}</p>
                                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-teal-200">{s.label}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
