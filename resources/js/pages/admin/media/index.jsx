import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Media' },
];

const fieldClass =
    'w-full rounded-xl border border-brand/20 bg-white px-3 py-2 text-sm text-brand-ink outline-none focus:border-brand';

export default function AdminMediaIndex({ items, kind = 'gallery' }) {
    const { canEditContent } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const rows = paginatorItems(items);
    const meta = items && !Array.isArray(items) ? items : null;
    const isVideo = kind === 'video';

    return (
        <AppLayout breadcrumbs={breadcrumbs} contentClassName="bg-brand-soft">
            <Head title={isVideo ? 'Admin · Videos' : 'Admin · Gallery'} />

            <div className="mx-auto max-w-6xl space-y-8">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">Archive</p>
                    <h1 className="mt-2 text-3xl font-semibold text-brand-ink">Photos and videos</h1>
                    <p className="mt-2 max-w-2xl text-sm text-brand-muted">
                        Upload gallery images from the backend. For large videos, paste a YouTube link instead of uploading the file.
                    </p>
                </div>

                {flash.success ? (
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm text-brand">{flash.success}</div>
                ) : null}

                <div className="flex flex-wrap gap-2">
                    <Link
                        href={route('admin.media.index', { kind: 'gallery' })}
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            !isVideo ? 'bg-brand text-white' : 'bg-white text-brand'
                        }`}
                    >
                        Gallery
                    </Link>
                    <Link
                        href={route('admin.media.index', { kind: 'video' })}
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            isVideo ? 'bg-brand text-white' : 'bg-white text-brand'
                        }`}
                    >
                        Videos
                    </Link>
                </div>

                {canEditContent ? <MediaForm key={kind} kind={kind} /> : (
                    <p className="rounded-2xl bg-white px-4 py-3 text-sm text-brand-muted">
                        View only. Ask the Chairman to assign you as an admin before you can upload media.
                    </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rows.length === 0 ? (
                        <div className="rounded-3xl bg-white p-8 text-sm text-brand-muted sm:col-span-2 lg:col-span-3">
                            No {isVideo ? 'videos' : 'images'} yet. {canEditContent ? 'Add the first one above.' : ''}
                        </div>
                    ) : (
                        rows.map((item) => (
                            <article key={item.id} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                                <div className="relative aspect-video bg-brand-dark">
                                    <img
                                        src={item.poster_url || item.url || '/images/cover.jpg'}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-amber">
                                        {item.category || (isVideo ? 'Video' : 'Gallery')}
                                        {item.source === 'youtube' ? ' · YouTube' : ''}
                                    </p>
                                    <h2 className="mt-1 font-semibold text-brand-ink">{item.title}</h2>
                                    {item.caption ? <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{item.caption}</p> : null}
                                    {canEditContent ? (
                                        <button
                                            type="button"
                                            className="mt-3 text-xs font-semibold text-red-700 hover:underline"
                                            onClick={() => {
                                                if (!confirm('Remove this item from the website?')) return;
                                                router.delete(route('admin.media.destroy', item.id), { preserveScroll: true });
                                            }}
                                        >
                                            Remove
                                        </button>
                                    ) : null}
                                </div>
                            </article>
                        ))
                    )}
                </div>

                {meta?.links ? (
                    <div className="flex flex-wrap gap-2">
                        {meta.links.map((link, index) => (
                            <Link
                                key={`${link.label}-${index}`}
                                href={link.url || '#'}
                                className={`rounded-full px-3 py-1.5 text-sm ${
                                    link.active ? 'bg-brand text-white' : 'bg-white text-brand'
                                } ${link.url ? '' : 'pointer-events-none opacity-40'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}

function MediaForm({ kind }) {
    const isVideo = kind === 'video';
    const { data, setData, post, processing, errors, reset } = useForm({
        kind,
        title: '',
        caption: '',
        category: isVideo ? 'Community' : 'Programs',
        year: '',
        source: isVideo ? 'youtube' : 'upload',
        youtube_url: '',
        file: null,
        poster: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.media.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset('title', 'caption', 'youtube_url', 'file', 'poster'),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-brand-ink">{isVideo ? 'Add a video' : 'Upload a photo'}</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-brand-ink">Title</label>
                    <input value={data.title} onChange={(e) => setData('title', e.target.value)} className={fieldClass} required />
                    {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title}</p> : null}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-brand-ink">Category</label>
                    <select value={data.category} onChange={(e) => setData('category', e.target.value)} className={fieldClass}>
                        <option>Programs</option>
                        <option>Tawus Hub</option>
                        <option>Sports</option>
                        <option>Community</option>
                        <option>Culture</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-brand-ink">Caption</label>
                    <textarea value={data.caption} onChange={(e) => setData('caption', e.target.value)} rows={2} className={fieldClass} />
                </div>
                {isVideo ? (
                    <>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Source</label>
                            <select value={data.source} onChange={(e) => setData('source', e.target.value)} className={fieldClass}>
                                <option value="youtube">YouTube link (recommended for large videos)</option>
                                <option value="upload">Upload a short video (max 50 MB)</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Year</label>
                            <input value={data.year} onChange={(e) => setData('year', e.target.value)} className={fieldClass} placeholder="2026" />
                        </div>
                        {data.source === 'youtube' ? (
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-brand-ink">YouTube link</label>
                                <input
                                    value={data.youtube_url}
                                    onChange={(e) => setData('youtube_url', e.target.value)}
                                    className={fieldClass}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                {errors.youtube_url ? <p className="mt-1 text-xs text-red-600">{errors.youtube_url}</p> : null}
                            </div>
                        ) : (
                            <div>
                                <label className="mb-1 block text-sm font-medium text-brand-ink">Video file</label>
                                <input
                                    type="file"
                                    accept="video/mp4,video/webm"
                                    onChange={(e) => setData('file', e.target.files?.[0] ?? null)}
                                    className={fieldClass}
                                />
                                {errors.file ? <p className="mt-1 text-xs text-red-600">{errors.file}</p> : null}
                            </div>
                        )}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Poster image (optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('poster', e.target.files?.[0] ?? null)}
                                className={fieldClass}
                            />
                        </div>
                    </>
                ) : (
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-brand-ink">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('file', e.target.files?.[0] ?? null)}
                            className={fieldClass}
                            required
                        />
                        {errors.file ? <p className="mt-1 text-xs text-red-600">{errors.file}</p> : null}
                    </div>
                )}
            </div>
            <button
                type="submit"
                disabled={processing}
                className="rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-brand-ink hover:opacity-90 disabled:opacity-50"
            >
                {processing ? 'Saving…' : isVideo ? 'Add video' : 'Upload photo'}
            </button>
        </form>
    );
}
