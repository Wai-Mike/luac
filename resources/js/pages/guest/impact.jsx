import GuestLayout from '@/layouts/GuestLayout';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';
import { impactStats } from './data/siteContent';

const testimonials = [
    {
        quote: 'LAYYA helped me believe my voice matters — we turned our ideas into a real community project.',
        name: 'Youth participant',
        role: 'Luac Akook Yieu',
    },
    {
        quote: 'The mentorship and safe space changed how I plan my future.',
        name: 'Program alum',
        role: 'Juba',
    },
];

export default function Impact() {
    return (
        <GuestLayout title="Impact">
            <PageHero
                label="Impact"
                title="Change we can"
                italic="measure together"
                subtitle="Outcomes from youth programs, community projects, and partner collaboration."
            />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {impactStats.map((s, i) => (
                            <FadeIn key={s.label} delay={i * 0.05}>
                                <div className="rounded-2xl bg-brand-soft p-8 text-center">
                                    <p className="font-display text-4xl font-bold text-brand">{s.value}</p>
                                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-muted">{s.label}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <div className="mt-16 grid gap-8 lg:grid-cols-2">
                        {testimonials.map((t, i) => (
                            <FadeIn key={t.name} delay={0.1 + i * 0.06}>
                                <blockquote className="h-full rounded-3xl bg-brand-dark p-8 text-white">
                                    <p className="text-[16px] leading-relaxed text-white/80">“{t.quote}”</p>
                                    <footer className="mt-6">
                                        <p className="font-semibold">{t.name}</p>
                                        <p className="text-sm text-white/55">{t.role}</p>
                                    </footer>
                                </blockquote>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
