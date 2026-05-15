import GuestLayout from '@/layouts/GuestLayout';
import SectionHeader from './components/SectionHeader';
import FadeIn from './components/FadeIn';
import { missionVision, values } from './data/siteContent';

export default function About({ aboutGallery = [] }) {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-gradient-to-b from-teal-50/80 to-white pb-20 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="About"
                        title="Who we are"
                        subtitle="Luac Akok Yieu Youth Association (LAYYA) is a youth-led organization building skills, leadership, and community action."
                        align="left"
                    />
                    <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
                        <FadeIn>
                            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                                <img
                                    src={aboutGallery[0] ?? '/images/youth.jpg'}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            </div>
                        </FadeIn>
                        <div className="space-y-10">
                            <FadeIn delay={0.05}>
                                <h3 className="text-xl font-bold text-slate-900">Our mission</h3>
                                <p className="mt-3 text-lg leading-relaxed text-slate-600">{missionVision.mission}</p>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <h3 className="text-xl font-bold text-slate-900">Our vision</h3>
                                <p className="mt-3 text-lg leading-relaxed text-slate-600">{missionVision.vision}</p>
                            </FadeIn>
                            <FadeIn delay={0.15}>
                                <h3 className="text-xl font-bold text-slate-900">Our values</h3>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {values.map((v) => (
                                        <li
                                            key={v}
                                            className="rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-900"
                                        >
                                            {v}
                                        </li>
                                    ))}
                                </ul>
                            </FadeIn>
                        </div>
                    </div>
                    {aboutGallery.length > 1 && (
                        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                            {aboutGallery.slice(1, 7).map((src) => (
                                <FadeIn key={src}>
                                    <img src={src} alt="" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
                                </FadeIn>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
