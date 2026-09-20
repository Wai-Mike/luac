import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import GuestButton from '@/components/GuestButton';
import CardScrim from '../components/CardScrim';
import FadeIn from '../components/FadeIn';

export default function HomeGalleryPreview({ photos = [] }) {
    if (!photos.length) {
        return null;
    }

    const featured = photos[0];
    const rest = photos.slice(1, 5);
    const remaining = Math.max(photos.length - 5, 0);

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-md">
                        <h2>
                            Youth, girls
                            <br />
                            <span className="font-fraunces italic text-amber-dark">and community</span>
                        </h2>
                        <p className="mt-4 text-[16px] leading-relaxed text-brand-muted">
                            Moments from Tawus Day, trainings, sports, and everyday life in Luac Akook Yieu.
                        </p>
                    </div>
                    <GuestButton href={route('gallery')} variant="outline" className="shrink-0">
                        Open full gallery →
                    </GuestButton>
                </div>

                <div className={`grid gap-3 sm:gap-4 ${rest.length ? 'lg:grid-cols-2' : ''}`}>
                    <FadeIn>
                        <Link
                            href={route('gallery')}
                            className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-brand-dark lg:h-full lg:aspect-auto"
                        >
                            <img
                                src={featured.src}
                                alt={featured.caption || featured.title || ''}
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-105"
                            />
                            <CardScrim />
                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                {featured.category || featured.tag ? (
                                    <span className="mb-2 inline-flex rounded-full bg-amber px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-ink">
                                        {featured.category || featured.tag}
                                    </span>
                                ) : null}
                                <p className="font-fraunces text-xl font-semibold leading-snug text-[#f3ece0] sm:text-2xl">
                                    {featured.title || featured.caption}
                                </p>
                                {featured.date ? <p className="mt-1 text-xs text-[#f3ece0]/70 sm:text-sm">{featured.date}</p> : null}
                            </div>
                        </Link>
                    </FadeIn>

                    {rest.length ? (
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {rest.map((photo, i) => {
                                const isLast = i === rest.length - 1 && remaining > 0;
                                return (
                                    <FadeIn key={`${photo.src}-${i}`} delay={0.05 + i * 0.05}>
                                        <Link href={route('gallery')} className="group relative block aspect-square overflow-hidden rounded-2xl bg-brand-dark">
                                            <img
                                                src={photo.src}
                                                alt={photo.caption || photo.title || ''}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-105"
                                            />
                                            {isLast ? (
                                                <div className="absolute inset-0 flex items-center justify-center bg-brand-ink/60 backdrop-blur-[2px]">
                                                    <span className="flex items-center gap-1 font-display text-lg font-bold text-white">
                                                        +{remaining}
                                                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                                    </span>
                                                </div>
                                            ) : (
                                                <div
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute inset-0 bg-brand-ink/0 transition group-hover:bg-brand-ink/10"
                                                />
                                            )}
                                        </Link>
                                    </FadeIn>
                                );
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
