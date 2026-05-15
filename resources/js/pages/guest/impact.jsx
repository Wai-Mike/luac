import GuestLayout from '@/layouts/GuestLayout';
import SectionHeader from './components/SectionHeader';
import FadeIn from './components/FadeIn';
import { impactStats } from './data/siteContent';

const testimonials = [
    {
        quote: 'LAYYA helped me believe my voice matters — we turned our ideas into a real community project.',
        name: 'Youth participant',
        role: 'Luac Akok Yieu',
    },
    {
        quote: 'The mentorship and safe space changed how I plan my future.',
        name: 'Program alum',
        role: 'Juba',
    },
];

export default function Impact() {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-gradient-to-b from-white to-teal-50/40 pb-20 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Impact"
                        title="Change we can measure — and stories we carry forward"
                        subtitle="Outcomes from youth programs, community projects, and partner collaboration."
                    />

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {impactStats.map((s, i) => (
                            <FadeIn key={s.label} delay={i * 0.05}>
                                <div className="rounded-2xl border border-teal-100 bg-white p-8 text-center shadow-sm">
                                    <p className="text-4xl font-extrabold text-teal-700">{s.value}</p>
                                    <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-600">{s.label}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <div className="mt-16 grid gap-8 lg:grid-cols-2">
                        {testimonials.map((t, i) => (
                            <FadeIn key={t.name} delay={0.1 + i * 0.06}>
                                <blockquote className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                                    <p className="text-lg text-slate-700 leading-relaxed">“{t.quote}”</p>
                                    <footer className="mt-6">
                                        <p className="font-bold text-slate-900">{t.name}</p>
                                        <p className="text-sm text-slate-500">{t.role}</p>
                                    </footer>
                                </blockquote>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn className="mt-16">
                        <div className="rounded-3xl border border-emerald-100 bg-teal-50/60 p-8 md:p-10">
                            <h3 className="text-xl font-bold text-slate-900">Program outcomes</h3>
                            <p className="mt-3 text-slate-600 leading-relaxed">
                                Skills gained, civic participation, and peer networks continue to grow as we expand mentorship, safe spaces, and community
                                partnerships. Detailed impact reports will be shared as programs mature.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </GuestLayout>
    );
}
