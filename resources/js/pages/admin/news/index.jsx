import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import StatusBadge from '@/components/admin/StatusBadge';
import { AdminRow, AdminTable } from '@/components/admin/AdminTable';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, SURFACE, TEAL } from '@/lib/admin-theme';
import { uploadPortrait } from '@/lib/upload-portrait';
import { Head, useForm, usePage } from '@inertiajs/react';

const fieldClass = 'w-full rounded-xl px-3 py-2 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };

export default function AdminNews({ stories = [] }) {
    const { canEditContent } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const [filter, setFilter] = useState('All');
    const [editing, setEditing] = useState(null);
    const { data, setData, put, processing } = useForm({
        news_events: stories,
        redirect: 'admin.news.index',
    });

    const types = ['All', ...new Set(data.news_events.map((row) => row.type).filter(Boolean))];
    const visible = filter === 'All' ? data.news_events : data.news_events.filter((row) => row.type === filter);

    const update = (index, field, value) => {
        setData('news_events', data.news_events.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const save = () => put(route('admin.content.site.update'), { preserveScroll: true });

    return (
        <AppLayout title="News & Events" subtitle="Public announcements — publish, edit, or remove stories">
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
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="rounded-full px-4 py-2 text-sm font-semibold"
                                style={{ background: SURFACE, color: TEAL }}
                                onClick={() => {
                                    setData('news_events', [...data.news_events, { title: 'New story', type: 'Gatherings', excerpt: '', date: '', image: '/images/cover.jpg', status: 'draft' }]);
                                    setEditing(data.news_events.length);
                                }}
                            >
                                New story
                            </button>
                            <button type="button" onClick={save} disabled={processing} className="rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                                {processing ? 'Saving…' : 'Save news'}
                            </button>
                        </div>
                    ) : null}
                </div>

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
