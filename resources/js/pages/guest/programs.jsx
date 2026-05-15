import GuestLayout from '@/layouts/GuestLayout';
import SectionHeader from './components/SectionHeader';
import FadeIn from './components/FadeIn';
import { programsDetail } from './data/siteContent';

export default function Programs({ programsHeroImage, programsGallery = [] }) {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-white pb-20">
                <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-slate-900 py-16 md:py-24">
                    <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
                    <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
                        <div className="flex-1">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Programs</p>
                            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Built for youth impact</h1>
                            <p className="mt-5 max-w-xl text-lg text-teal-100 leading-relaxed">
                                Detailed focus areas that translate community energy into projects, skills, and lasting connection.
                            </p>
                        </div>
                        <div className="flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                            <img
                                src={programsHeroImage ?? '/images/cover.jpg'}
                                alt=""
                                className="aspect-[5/4] w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                    <SectionHeader
                        title="Program pillars"
                        subtitle="Each pillar includes workshops, mentorship touchpoints, and community showcases."
                    />
                    <div className="space-y-12">
                        {programsDetail.map((p, i) => (
                            <FadeIn key={p.title}>
                                <article className="grid gap-8 rounded-3xl border border-slate-100 bg-slate-50/60 p-8 md:grid-cols-[1fr_1.2fr] md:items-center">
                                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                        <img
                                            src={programsGallery[i % programsGallery.length] ?? '/images/education.jpg'}
                                            alt=""
                                            className="aspect-video w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold text-emerald-600">{String(i + 1).padStart(2, '0')}</span>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-900">{p.title}</h2>
                                        <p className="mt-4 text-slate-600 leading-relaxed">{p.body}</p>
                                    </div>
                                </article>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
