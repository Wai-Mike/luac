import { Link } from '@inertiajs/react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import { galleryThemes } from '../data/siteContent';

export default function HomeGalleryPreview({ images = [] }) {
    const slots = galleryThemes.map((item, i) => ({
        ...item,
        src: images[i] ?? '/images/youth.jpg',
    }));

    return (
        <section className="bg-slate-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Gallery"
                    title="Youth, Girls & Community"
                    subtitle="Moments from Tawus Hub, education, sports, community programs, and everyday life in Luac Akok Yieu."
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {slots.map((item, i) => (
                        <FadeIn key={item.caption} delay={i * 0.05}>
                            <figure className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={item.src}
                                        alt=""
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <figcaption className="border-t border-slate-100 px-4 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">{item.tag}</p>
                                    <p className="mt-1 text-sm font-medium text-slate-800">{item.caption}</p>
                                </figcaption>
                            </figure>
                        </FadeIn>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        href={route('gallery')}
                        className="inline-flex min-h-11 items-center rounded-full border-2 border-teal-600 px-8 text-sm font-bold text-teal-700 transition hover:bg-teal-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                    >
                        Open full gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}
