import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import StatusBadge from '@/components/admin/StatusBadge';
import useCapabilities from '@/hooks/useCapabilities';
import { TEAL } from '@/lib/admin-theme';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';
import { Plus } from 'lucide-react';

const fieldClass =
    'w-full rounded-xl border border-brand/20 bg-white px-3 py-2 text-sm text-brand-ink outline-none focus:border-brand';

export default function AdminMediaIndex({ items, kind = 'gallery' }) {
    const { canEditContent } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const rows = paginatorItems(items);
    const meta = items && !Array.isArray(items) ? items : null;
    const isVideo = kind === 'video';
    const [editingId, setEditingId] = useState(null);
    const editing = rows.find((row) => row.id === editingId) ?? null;

    return (
        <AppLayout title={isVideo ? 'Videos' : 'Gallery'} subtitle="Upload photos, or paste YouTube links for large videos">
            <Head title={isVideo ? 'Admin · Videos' : 'Admin · Gallery'} />

            <div className="space-y-6">
                {flash.success ? (
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm text-brand">{flash.success}</div>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3">
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
                </div>

                {canEditContent && editing ? (
                    <EditMediaForm key={`edit-${editing.id}`} item={editing} kind={kind} onCancel={() => setEditingId(null)} />
                ) : canEditContent ? (
                    <MediaForm key={kind} kind={kind} />
                ) : (
                    <p className="rounded-2xl bg-white px-4 py-3 text-sm text-brand-muted">
                        View only. Ask the Chairman to assign you as an admin before you can upload media.
                    </p>
                )}

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {rows.map((item) => (
                        <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="relative aspect-video bg-brand-dark">
                                <img
                                    src={item.poster_url || item.url || '/images/cover.jpg'}
                                    alt={item.caption || item.title || ''}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute left-2 top-2">
                                    <StatusBadge status="published" />
                                </div>
                            </div>
                            <div className="space-y-3 p-3">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">{item.category || (isVideo ? 'Video' : 'Gallery')}</p>
                                    <p className="font-fraunces text-base font-semibold text-brand-ink">{item.title}</p>
                                    {item.caption ? <p className="mt-1 text-xs text-brand-muted">{item.caption}</p> : null}
                                </div>
                                {canEditContent ? (
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            className="min-h-10 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
                                            style={{ background: TEAL }}
                                            onClick={() => {
                                                setEditingId(item.id);
                                                window.requestAnimationFrame(() => document.getElementById('media-edit')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                                            }}
                                        >
                                            Edit caption
                                        </button>
                                        <button
                                            type="button"
                                            className="min-h-10 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-700"
                                            style={{ border: '1px solid rgba(198,40,40,0.25)' }}
                                            onClick={() => {
                                                if (!confirm('Remove this item from the website?')) return;
                                                router.delete(route('admin.media.destroy', item.id), { preserveScroll: true });
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </article>
                    ))}
                    {canEditContent ? (
                        <label className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-brand" style={{ border: '2px dashed rgba(0,77,77,0.2)' }}>
                            <Plus className="h-5 w-5" />
                            Upload
                            <input type="file" className="hidden" onChange={() => document.querySelector('form input[type=file]')?.click()} />
                        </label>
                    ) : null}
                    {rows.length === 0 && !canEditContent ? (
                        <div className="col-span-full rounded-2xl bg-white p-8 text-sm text-brand-muted">No {isVideo ? 'videos' : 'images'} yet.</div>
                    ) : null}
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

function EditMediaForm({ item, kind, onCancel }) {
    const isVideo = kind === 'video';
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: item.title || '',
        caption: item.caption || '',
        category: item.category || (isVideo ? 'Community' : 'Programs'),
        year: item.year || '',
        youtube_url: item.youtube_url || '',
        file: null,
        poster: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.media.update', item.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: onCancel,
        });
    };

    return (
        <form id="media-edit" onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-brand-ink">Edit published {isVideo ? 'video' : 'photo'}</h2>
                    <p className="text-sm text-brand-muted">Correct the title or caption. The photo stays published unless you replace it.</p>
                </div>
                <img src={item.poster_url || item.url || '/images/cover.jpg'} alt="" className="h-16 w-24 rounded-xl object-cover" />
            </div>
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
                    <textarea value={data.caption} onChange={(e) => setData('caption', e.target.value)} rows={3} className={fieldClass} placeholder="One-line description shown on the public gallery" />
                    {errors.caption ? <p className="mt-1 text-xs text-red-600">{errors.caption}</p> : null}
                </div>
                {isVideo ? (
                    <>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Year</label>
                            <input value={data.year} onChange={(e) => setData('year', e.target.value)} className={fieldClass} placeholder="2026" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">YouTube link</label>
                            <input value={data.youtube_url} onChange={(e) => setData('youtube_url', e.target.value)} className={fieldClass} placeholder="https://www.youtube.com/watch?v=..." />
                            {errors.youtube_url ? <p className="mt-1 text-xs text-red-600">{errors.youtube_url}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Replace video (optional)</label>
                            <input type="file" accept="video/mp4,video/webm" onChange={(e) => setData('file', e.target.files?.[0] ?? null)} className={fieldClass} />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Replace poster (optional)</label>
                            <input type="file" accept="image/*" onChange={(e) => setData('poster', e.target.files?.[0] ?? null)} className={fieldClass} />
                        </div>
                    </>
                ) : (
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-brand-ink">Replace photo (optional)</label>
                        <input type="file" accept="image/*" onChange={(e) => setData('file', e.target.files?.[0] ?? null)} className={fieldClass} />
                        {errors.file ? <p className="mt-1 text-xs text-red-600">{errors.file}</p> : null}
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                    style={{ background: TEAL }}
                >
                    {processing ? 'Saving…' : 'Save caption'}
                </button>
                <button type="button" onClick={onCancel} className="min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold text-brand" style={{ background: '#eef6f6' }}>
                    Cancel
                </button>
            </div>
        </form>
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
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                style={{ background: TEAL }}
            >
                {processing ? 'Saving…' : isVideo ? 'Add video' : 'Upload photo'}
            </button>
        </form>
    );
}
