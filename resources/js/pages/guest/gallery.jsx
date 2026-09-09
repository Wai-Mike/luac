import { useMemo, useState } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';
import { galleryThemes } from './data/siteContent';

const filters = ['All', 'Programs', 'Tawus Hub', 'Sports', 'Community', 'Culture'];
const categories = ['Programs', 'Tawus Hub', 'Sports', 'Community'];

export default function Gallery({ images = [], items: uploadedItems = [] }) {
    const [active, setActive] = useState('All');
    const items = (uploadedItems.length
        ? uploadedItems
        : (images.length ? images : ['/images/tawus.jpg']).map((src, i) => {
            const theme = galleryThemes[i % galleryThemes.length];
            const category = categories[i % categories.length];
            return { src, caption: theme.caption, tag: theme.tag, category };
        }));
    const visible = useMemo(() => (active === 'All' ? items : items.filter((i) => i.category === active)), [active, items]);

    return (
        <GuestLayout title="Gallery">
            <PageHero label="Gallery" title="Youth, girls" italic="and community" image={images[0]} />
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setActive(f)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${active === f ? 'bg-brand text-white' : 'bg-brand-soft text-brand'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {visible.map((item, i) => (
                            <FadeIn key={`${item.caption}-${i}`}>
                                <figure className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-dark">
                                    <img src={item.src} alt="" className="photo-fill transition duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                                    <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition group-hover:opacity-100">
                                        <p className="text-xs text-brand-light">{item.tag}</p>
                                        <p className="font-display text-lg">{item.caption}</p>
                                    </figcaption>
                                </figure>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
