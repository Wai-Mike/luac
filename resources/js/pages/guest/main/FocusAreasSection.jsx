import { HeartHandshake, Lightbulb, Scale, ShieldCheck, Sparkles, Users } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import useSiteContent from '@/hooks/useSiteContent';

export default function FocusAreasSection() {
    const { values: valueNames } = useSiteContent();
    const values = (valueNames.length ? valueNames : ['Unity', 'Self-reliance', 'Leadership', 'Equality', 'Peace', 'Culture']).map((name, i) => ({
        name,
        icon: [Users, ShieldCheck, Sparkles, Scale, HeartHandshake, Lightbulb][i % 6],
    }));
    return (
        <section className="bg-brand-soft py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <SectionLabel>Values</SectionLabel>
                    <h2>What we stand on</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {values.map((value, i) => (
                        <FadeIn key={value.name} delay={i * 0.05}>
                            <div className="rounded-2xl bg-white px-4 py-6 text-center transition duration-200 hover:-translate-y-1">
                                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                                    <value.icon className="h-5 w-5" aria-hidden />
                                </span>
                                <p className="mt-3 text-sm font-semibold text-brand-ink">{value.name}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
