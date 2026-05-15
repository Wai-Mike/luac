import GuestLayout from '@/layouts/GuestLayout';
import SectionHeader from './components/SectionHeader';
import FadeIn from './components/FadeIn';
import { galleryThemes } from './data/siteContent';

export default function Gallery({ images = [] }) {
    const items = galleryThemes.map((g, i) => ({
        ...g,
        src: images[i] ?? '/images/tawus.jpg',
    }));

    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-slate-50 pb-20 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Gallery"
                        title="Youth, girls & community"
                        subtitle="Moments from trainings, Tawus Hub, sports, dialogue, and service across Luac Akok Yieu."
                    />
                    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                        {items.map((item, i) => (
                            <FadeIn key={item.caption} delay={(i % 6) * 0.04}>
                                <figure className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <img src={item.src} alt="" className="w-full object-cover" loading="lazy" />
                                    <figcaption className="px-4 py-3">
                                        <p className="text-xs font-bold uppercase text-teal-600">{item.tag}</p>
                                        <p className="mt-1 text-sm font-medium text-slate-800">{item.caption}</p>
                                    </figcaption>
                                </figure>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
