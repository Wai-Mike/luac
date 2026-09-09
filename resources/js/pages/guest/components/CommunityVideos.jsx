import { useState } from 'react';
import { Play, X } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import FadeIn from './FadeIn';
import SectionLabel from './SectionLabel';
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
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber">{item.category} · {item.year}</p>
                    <h3 className="mt-1 text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

export default function CommunityVideos({ preview = false, videos }) {
    const [active, setActive] = useState(null);
    const archive = Array.isArray(videos) && videos.length > 0 ? videos : communityVideos;
    const items = preview ? archive.slice(0, 3) : archive;

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Community archive</SectionLabel>
                        <h2>
                            Videos & historical
                            <br />
                            documentation
                        </h2>
                        <p className="mt-3 max-w-xl text-brand-muted">
                            A living record of LAYYA events — Tawus Day, sports, trainings, and community gatherings in Luac Akook
                            Yieu.
                        </p>
                    </div>
                    {preview ? (
                        <GuestButton href={route('videos')} variant="outline">
                            View the archive →
                        </GuestButton>
                    ) : null}
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, i) => (
                        <FadeIn key={item.id || item.title} delay={i * 0.06}>
                            <button
                                type="button"
                                onClick={() => setActive(item)}
                                className="group w-full overflow-hidden rounded-3xl bg-brand-dark text-left"
                            >
                                <div className="relative aspect-video">
                                    <img src={item.poster} alt="" className="photo-fill transition duration-500 group-hover:scale-105" />
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber text-brand-ink shadow-lg">
                                            <Play className="h-6 w-6 fill-white" />
                                        </span>
                                    </span>
                                </div>
                                <div className="p-5">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-amber">{item.category}</p>
                                    <h3 className="mt-2 text-white">{item.title}</h3>
                                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                                </div>
                            </button>
                        </FadeIn>
                    ))}
                </div>
            </div>
            <VideoModal item={active} onClose={() => setActive(null)} />
        </section>
    );
}
