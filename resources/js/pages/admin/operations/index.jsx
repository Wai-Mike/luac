import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import StatusBadge from '@/components/admin/StatusBadge';
import { BORDER, SURFACE, TEAL } from '@/lib/admin-theme';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Calendar, CheckSquare, FileText } from 'lucide-react';

const TABS = [
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'meetings', label: 'Meetings', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
];
const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };

export default function AdminOperations({ reports = [], meetings = [], tasks = [], executives = [] }) {
    const flash = usePage().props.flash ?? {};
    const [tab, setTab] = useState('reports');

    return (
        <AppLayout title="Operations" subtitle="Executive and council work: reports, meetings, and assigned tasks">
            <Head title="Admin · Operations" />
            <div className="space-y-6">
                {flash.success ? <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>{flash.success}</div> : null}
                <div className="flex flex-wrap gap-1 rounded-2xl p-1" style={{ background: SURFACE }}>
                    {TABS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setTab(item.id)}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                            style={{ background: tab === item.id ? '#fff' : 'transparent', color: tab === item.id ? TEAL : '#4a6b6b' }}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </button>
                    ))}
                </div>
                {tab === 'reports' ? <ReportsPanel reports={reports} /> : null}
                {tab === 'meetings' ? <MeetingsPanel meetings={meetings} executives={executives} /> : null}
                {tab === 'tasks' ? <TasksPanel tasks={tasks} executives={executives} /> : null}
            </div>
        </AppLayout>
    );
}

function ReportsPanel({ reports }) {
    const form = useForm({ title: '', period: '', summary: '', body: '', status: 'draft', is_public: false });

    return (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.reports.store'), { preserveScroll: true, onSuccess: () => form.reset() });
                }}
                className="space-y-3 rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">New report</h2>
                <input className={fieldClass} style={fieldStyle} placeholder="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <input className={fieldClass} style={fieldStyle} placeholder="Period (e.g. 2026 Q1)" value={form.data.period} onChange={(e) => form.setData('period', e.target.value)} />
                <textarea rows={4} className={fieldClass} style={fieldStyle} placeholder="Public summary" value={form.data.summary} onChange={(e) => form.setData('summary', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-brand-ink">
                    <input type="checkbox" checked={form.data.is_public} onChange={(e) => form.setData('is_public', e.target.checked)} />
                    Show on the public Reports page
                </label>
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>
                    Save report
                </button>
            </form>
            <div className="space-y-3">
                {reports.length === 0 ? <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No reports yet. Draft internal notes, then publish to the website when ready.</p> : null}
                {reports.map((report) => (
                    <article key={report.id} className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{report.title}</h3>
                                <p className="text-xs text-brand-muted">{report.period || '—'} · {report.author?.name || 'Executive'}</p>
                            </div>
                            <div className="flex gap-2">
                                <StatusBadge status={report.status} />
                                {report.is_public ? <StatusBadge status="published" label="On website" /> : null}
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-brand-muted">{report.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                                style={{ background: TEAL }}
                                onClick={() => router.put(route('admin.operations.reports.update', report.id), { ...report, status: 'published', is_public: true })}
                            >
                                Publish to website
                            </button>
                            <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700" onClick={() => router.delete(route('admin.operations.reports.destroy', report.id))}>
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

function MeetingsPanel({ meetings, executives }) {
    const form = useForm({ title: '', agenda: '', location: '', starts_at: '', ends_at: '', attendee_ids: [] });

    return (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.meetings.store'), { preserveScroll: true, onSuccess: () => form.reset() });
                }}
                className="space-y-3 rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Schedule meeting</h2>
                <input className={fieldClass} style={fieldStyle} placeholder="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <input className={fieldClass} style={fieldStyle} placeholder="Location or online link" value={form.data.location} onChange={(e) => form.setData('location', e.target.value)} />
                <input type="datetime-local" className={fieldClass} style={fieldStyle} value={form.data.starts_at} onChange={(e) => form.setData('starts_at', e.target.value)} />
                <input type="datetime-local" className={fieldClass} style={fieldStyle} value={form.data.ends_at} onChange={(e) => form.setData('ends_at', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Agenda" value={form.data.agenda} onChange={(e) => form.setData('agenda', e.target.value)} />
                <label className="block text-xs font-semibold uppercase tracking-wide text-brand">Invite executives / council</label>
                <select
                    multiple
                    className={`${fieldClass} h-32`}
                    style={fieldStyle}
                    value={form.data.attendee_ids.map(String)}
                    onChange={(e) => form.setData('attendee_ids', Array.from(e.target.selectedOptions).map((opt) => Number(opt.value)))}
                >
                    {executives.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>
                    Schedule
                </button>
            </form>
            <div className="space-y-3">
                {meetings.length === 0 ? <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No meetings scheduled.</p> : null}
                {meetings.map((meeting) => (
                    <article key={meeting.id} className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{meeting.title}</h3>
                                <p className="text-xs text-brand-muted">
                                    {meeting.starts_at ? new Date(meeting.starts_at).toLocaleString() : '—'}
                                    {meeting.location ? ` · ${meeting.location}` : ''}
                                </p>
                            </div>
                            <StatusBadge status={meeting.status} />
                        </div>
                        {meeting.agenda ? <p className="mt-3 text-sm text-brand-muted">{meeting.agenda}</p> : null}
                        <p className="mt-2 text-xs text-brand-muted">
                            Attendees: {(meeting.attendees || []).map((u) => u.name).join(', ') || 'None yet'}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => router.put(route('admin.operations.meetings.update', meeting.id), { ...meeting, status: 'completed', attendee_ids: (meeting.attendees || []).map((u) => u.id), starts_at: meeting.starts_at?.slice?.(0, 16) || meeting.starts_at })}>
                                Mark complete
                            </button>
                            <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700" onClick={() => router.delete(route('admin.operations.meetings.destroy', meeting.id))}>
                                Cancel
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

function TasksPanel({ tasks, executives }) {
    const form = useForm({ title: '', description: '', assigned_to: '', due_on: '', priority: 'normal' });

    return (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.tasks.store'), { preserveScroll: true, onSuccess: () => form.reset() });
                }}
                className="space-y-3 rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Assign task</h2>
                <input className={fieldClass} style={fieldStyle} placeholder="Task title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="What needs to happen" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.assigned_to} onChange={(e) => form.setData('assigned_to', e.target.value)}>
                    <option value="">Assign to…</option>
                    {executives.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <input type="date" className={fieldClass} style={fieldStyle} value={form.data.due_on} onChange={(e) => form.setData('due_on', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.priority} onChange={(e) => form.setData('priority', e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>
                    Assign task
                </button>
            </form>
            <div className="space-y-3">
                {tasks.length === 0 ? <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No tasks assigned yet.</p> : null}
                {tasks.map((task) => (
                    <article key={task.id} className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{task.title}</h3>
                                <p className="text-xs text-brand-muted">
                                    {task.assignee?.name || 'Unassigned'}
                                    {task.due_on ? ` · due ${task.due_on}` : ''}
                                    {task.priority === 'high' ? ' · high priority' : ''}
                                </p>
                            </div>
                            <StatusBadge status={task.status === 'in_progress' ? 'pending' : task.status === 'done' ? 'approved' : 'draft'} label={task.status.replace('_', ' ')} />
                        </div>
                        {task.description ? <p className="mt-3 text-sm text-brand-muted">{task.description}</p> : null}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['open', 'in_progress', 'done'].map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    className="rounded-full px-3 py-1.5 text-xs font-semibold"
                                    style={{ background: task.status === status ? TEAL : SURFACE, color: task.status === status ? '#fff' : TEAL }}
                                    onClick={() => router.put(route('admin.operations.tasks.update', task.id), { ...task, status, assigned_to: task.assigned_to || '' })}
                                >
                                    {status.replace('_', ' ')}
                                </button>
                            ))}
                            <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700" onClick={() => router.delete(route('admin.operations.tasks.destroy', task.id))}>
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
