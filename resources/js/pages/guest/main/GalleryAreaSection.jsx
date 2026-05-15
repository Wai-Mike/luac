import { useMemo, useState } from 'react';
import SectionTitle from './SectionTitle';

const FILTERS = [
    { id: '*', label: 'All' },
    { id: 'programs', label: 'Programs' },
    { id: 'tawus', label: 'Tawus hub' },
    { id: 'events', label: 'Events' },
];

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b60c9] focus-visible:ring-offset-2';

export default function GalleryAreaSection({ images = [] }) {
    const [active, setActive] = useState('*');

    const tagged = useMemo(() => {
        const cats = ['programs', 'tawus', 'events'];
        return images.map((src, i) => ({
            src,
            tags: [cats[i % cats.length]],
        }));
    }, [images]);

    const visible = useMemo(() => {
        if (active === '*') return tagged;
        return tagged.filter((t) => t.tags.includes(active));
    }, [tagged, active]);

    if (!images.length) return null;

    return (
        <section id="gallery-area" className="scroll-mt-24 bg-[#ecf1f5] py-16 sm:py-20 lg:py-[117px]">
            <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Our gallery" subtitle="Moments from programs, events, and community life." />
                <div
                    className="gallery-menu mb-10 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3"
                    role="tablist"
                    aria-label="Filter gallery"
                >
                    {FILTERS.map((f) => {
                        const selected = active === f.id;
                        return (
                            <button
                                key={f.id}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                aria-pressed={selected}
                                onClick={() => setActive(f.id)}
                                className={`rounded-sm px-4 py-2.5 font-sans text-sm font-medium capitalize transition motion-safe:duration-150 sm:px-8 sm:py-3.5 sm:text-base ${focusRing} ${
                                    selected
                                        ? 'bg-[#3b60c9] text-white shadow-md'
                                        : 'bg-[#dbe5f3] text-[#131c33] hover:bg-[#3b60c9] hover:text-white'
                                }`}
                            >
                                {f.label}
                            </button>
                        );
                    })}
                </div>
                {visible.length === 0 ? (
                    <p className="py-12 text-center font-sans text-base text-[#3a3b3c]/80">No photos in this category yet. Try &quot;All&quot;.</p>
                ) : (
                    <div className="gallery-gird mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                        {visible.map(({ src }, idx) => (
                            <div
                                key={`${src}-${idx}`}
                                className={`group relative overflow-hidden rounded-sm bg-slate-900 bg-cover bg-center shadow-sm ring-1 ring-black/5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.01] ${
                                    idx % 4 === 0 || idx % 4 === 3 ? 'min-h-[280px] sm:min-h-[300px] lg:min-h-[315px]' : 'min-h-[220px] sm:min-h-[240px] lg:min-h-[250px]'
                                }`}
                                style={{ backgroundImage: `url(${src})` }}
                            >
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center bg-[#3b60c9]/0 transition-all duration-300 group-hover:bg-[#3b60c9]/88">
                                    <div className="translate-y-3 px-6 text-center text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <p className="font-sans text-lg font-bold">Community</p>
                                        <p className="mt-1 font-sans text-sm font-semibold text-white/90">LAYYA gallery</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
