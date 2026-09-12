import { useEffect, useMemo, useRef, useState } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import useCapabilities from '@/hooks/useCapabilities';
import { router } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, Eye, Play } from 'lucide-react';
import { galleryThemes } from './data/siteContent';

const PHOTO_SIZES = [
    { key: 'wide', height: 180 },
    { key: 'square', height: 200 },
    { key: 'tall', height: 280 },
];
const FEATURED_LIMIT = 8;
const FILMSTRIP_LIMIT = 7;
const PHOTOS_PER_PAGE = 9;
const VIDEOS_PER_PAGE = 6;
const categories = ['Programs', 'Tawus Hub', 'Sports', 'Community'];

function photoFromSrc(src, i) {
    const theme = galleryThemes[i % galleryThemes.length];
    return {
        src,
        caption: theme.caption,
        title: theme.caption,
        tag: theme.tag,
        category: categories[i % categories.length],
        date: '',
        status: 'published',
    };
}

function normalizePhotos(uploadedItems, images) {
    const fromUploads = uploadedItems.map((item, i) => ({
        ...item,
        title: item.title || item.caption || galleryThemes[i % galleryThemes.length].caption,
        date: item.date || '',
        status: item.status || 'published',
    }));
    const seen = new Set(fromUploads.map((item) => item.src).filter(Boolean));
    const extras = (images.length ? images : ['/images/tawus.jpg'])
        .filter((src) => src && !seen.has(src))
        .map((src, i) => photoFromSrc(src, fromUploads.length + i));

    if (fromUploads.length) {
        return [...fromUploads, ...extras];
    }

    return extras;
}

function formatViews(views) {
    if (!views) {
        return 'New';
    }
    return `${Number(views).toLocaleString()} views`;
}

function EditorActions({ item, kind, className = '' }) {
    const { canEditContent } = useCapabilities();
    if (!canEditContent || !item?.id) {
        return null;
    }

    const stop = (event) => event.stopPropagation();

    return (
        <div className={`flex gap-1 ${className}`} onClick={stop} onKeyDown={stop}>
            <button
                type="button"
                className="rounded-lg bg-white/95 px-2 py-1 text-[11px] font-semibold text-brand"
                onClick={() => router.post(route('admin.media.approve', item.id), {}, { preserveScroll: true })}
            >
                Approve
            </button>
            <button
                type="button"
                className="rounded-lg bg-white/95 px-2 py-1 text-[11px] font-semibold text-red-700"
                onClick={() => {
                    if (!confirm(`Remove this ${kind} from the website?`)) return;
                    router.delete(route('admin.media.destroy', item.id), { preserveScroll: true });
                }}
            >
                Delete
            </button>
        </div>
    );
}

function FeaturedCarousel({ photos, onShowMore }) {
    const [index, setIndex] = useState(0);
    const featured = photos.slice(0, Math.min(FEATURED_LIMIT, photos.length));
    const current = featured[index] || featured[0];
    const extra = Math.max(0, photos.length - FILMSTRIP_LIMIT);
    const thumbs = photos.slice(0, FILMSTRIP_LIMIT);

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
        <div>
            <div className="relative overflow-hidden rounded-3xl bg-brand-dark">
                <div className="relative h-[340px]">
                    {featured.map((photo, i) => (
                        <img
                            key={`${photo.src}-${i}`}
                            src={photo.src}
                            alt=""
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
                                i === index ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'
                            }`}
                        />
                    ))}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-amber px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-dark">
                                    {current.category || current.tag || 'Gallery'}
                                </span>
                            </div>
                            <h2 className="font-fraunces text-2xl font-semibold text-white md:text-3xl">{current.title}</h2>
                            {current.date ? <p className="mt-1 text-sm text-white/70">{current.date}</p> : null}
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
                                className={`h-1.5 rounded-full transition-all ${
                                    i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
                {thumbs.map((photo, i) => (
                    <button
                        key={`${photo.src}-thumb-${i}`}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`h-12 w-[72px] overflow-hidden rounded-lg transition ${
                            i === index ? 'ring-2 ring-amber ring-offset-2' : 'opacity-50 hover:opacity-80'
                        }`}
                    >
                        <img src={photo.src} alt="" className="h-full w-full object-cover" />
                    </button>
                ))}
                {extra > 0 ? (
                    <button
                        type="button"
                        onClick={onShowMore}
                        className="flex h-12 w-[72px] items-center justify-center rounded-lg border border-brand/20 bg-transparent text-xs font-semibold text-brand"
                    >
                        +{extra} more
                    </button>
                ) : null}
            </div>
        </div>
    );
}

function visiblePageNumbers(current, total) {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const marks = new Set([1, total, current, current - 1, current + 1]);
    const sorted = [...marks].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
    const items = [];

    sorted.forEach((page, i) => {
        if (i > 0 && page - sorted[i - 1] > 1) {
            items.push(`ellipsis-${sorted[i - 1]}`);
        }
        items.push(page);
    });

    return items;
}

function GalleryPager({ page, totalPages, onChange, label }) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav aria-label={label} className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onChange(page - 1)}
                className="rounded-full border border-brand/15 px-3 py-1.5 text-sm font-semibold text-brand disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>
            {visiblePageNumbers(page, totalPages).map((item) =>
                typeof item === 'string' ? (
                    <span key={item} className="px-1 text-sm text-brand-muted">
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        aria-current={item === page ? 'page' : undefined}
                        onClick={() => onChange(item)}
                        className={`min-w-9 rounded-full px-3 py-1.5 text-sm font-semibold ${
                            item === page ? 'bg-brand text-white' : 'text-brand hover:bg-brand-soft'
                        }`}
                    >
                        {item}
                    </button>
                ),
            )}
            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onChange(page + 1)}
                className="rounded-full border border-brand/15 px-3 py-1.5 text-sm font-semibold text-brand disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </nav>
    );
}

function PhotoMasonry({ photos, onOpen, startIndex = 0 }) {
    return (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((photo, i) => {
                const size = PHOTO_SIZES[(startIndex + i) % PHOTO_SIZES.length];
                return (
                    <div
                        key={`${photo.src}-${startIndex + i}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => onOpen(photo)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                onOpen(photo);
                            }
                        }}
                        className="group relative mb-4 block w-full cursor-pointer overflow-hidden rounded-2xl bg-brand-dark break-inside-avoid"
                        style={{ height: size.height }}
                    >
                        <img src={photo.src} alt="" className="h-full w-full object-cover" />
                        <EditorActions item={photo} kind="photo" className="absolute right-3 top-3 z-10 opacity-0 transition group-hover:opacity-100" />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-dark/0 opacity-0 transition duration-300 group-hover:bg-brand-dark/70 group-hover:opacity-100">
                            <Eye className="h-8 w-8 text-white" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function VideoGrid({ videos, onOpen }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
                <article key={video.id || video.title} className="group text-left">
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => onOpen(video)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                onOpen(video);
                            }
                        }}
                        className="relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-brand-dark"
                    >
                        <div className="relative aspect-video">
                            <img src={video.poster || '/images/cover.jpg'} alt="" className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,20,20,0.62)_100%)]" />
                            <EditorActions item={video} kind="video" className="absolute right-3 top-3 z-10 opacity-0 transition group-hover:opacity-100" />
                            {video.duration ? (
                                <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                                    {video.duration}
                                </span>
                            ) : null}
                            <span className="absolute inset-0 flex items-center justify-center">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-dark transition group-hover:scale-110">
                                    <Play className="h-6 w-6 fill-current" />
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{video.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                            <span className="rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand">{video.category}</span>
                            {video.date ? <span>{video.date}</span> : null}
                            <span>{formatViews(video.views)}</span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}

function Lightbox({ item, kind, onClose }) {
    const { canEditContent } = useCapabilities();

    useEffect(() => {
        if (!item) return undefined;
        const onKey = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [item, onClose]);

    if (!item) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Close lightbox"
                onClick={onClose}
                className="absolute inset-0 bg-brand-dark/85 backdrop-blur-[8px]"
            />
            <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl bg-black/40 shadow-2xl">
                <div className="flex max-h-[70vh] items-center justify-center bg-black">
                    {kind === 'video' && item.youtubeId ? (
                        <iframe
                            title={item.title}
                            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                            className="aspect-video h-auto w-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    ) : kind === 'video' && item.src ? (
                        <video src={item.src} poster={item.poster} controls autoPlay className="max-h-[70vh] w-full object-contain" />
                    ) : (
                        <img src={item.src || item.poster} alt={item.title || ''} className="max-h-[70vh] w-full object-contain" />
                    )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-dark/90 px-5 py-4 text-white">
                    <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-amber px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-dark">
                                {item.category || item.tag || 'Gallery'}
                            </span>
                        </div>
                        <p className="font-fraunces text-lg font-semibold">{item.title}</p>
                        {item.date ? <p className="text-sm text-white/65">{item.date}</p> : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {canEditContent && item.id ? (
                            <>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand"
                                    onClick={() => router.post(route('admin.media.approve', item.id), {}, { preserveScroll: true })}
                                >
                                    <Check className="h-4 w-4" />
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white"
                                    onClick={() => {
                                        if (!confirm('Remove this item from the website?')) return;
                                        router.delete(route('admin.media.destroy', item.id), { preserveScroll: true, onSuccess: onClose });
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        ) : null}
                        <button type="button" onClick={onClose} className="rounded-full border border-white/30 px-3 py-1.5 text-sm font-semibold text-white">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Gallery({ images = [], items: uploadedItems = [], videos = [] }) {
    const [tab, setTab] = useState('photos');
    const [photoPage, setPhotoPage] = useState(1);
    const [videoPage, setVideoPage] = useState(1);
    const [lightbox, setLightbox] = useState(null);
    const mediaRef = useRef(null);
    const photos = useMemo(() => normalizePhotos(uploadedItems, images), [uploadedItems, images]);

    const photoPageCount = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));
    const videoPageCount = Math.max(1, Math.ceil(videos.length / VIDEOS_PER_PAGE));
    const safePhotoPage = Math.min(photoPage, photoPageCount);
    const safeVideoPage = Math.min(videoPage, videoPageCount);
    const pagePhotos = photos.slice((safePhotoPage - 1) * PHOTOS_PER_PAGE, safePhotoPage * PHOTOS_PER_PAGE);
    const pageVideos = videos.slice((safeVideoPage - 1) * VIDEOS_PER_PAGE, safeVideoPage * VIDEOS_PER_PAGE);

    const goToPage = (kind, page) => {
        if (kind === 'photos') {
            setPhotoPage(page);
        } else {
            setVideoPage(page);
        }
        mediaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <GuestLayout title="Gallery">
            <section className="bg-brand-soft pt-28 pb-8 md:pt-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber">Gallery</p>
                    <h1 className="mt-2 text-[clamp(2rem,4vw,3.2rem)] text-brand-ink">Youth, girls and community</h1>
                    <p className="mt-3 max-w-2xl text-brand-muted">Moments from programs, Tawus Hub, sport, and community life in Luac Akook Yieu.</p>
                </div>
            </section>

            <section className="bg-white py-10 md:py-14">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <FeaturedCarousel
                        photos={photos}
                        onShowMore={() => {
                            setTab('photos');
                            if (photoPageCount > 1) {
                                goToPage('photos', 2);
                            }
                        }}
                    />

                    <div ref={mediaRef} className="flex justify-center scroll-mt-28">
                        <div className="inline-flex rounded-full bg-brand-soft p-1">
                            <button
                                type="button"
                                onClick={() => setTab('photos')}
                                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                                    tab === 'photos' ? 'bg-brand text-white' : 'text-brand'
                                }`}
                            >
                                Photos {photos.length}
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab('videos')}
                                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                                    tab === 'videos' ? 'bg-brand text-white' : 'text-brand'
                                }`}
                            >
                                Videos {videos.length}
                            </button>
                        </div>
                    </div>

                    {tab === 'photos' ? (
                        <div>
                            <PhotoMasonry
                                photos={pagePhotos}
                                startIndex={(safePhotoPage - 1) * PHOTOS_PER_PAGE}
                                onOpen={(photo) => setLightbox({ item: photo, kind: 'photo' })}
                            />
                            <GalleryPager
                                page={safePhotoPage}
                                totalPages={photoPageCount}
                                onChange={(page) => goToPage('photos', page)}
                                label="Photo pages"
                            />
                        </div>
                    ) : (
                        <div>
                            <VideoGrid videos={pageVideos} onOpen={(video) => setLightbox({ item: video, kind: 'video' })} />
                            <GalleryPager
                                page={safeVideoPage}
                                totalPages={videoPageCount}
                                onChange={(page) => goToPage('videos', page)}
                                label="Video pages"
                            />
                        </div>
                    )}
                </div>
            </section>

            <Lightbox item={lightbox?.item} kind={lightbox?.kind} onClose={() => setLightbox(null)} />
        </GuestLayout>
    );
}
