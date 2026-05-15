import { HeartHandshake, Lightbulb, Palette, Sparkles, Users, Wallet } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import { focusAreas } from '../data/siteContent';

const icons = [Users, HeartHandshake, Sparkles, Lightbulb, Wallet, Palette];

export default function FocusAreasSection() {
    return (
        <section className="border-y border-slate-100 bg-slate-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader eyebrow="What we do" title="Focus areas" subtitle="Programs built with youth, for youth — practical, inclusive, and community-rooted." />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {focusAreas.map((area, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <FadeIn key={area.title} delay={i * 0.05}>
                                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 text-white shadow-md">
                                        <Icon className="h-6 w-6" aria-hidden />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-slate-900">{area.title}</h3>
                                    <p className="mt-2 text-slate-600 leading-relaxed">{area.description}</p>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
