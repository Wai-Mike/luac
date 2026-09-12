import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FEATURED_LIMIT = 8;

export default function FeaturedCarousel({ photos = [], contain = false }) {
    const [index, setIndex] = useState(0);
    const featured = photos.slice(0, Math.min(FEATURED_LIMIT, photos.length));
    const current = featured[index] || featured[0];

    const go = (next) => {
        if (!featured.length) return;
        setIndex((next + featured.length) % featured.length);
    };

    useEffect(() => {
        if (featured.length < 2) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setIndex((currentIndex) => (currentIndex + 1) % featured.length);
        }, 2000);

        return () => window.clearInterval(timer);
    }, [featured.length, index]);

    if (!current) {
        return null;
    }

    return (
        <div className="relative overflow-hidden rounded-3xl bg-brand-dark">
            <div className={`relative ${contain ? 'aspect-[16/9]' : 'h-[340px] md:h-[420px]'}`}>
                {featured.map((photo, i) => (
                    <img
                        key={`${photo.src}-${i}`}
                        src={photo.src}
                        alt={photo.caption || photo.title || ''}
                        className={`absolute inset-0 h-full w-full transition-all duration-500 ease-out ${
                            contain ? 'object-contain object-center' : 'object-cover'
                        } ${i === index ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`}
                    />
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-amber px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-ink">
                                {current.category || current.tag || 'Gallery'}
                            </span>
                        </div>
                        <h2 className="font-fraunces text-2xl font-semibold text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] md:text-3xl">{current.title || current.caption}</h2>
                        {current.date ? <p className="mt-1 text-sm text-white drop-shadow">{current.date}</p> : null}
                    </div>
                </div>
                <div className="absolute right-4 top-4 flex gap-2">
                    <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() => go(index - 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm hover:bg-black/60"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() => go(index + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm hover:bg-black/60"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
                <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
                    {featured.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Show photo ${i + 1}`}
                            onClick={() => setIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
