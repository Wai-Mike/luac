import { HeartHandshake, Lightbulb, Scale, ShieldCheck, Sparkles, Users } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import useSiteContent from '@/hooks/useSiteContent';

export default function FocusAreasSection() {
    const { values: valueNames } = useSiteContent();
    const values = (valueNames.length ? valueNames : ['Unity', 'Self-reliance', 'Leadership', 'Equality', 'Peace', 'Culture']).map((name, i) => ({
        name,
        icon: [Users, ShieldCheck, Sparkles, Scale, HeartHandshake, Lightbulb][i % 6],
    }));
    return (
        <section className="relative overflow-hidden bg-brand-dark py-20 md:py-28">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber/10 blur-3xl"
            />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:items-center lg:gap-16">
                    <FadeIn>
                        <h2 className="text-white">
                            What we
                            <br />
                            <span className="font-fraunces italic text-amber">stand on</span>
                        </h2>
                        <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-white/65">
                            The values that guide every program, every meeting, and every decision LAYYA makes.
                        </p>
                    </FadeIn>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {values.map((value, i) => (
                            <FadeIn key={value.name} delay={i * 0.05}>
                                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-1 hover:border-amber/40 hover:bg-white/[0.08]">
                                    <span className="font-fraunces text-3xl font-semibold leading-none text-white/10 transition-colors duration-200 group-hover:text-amber/25">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber/15 text-amber">
                                        <value.icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <p className="mt-3 text-sm font-semibold text-white">{value.name}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
