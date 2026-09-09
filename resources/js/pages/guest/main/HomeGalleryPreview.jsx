import GuestButton from '@/components/GuestButton';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import { galleryThemes } from '../data/siteContent';

export default function HomeGalleryPreview({ images = [] }) {
    const slots = galleryThemes.map((item, i) => ({
        ...item,
        src: images[i] ?? '/images/youth.jpg',
    }));

    return (
        <section className="bg-brand-soft py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Gallery"
                    title="Youth, girls & community"
                    subtitle="Moments from Tawus Hub, education, sports, community programs, and everyday life in Luac Akook De Yieu."
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {slots.map((item, i) => (
                        <FadeIn key={item.caption} delay={i * 0.05}>
                            <figure className="overflow-hidden border border-brand/25 bg-white">
                                <div className="relative h-52 overflow-hidden bg-brand-soft sm:h-56">
                                    <img
                                        src={item.src}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-contain object-center"
                                        loading="lazy"
                                    />
                                </div>
                                <figcaption className="border-t border-brand/15 px-4 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">{item.tag}</p>
                                    <p className="mt-1 text-[15px] font-medium text-brand-ink">{item.caption}</p>
                                </figcaption>
                            </figure>
                        </FadeIn>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <GuestButton href={route('gallery')} variant="secondary">
                        Open full gallery
                    </GuestButton>
                </div>
            </div>
        </section>
    );
}
