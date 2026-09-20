import { useState } from 'react';
import { Play, X } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import FadeIn from './FadeIn';
import { communityVideos } from '../data/siteContent';

function VideoModal({ item, onClose }) {
    if (!item) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close video" onClick={onClose} />
            <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-brand-dark shadow-2xl">
                <button type="button" onClick={onClose} className="absolute right-3 top-3 z-10 text-white" aria-label="Close">
                    <X className="h-6 w-6" />
                </button>
                <div className="relative aspect-video bg-black">
                    {item.youtubeId ? (
                        <iframe
                            title={item.title}
                            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                            className="absolute inset-0 h-full w-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    ) : item.src ? (
                        <video src={item.src} poster={item.poster} controls autoPlay className="h-full w-full object-contain" />
                    ) : (
                        <img src={item.poster} alt={item.title} className="photo-fill" />
                    )}
                </div>
                <div className="p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber-dark">{item.category} · {item.year}</p>
                    <h3 className="mt-1 text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

function VideoTile({ item, onPlay, large = false }) {
    return (
        <button
            type="button"
            onClick={onPlay}
            className={`group relative block w-full overflow-hidden rounded-3xl bg-brand-dark text-left ${
                large ? 'aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-full' : 'aspect-video'
            }`}
        >
            <img
                src={item.poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-105"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent"
            />
            {item.category ? (
                <span className="absolute left-4 top-4 rounded-full bg-amber px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-ink">
                    {item.category}
                </span>
            ) : null}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span
                    className={`flex items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-lg transition duration-300 ease-out group-hover:scale-110 group-hover:bg-amber ${
                        large ? 'h-16 w-16' : 'h-12 w-12'
                    }`}
                >
                    <Play className={large ? 'h-6 w-6 fill-current' : 'h-5 w-5 fill-current'} aria-hidden="true" />
                </span>
            </span>
            <div className={`absolute inset-x-0 bottom-0 ${large ? 'p-5 sm:p-6' : 'p-4'}`}>
                <p className={`font-fraunces font-semibold leading-snug text-[#f3ece0] ${large ? 'text-xl sm:text-2xl' : 'text-base'}`}>
                    {item.title}
                </p>
                {item.year ? <p className="mt-1 text-xs text-[#f3ece0]/70">{item.year}</p> : null}
            </div>
        </button>
    );
}

export default function CommunityVideos({ preview = false, videos }) {
    const [active, setActive] = useState(null);
    const archive = Array.isArray(videos) && videos.length > 0 ? videos : communityVideos;
    const items = preview ? archive.slice(0, 3) : archive;
    const [featured, ...rest] = items;

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2>
                            Videos & historical
                            <br />
                            <span className="font-fraunces italic text-amber-dark">documentation</span>
                        </h2>
                        <p className="mt-3 text-brand-muted">
                            A living record of LAYYA events — Tawus Day, sports, trainings, and community gatherings in Luac Akook
                            Yieu.
                        </p>
                    </div>
                    {preview ? (
                        <GuestButton href={route('videos')} variant="outline" className="shrink-0">
                            View the archive →
                        </GuestButton>
                    ) : null}
                </div>

                {preview && featured ? (
                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                        <FadeIn>
                            <VideoTile item={featured} onPlay={() => setActive(featured)} large />
                        </FadeIn>
                        {rest.length ? (
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
                                {rest.map((item, i) => (
                                    <FadeIn key={item.id || item.title} delay={0.06 + i * 0.06}>
                                        <VideoTile item={item} onPlay={() => setActive(item)} />
                                    </FadeIn>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, i) => (
                            <FadeIn key={item.id || item.title} delay={i * 0.05}>
                                <VideoTile item={item} onPlay={() => setActive(item)} />
                            </FadeIn>
                        ))}
                    </div>
                )}
            </div>
            <VideoModal item={active} onClose={() => setActive(null)} />
        </section>
    );
}
