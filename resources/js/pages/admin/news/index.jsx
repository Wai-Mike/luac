import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import StatusBadge from '@/components/admin/StatusBadge';
import { AdminRow, AdminTable } from '@/components/admin/AdminTable';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, TEAL } from '@/lib/admin-theme';
import { uploadPortrait } from '@/lib/upload-portrait';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const fieldClass = 'w-full rounded-xl px-3 py-2 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };

const emptyStory = () => ({
    title: '',
    type: 'Community',
    excerpt: '',
    body: '',
    date: new Date().toISOString().slice(0, 10),
    image: '/images/cover.jpg',
    status: 'draft',
});

export default function AdminNews({ stories = [] }) {
    const { canEditContent } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const [filter, setFilter] = useState('All');
    const [editing, setEditing] = useState(null);
    const [composing, setComposing] = useState(false);
    const { data, setData, put, processing } = useForm({
        news_events: stories,
        redirect: 'admin.news.index',
    });

    const types = ['All', ...new Set(data.news_events.map((row) => row.type).filter(Boolean))];
    const visible = filter === 'All' ? data.news_events : data.news_events.filter((row) => row.type === filter);

    const update = (index, field, value) => {
        setData('news_events', data.news_events.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const save = () => put(route('admin.content.site.update'), { preserveScroll: true, onSuccess: () => setComposing(false) });

    const startStory = () => {
        setData('news_events', [emptyStory(), ...data.news_events]);
        setEditing(0);
        setComposing(true);
    };

    return (
        <AppLayout title="News & Events" subtitle="Write and publish community stories">
            <Head title="Admin · News & Events" />
            <div className="space-y-6">
                {flash.success ? <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>{flash.success}</div> : null}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {types.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setFilter(item)}
                                className="rounded-full px-4 py-2 text-sm font-semibold"
                                style={{ background: filter === item ? TEAL : '#fff', color: filter === item ? '#fff' : TEAL, border: `1px solid ${BORDER}` }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    {canEditContent ? (
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
                                style={{ background: TEAL }}
                                onClick={startStory}
                            >
                                <Plus className="h-4 w-4" />
                                Create news
                            </button>
                            <button type="button" onClick={save} disabled={processing} className="rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                                {processing ? 'Saving…' : 'Save news'}
                            </button>
                        </div>
                    ) : null}
                </div>

                {composing && data.news_events[0] ? (
                    <section className="space-y-4 rounded-2xl bg-white p-4 sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">New community story</h2>
                        <div className="grid gap-3 md:grid-cols-2">
                            <input className={fieldClass} style={fieldStyle} placeholder="Headline" value={data.news_events[0].title} onChange={(e) => update(0, 'title', e.target.value)} />
                            <input className={fieldClass} style={fieldStyle} placeholder="Type (Community, Programs…)" value={data.news_events[0].type} onChange={(e) => update(0, 'type', e.target.value)} />
                            <input type="date" className={fieldClass} style={fieldStyle} value={data.news_events[0].date || ''} onChange={(e) => update(0, 'date', e.target.value)} />
                            <select className={fieldClass} style={fieldStyle} value={data.news_events[0].status || 'draft'} onChange={(e) => update(0, 'status', e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                        <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Short excerpt for cards" value={data.news_events[0].excerpt} onChange={(e) => update(0, 'excerpt', e.target.value)} />
                        <textarea
                            rows={10}
                            className={`${fieldClass} min-h-48`}
                            style={fieldStyle}
                            placeholder="Write the full community story here…"
                            value={data.news_events[0].body || ''}
                            onChange={(e) => update(0, 'body', e.target.value)}
                        />
                        <input type="file" accept="image/*" className={fieldClass} style={fieldStyle} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadPortrait(file, (url) => update(0, 'image', url)); }} />
                    </section>
                ) : null}

                <AdminTable columns={['Story', 'Type', 'Date', 'Status', 'Actions']}>
                    {visible.map((item) => {
                        const index = data.news_events.indexOf(item);
                        const isEditing = editing === index;
                        return (
                            <AdminRow key={`news-${index}`}>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <input className={fieldClass} style={fieldStyle} value={item.title} onChange={(e) => update(index, 'title', e.target.value)} />
                                            <textarea rows={2} className={fieldClass} style={fieldStyle} value={item.excerpt} onChange={(e) => update(index, 'excerpt', e.target.value)} />
                                            <textarea rows={6} className={fieldClass} style={fieldStyle} placeholder="Full community story" value={item.body || ''} onChange={(e) => update(index, 'body', e.target.value)} />
                                            <input type="file" accept="image/*" className={fieldClass} style={fieldStyle} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadPortrait(file, (url) => update(index, 'image', url)); }} />
                                        </div>
                                    ) : (
                                        <>
                                            <p className="font-medium text-brand-ink">{item.title}</p>
                                            <p className="max-w-md text-xs text-brand-muted">{item.excerpt}</p>
                                        </>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-brand-muted">
                                    {isEditing ? <input className={fieldClass} style={fieldStyle} value={item.type} onChange={(e) => update(index, 'type', e.target.value)} /> : item.type}
                                </td>
                                <td className="px-4 py-3 text-brand-muted">
                                    {isEditing ? <input className={fieldClass} style={fieldStyle} value={item.date || ''} onChange={(e) => update(index, 'date', e.target.value)} /> : item.date}
                                </td>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <select className={fieldClass} style={fieldStyle} value={item.status || 'published'} onChange={(e) => update(index, 'status', e.target.value)}>
                                            <option value="published">published</option>
                                            <option value="draft">draft</option>
                                        </select>
                                    ) : (
                                        <StatusBadge status={item.status || 'published'} />
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {canEditContent ? (
                                        <div className="flex gap-2 text-xs font-semibold">
                                            <button type="button" style={{ color: TEAL }} onClick={() => update(index, 'status', 'published')}>Publish</button>
                                            <button type="button" className="text-brand-muted" onClick={() => setEditing(isEditing ? null : index)}>{isEditing ? 'Done' : 'Edit'}</button>
                                            <button type="button" className="text-red-600" onClick={() => setData('news_events', data.news_events.filter((_, i) => i !== index))}>Delete</button>
                                        </div>
                                    ) : null}
                                </td>
                            </AdminRow>
                        );
                    })}
                </AdminTable>
            </div>
        </AppLayout>
    );
}
