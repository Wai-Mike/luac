import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import StatusBadge from '@/components/admin/StatusBadge';
import { BORDER, MUTED, SURFACE, TEAL } from '@/lib/admin-theme';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Calendar, CheckSquare, FileText, FolderOpen, Receipt, ShoppingCart, Sparkles } from 'lucide-react';
import EventsPanel from './events-panel';
import ReportsPanel from './reports-panel';

const TABS = [
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'meetings', label: 'Meetings', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'events', label: 'Events', icon: Sparkles },
    { id: 'procurement', label: 'Procurement', icon: ShoppingCart },
    { id: 'receipts', label: 'Receipts', icon: Receipt },
    { id: 'logistics', label: 'Logistics', icon: FolderOpen },
];
const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };
const CURRENCIES = [
    { value: 'SSP', label: 'South Sudanese pounds (SSP)' },
    { value: 'USD', label: 'US dollars (USD)' },
];
const PAYMENT_METHODS = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank_transfer', label: 'Bank transfer' },
];

export default function AdminOperations({
    reports = [],
    meetings = [],
    tasks = [],
    events = [],
    purchase_requests = [],
    receipts = [],
    logistics = [],
    executives = [],
    departments = [],
    locked_department_id = null,
    capabilities = {},
}) {
    const flash = usePage().props.flash ?? {};
    const [tab, setTab] = useState(() => {
        if (typeof window === 'undefined') {
            return 'reports';
        }
        const saved = window.sessionStorage.getItem('layya-ops-tab');
        return TABS.some((item) => item.id === saved) ? saved : 'reports';
    });
    const selectTab = (id) => {
        setTab(id);
        window.sessionStorage.setItem('layya-ops-tab', id);
    };

    return (
        <AppLayout title="Operations" subtitle="Reports, meetings, events, and finance logistics">
            <Head title="Admin · Operations" />
            <div className="space-y-6">
                {flash.success ? <div className="rounded-[14px] px-4 py-3 text-sm" style={{ background: '#E6F5F0', color: '#178568' }}>{flash.success}</div> : null}
                {flash.error ? <div className="rounded-[14px] px-4 py-3 text-sm" style={{ background: '#FCEAEA', color: '#C94B4B' }}>{flash.error}</div> : null}
                <div className="tab-scroll rounded-[14px] p-1" style={{ background: SURFACE }}>
                    {TABS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => selectTab(item.id)}
                            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] px-3 py-2 text-[13px] font-medium sm:min-h-0 sm:px-4 sm:py-2.5"
                            style={{ background: tab === item.id ? '#fff' : 'transparent', color: tab === item.id ? TEAL : MUTED, boxShadow: tab === item.id ? `inset 0 0 0 1px ${BORDER}` : 'none' }}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </button>
                    ))}
                </div>
                {tab === 'reports' ? <ReportsPanel reports={reports} departments={departments} canPublish={capabilities.publish_reports} lockedDepartmentId={locked_department_id} /> : null}
                {tab === 'meetings' ? <MeetingsPanel meetings={meetings} executives={executives} /> : null}
                {tab === 'tasks' ? <TasksPanel tasks={tasks} executives={executives} meetings={meetings} /> : null}
                {tab === 'events' ? <EventsPanel events={events} executives={executives} /> : null}
                {tab === 'procurement' ? <ProcurementPanel orders={purchase_requests} capabilities={capabilities} /> : null}
                {tab === 'receipts' ? <ReceiptsPanel receipts={receipts} orders={purchase_requests} /> : null}
                {tab === 'logistics' ? <LogisticsPanel documents={logistics} orders={purchase_requests} /> : null}
            </div>
        </AppLayout>
    );
}

function MeetingsPanel({ meetings, executives }) {
    const form = useForm({ title: '', agenda: '', notes: '', location: '', starts_at: '', ends_at: '', attendee_ids: [] });

    return (
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.meetings.store'), { preserveScroll: true, onSuccess: () => form.reset() });
                }}
                className="min-w-0 space-y-3 overflow-hidden rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Schedule meeting</h2>
                <input className={fieldClass} style={fieldStyle} placeholder="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <input className={fieldClass} style={fieldStyle} placeholder="Venue" value={form.data.location} onChange={(e) => form.setData('location', e.target.value)} />
                <label className="text-xs font-semibold uppercase tracking-wide text-brand">Start</label>
                <input type="datetime-local" className={fieldClass} style={fieldStyle} value={form.data.starts_at} onChange={(e) => form.setData('starts_at', e.target.value)} />
                <label className="text-xs font-semibold uppercase tracking-wide text-brand">End</label>
                <input type="datetime-local" className={fieldClass} style={fieldStyle} value={form.data.ends_at} onChange={(e) => form.setData('ends_at', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Agenda" value={form.data.agenda} onChange={(e) => form.setData('agenda', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Important notes" value={form.data.notes} onChange={(e) => form.setData('notes', e.target.value)} />
                <label className="block text-xs font-semibold uppercase tracking-wide text-brand">Attendees</label>
                <div className="max-h-36 space-y-1 overflow-y-auto rounded-xl p-2" style={fieldStyle}>
                    {executives.map((user) => (
                        <label key={user.id} className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={form.data.attendee_ids.includes(user.id)}
                                onChange={() => {
                                    const next = form.data.attendee_ids.includes(user.id)
                                        ? form.data.attendee_ids.filter((id) => id !== user.id)
                                        : [...form.data.attendee_ids, user.id];
                                    form.setData('attendee_ids', next);
                                }}
                            />
                            {user.name}
                        </label>
                    ))}
                </div>
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>Schedule</button>
            </form>
            <div className="space-y-4">
                {meetings.length === 0 ? <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No meetings scheduled.</p> : null}
                {meetings.map((meeting) => (
                    <article key={meeting.id} className="overflow-hidden rounded-3xl bg-white shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="overflow-hidden px-5 py-3 text-white" style={{ background: meeting.status === 'cancelled' ? '#C94B4B' : meeting.status === 'completed' ? '#178568' : TEAL }}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">{meeting.status === 'completed' ? 'Done' : meeting.status === 'cancelled' ? 'Canceled' : 'Upcoming'}</p>
                            <h3 className="font-fraunces text-xl">{meeting.title}</h3>
                        </div>
                        <div className="space-y-2 p-5">
                            <p className="text-sm text-brand-muted">
                                {meeting.starts_at ? new Date(meeting.starts_at).toLocaleString() : '—'}
                                {meeting.location ? ` · ${meeting.location}` : ''}
                            </p>
                            {meeting.agenda ? <p className="text-sm text-brand-ink">{meeting.agenda}</p> : null}
                            {meeting.notes ? <p className="text-sm text-brand-muted">Notes: {meeting.notes}</p> : null}
                            <p className="text-xs text-brand-muted">Attendees: {(meeting.attendees || []).map((u) => u.name).join(', ') || 'None yet'}</p>
                            {meeting.status === 'scheduled' ? (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => router.put(route('admin.operations.meetings.update', meeting.id), { ...meeting, status: 'completed', attendee_ids: (meeting.attendees || []).map((u) => u.id), starts_at: meeting.starts_at?.slice?.(0, 16) || meeting.starts_at })}>
                                        Mark done
                                    </button>
                                    <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700" onClick={() => router.put(route('admin.operations.meetings.update', meeting.id), { ...meeting, status: 'cancelled', attendee_ids: (meeting.attendees || []).map((u) => u.id), starts_at: meeting.starts_at?.slice?.(0, 16) || meeting.starts_at })}>
                                        Cancel
                                    </button>
                                </div>
                            ) : null}
                            <MeetingTaskForm meeting={meeting} executives={executives} />
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

function MeetingTaskForm({ meeting, executives }) {
    const form = useForm({ title: '', assigned_to: '', due_on: '', priority: 'high', is_delegation: false, meeting_id: meeting.id });

    return (
        <form
            className="mt-3 grid gap-2 rounded-2xl p-3 sm:grid-cols-2"
            style={{ background: SURFACE }}
            onSubmit={(e) => {
                e.preventDefault();
                form.post(route('admin.operations.tasks.store'), { preserveScroll: true, onSuccess: () => form.reset('title', 'assigned_to', 'due_on') });
            }}
        >
            <input className={`${fieldClass} sm:col-span-2`} style={fieldStyle} placeholder="Assign a follow-up or delegation" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
            <select className={fieldClass} style={fieldStyle} value={form.data.assigned_to} onChange={(e) => form.setData('assigned_to', e.target.value)}>
                <option value="">Assign to one person</option>
                {executives.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <input type="date" className={fieldClass} style={fieldStyle} value={form.data.due_on} onChange={(e) => form.setData('due_on', e.target.value)} />
            <label className="flex items-center gap-2 text-xs text-brand-muted">
                <input type="checkbox" checked={form.data.is_delegation} onChange={(e) => form.setData('is_delegation', e.target.checked)} />
                Delegation
            </label>
            <button type="submit" className="rounded-full px-3 py-2 text-xs font-semibold text-white" style={{ background: TEAL }}>Add task</button>
        </form>
    );
}

function TasksPanel({ tasks, executives, meetings }) {
    const form = useForm({ title: '', description: '', assigned_to: '', due_on: '', priority: 'moderate', is_delegation: false, meeting_id: '' });

    return (
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.tasks.store'), { preserveScroll: true, onSuccess: () => form.reset() });
                }}
                className="min-w-0 space-y-3 overflow-hidden rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Assign task</h2>
                <input className={fieldClass} style={fieldStyle} placeholder="Task title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="What needs to happen" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.assigned_to} onChange={(e) => form.setData('assigned_to', e.target.value)}>
                    <option value="">Assign to one person</option>
                    {executives.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
                <select className={fieldClass} style={fieldStyle} value={form.data.meeting_id} onChange={(e) => form.setData('meeting_id', e.target.value)}>
                    <option value="">Optional: from a meeting</option>
                    {meetings.map((meeting) => <option key={meeting.id} value={meeting.id}>{meeting.title}</option>)}
                </select>
                <input type="date" className={fieldClass} style={fieldStyle} value={form.data.due_on} onChange={(e) => form.setData('due_on', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.priority} onChange={(e) => form.setData('priority', e.target.value)}>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                </select>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.data.is_delegation} onChange={(e) => form.setData('is_delegation', e.target.checked)} />
                    This is a delegation
                </label>
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>Assign</button>
            </form>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <article key={task.id} className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{task.title}</h3>
                                <p className="text-xs text-brand-muted">
                                    {task.is_delegation ? 'Delegation · ' : ''}
                                    {task.assignee?.name || 'Unassigned'}
                                    {task.due_on ? ` · due ${task.due_on}` : ''}
                                    {` · ${task.priority}`}
                                </p>
                            </div>
                            <StatusBadge status={task.status === 'done' ? 'approved' : task.status === 'in_progress' ? 'pending' : 'draft'} label={task.status.replace('_', ' ')} />
                        </div>
                        {task.description ? <p className="mt-3 text-sm text-brand-muted">{task.description}</p> : null}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['open', 'in_progress', 'done'].map((status) => (
                                <button key={status} type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: task.status === status ? TEAL : SURFACE, color: task.status === status ? '#fff' : TEAL }} onClick={() => router.put(route('admin.operations.tasks.update', task.id), { ...task, status, assigned_to: task.assigned_to || '', priority: task.priority || 'moderate' })}>
                                    {status.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

function ProcurementPanel({ orders, capabilities }) {
    const form = useForm({
        title: '',
        purpose: '',
        amount: '',
        currency: 'SSP',
        payment_method: 'cash',
        items: [{ description: '', quantity: 1, unit_cost: '' }],
    });

    return (
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.purchase-requests.store'), { preserveScroll: true, onSuccess: () => form.reset() });
                }}
                className="min-w-0 space-y-3 overflow-hidden rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Purchase request</h2>
                <p className="text-xs text-brand-muted">Department raises the order → SG reviews → Chairman approves → Finance releases payment.</p>
                <input className={fieldClass} style={fieldStyle} placeholder="What is needed" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Purpose" value={form.data.purpose} onChange={(e) => form.setData('purpose', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)}>
                    {CURRENCIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <select className={fieldClass} style={fieldStyle} value={form.data.payment_method} onChange={(e) => form.setData('payment_method', e.target.value)}>
                    {PAYMENT_METHODS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                {form.data.items.map((item, index) => (
                    <div key={index} className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_4.5rem_5.5rem]">
                        <input className={fieldClass} style={fieldStyle} placeholder="Item" value={item.description} onChange={(e) => form.setData('items', form.data.items.map((row, i) => (i === index ? { ...row, description: e.target.value } : row)))} />
                        <input type="number" className={fieldClass} style={fieldStyle} value={item.quantity} onChange={(e) => form.setData('items', form.data.items.map((row, i) => (i === index ? { ...row, quantity: e.target.value } : row)))} />
                        <input type="number" className={fieldClass} style={fieldStyle} placeholder="Cost" value={item.unit_cost} onChange={(e) => form.setData('items', form.data.items.map((row, i) => (i === index ? { ...row, unit_cost: e.target.value } : row)))} />
                    </div>
                ))}
                <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => form.setData('items', [...form.data.items, { description: '', quantity: 1, unit_cost: '' }])}>Add line</button>
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>Submit for review</button>
            </form>
            <div className="space-y-3">
                {orders.map((order) => (
                    <article key={order.id} className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="flex flex-wrap justify-between gap-2">
                            <div>
                                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{order.title}</h3>
                                <p className="text-xs text-brand-muted">{order.requester?.name || 'Department'} · {order.amount} {order.currency}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {order.budget_hold ? <StatusBadge status="rejected" label="Budget hold" /> : null}
                                <StatusBadge status={order.status} />
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-brand-muted">{order.purpose}</p>
                        {order.hold_reason ? <p className="mt-2 text-xs font-semibold text-red-700">{order.hold_reason}</p> : null}
                        <ul className="mt-2 text-xs text-brand-muted">
                            {(order.items || []).map((item) => <li key={item.id}>{item.quantity} × {item.description} @ {item.unit_cost}</li>)}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <a href={order.print_url} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }}>View / print</a>
                            <a href={order.download_url} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL }}>Download</a>
                            {capabilities.release_holds && order.budget_hold ? (
                                <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => router.post(route('admin.operations.purchase-requests.release-hold', order.id))}>Release hold</button>
                            ) : null}
                            {capabilities.review_orders && order.status === 'submitted' && !order.budget_hold ? (
                                <>
                                    <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => router.post(route('admin.operations.purchase-requests.review', order.id), { decision: 'reviewed' })}>SG review</button>
                                    <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700" onClick={() => router.post(route('admin.operations.purchase-requests.review', order.id), { decision: 'rejected' })}>Reject</button>
                                </>
                            ) : null}
                            {capabilities.approve_orders && order.status === 'reviewed' ? (
                                <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => router.post(route('admin.operations.purchase-requests.approve', order.id))}>Chairman approve</button>
                            ) : null}
                            {capabilities.release_payment && order.status === 'approved' ? (
                                <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => router.post(route('admin.operations.purchase-requests.pay', order.id))}>Finance release payment</button>
                            ) : null}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

function ReceiptsPanel({ receipts, orders }) {
    const form = useForm({
        title: '',
        vendor: '',
        amount: '',
        currency: 'SSP',
        payment_method: 'cash',
        notes: '',
        purchase_request_id: '',
        received_on: new Date().toISOString().slice(0, 10),
        file: null,
    });

    return (
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.receipts.store'), { preserveScroll: true, forceFormData: true, onSuccess: () => form.reset() });
                }}
                className="min-w-0 space-y-3 overflow-hidden rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Store receipt</h2>
                <p className="text-xs text-brand-muted">Creates a branded LAYYA receipt you can open, download, and print.</p>
                <input className={fieldClass} style={fieldStyle} placeholder="Receipt title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <input className={fieldClass} style={fieldStyle} placeholder="Vendor / payee" value={form.data.vendor} onChange={(e) => form.setData('vendor', e.target.value)} />
                <input type="number" className={fieldClass} style={fieldStyle} placeholder="Amount" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)}>
                    {CURRENCIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <select className={fieldClass} style={fieldStyle} value={form.data.payment_method} onChange={(e) => form.setData('payment_method', e.target.value)}>
                    {PAYMENT_METHODS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <select className={fieldClass} style={fieldStyle} value={form.data.purchase_request_id} onChange={(e) => form.setData('purchase_request_id', e.target.value)}>
                    <option value="">Linked purchase request</option>
                    {orders.map((order) => <option key={order.id} value={order.id}>{order.reference || order.title}</option>)}
                </select>
                <input type="date" className={fieldClass} style={fieldStyle} value={form.data.received_on} onChange={(e) => form.setData('received_on', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Particulars / notes" value={form.data.notes} onChange={(e) => form.setData('notes', e.target.value)} />
                <input type="file" className={fieldClass} style={fieldStyle} onChange={(e) => form.setData('file', e.target.files?.[0] || null)} />
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>Save receipt</button>
            </form>
            <div className="space-y-3">
                {receipts.length === 0 ? <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No receipts yet. Save a payment to print the official LAYYA paper.</p> : null}
                {receipts.map((receipt) => (
                    <article key={receipt.id} className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">Official receipt</p>
                        <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{receipt.title}</h3>
                        <p className="text-xs text-brand-muted">{receipt.reference} · {receipt.vendor || 'Vendor'} · {receipt.amount} {receipt.currency || 'SSP'}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <a href={receipt.print_url} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }}>View / print</a>
                            <a href={receipt.download_url} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL, border: `1px solid ${BORDER}` }}>Download</a>
                            {receipt.file_url ? <a href={receipt.file_url} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL }}>Attached file</a> : null}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

function LogisticsPanel({ documents, orders = [] }) {
    const form = useForm({
        title: '',
        kind: 'waybill',
        document_date: new Date().toISOString().slice(0, 10),
        vendor: '',
        party_from: 'Luac Akook Yieu Youth Association',
        party_to: '',
        amount: '',
        currency: 'SSP',
        notes: '',
        purchase_request_id: '',
        items: [{ description: '', quantity: 1, unit: 'unit', unit_cost: '' }],
        details: { vehicle_reg: '', driver_name: '', origin: '', destination: '', valid_until: '', payment_terms: '', payment_method: 'cash', bank_details: '', delivery_address: '', expected_delivery: '', received_by: '', condition: '' },
        file: null,
    });

    const kind = form.data.kind;
    const showTravel = kind === 'waybill';
    const showTerms = kind === 'quotation' || kind === 'invoice';
    const showDelivery = kind === 'lpo' || kind === 'purchase_request' || kind === 'delivery_note';
    const showGoods = kind === 'goods_received';

    return (
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.logistics.store'), { preserveScroll: true, forceFormData: true, onSuccess: () => form.reset() });
                }}
                className="min-w-0 space-y-3 overflow-hidden rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Prepare document</h2>
                <p className="text-xs text-brand-muted">Creates a branded LAYYA paper you can open, download, and print.</p>
                <select className={fieldClass} style={fieldStyle} value={form.data.kind} onChange={(e) => form.setData('kind', e.target.value)}>
                    <option value="purchase_request">Purchase request order</option>
                    <option value="lpo">Local purchase order</option>
                    <option value="quotation">Quotation</option>
                    <option value="invoice">Invoice</option>
                    <option value="delivery_note">Delivery note</option>
                    <option value="goods_received">Goods received note</option>
                    <option value="waybill">Waybill</option>
                    <option value="mou">Memorandum of understanding</option>
                    <option value="agreement">Agreement / contract</option>
                    <option value="partner_register">Partner / donor register</option>
                    <option value="other">Other</option>
                </select>
                <input className={fieldClass} style={fieldStyle} placeholder="Document title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <input type="date" className={fieldClass} style={fieldStyle} value={form.data.document_date} onChange={(e) => form.setData('document_date', e.target.value)} />
                <input className={fieldClass} style={fieldStyle} placeholder="From" value={form.data.party_from} onChange={(e) => form.setData('party_from', e.target.value)} />
                <input className={fieldClass} style={fieldStyle} placeholder={showTravel ? 'Consignee / to' : 'Vendor / to'} value={form.data.party_to} onChange={(e) => form.setData('party_to', e.target.value)} />
                <input className={fieldClass} style={fieldStyle} placeholder="Vendor (if different)" value={form.data.vendor} onChange={(e) => form.setData('vendor', e.target.value)} />
                {showTravel ? (
                    <>
                        <input className={fieldClass} style={fieldStyle} placeholder="Origin" value={form.data.details.origin} onChange={(e) => form.setData('details', { ...form.data.details, origin: e.target.value })} />
                        <input className={fieldClass} style={fieldStyle} placeholder="Destination" value={form.data.details.destination} onChange={(e) => form.setData('details', { ...form.data.details, destination: e.target.value })} />
                        <input className={fieldClass} style={fieldStyle} placeholder="Vehicle registration" value={form.data.details.vehicle_reg} onChange={(e) => form.setData('details', { ...form.data.details, vehicle_reg: e.target.value })} />
                        <input className={fieldClass} style={fieldStyle} placeholder="Driver name" value={form.data.details.driver_name} onChange={(e) => form.setData('details', { ...form.data.details, driver_name: e.target.value })} />
                    </>
                ) : null}
                {showTerms ? (
                    <>
                        <input className={fieldClass} style={fieldStyle} placeholder="Payment terms" value={form.data.details.payment_terms} onChange={(e) => form.setData('details', { ...form.data.details, payment_terms: e.target.value })} />
                        <input type="date" className={fieldClass} style={fieldStyle} value={form.data.details.valid_until} onChange={(e) => form.setData('details', { ...form.data.details, valid_until: e.target.value })} />
                    </>
                ) : null}
                {showDelivery ? (
                    <>
                        <input className={fieldClass} style={fieldStyle} placeholder="Delivery address" value={form.data.details.delivery_address} onChange={(e) => form.setData('details', { ...form.data.details, delivery_address: e.target.value })} />
                        <input type="date" className={fieldClass} style={fieldStyle} value={form.data.details.expected_delivery} onChange={(e) => form.setData('details', { ...form.data.details, expected_delivery: e.target.value })} />
                    </>
                ) : null}
                {showGoods ? (
                    <>
                        <input className={fieldClass} style={fieldStyle} placeholder="Received by" value={form.data.details.received_by} onChange={(e) => form.setData('details', { ...form.data.details, received_by: e.target.value })} />
                        <input className={fieldClass} style={fieldStyle} placeholder="Condition of goods" value={form.data.details.condition} onChange={(e) => form.setData('details', { ...form.data.details, condition: e.target.value })} />
                    </>
                ) : null}
                <select className={fieldClass} style={fieldStyle} value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)}>
                    {CURRENCIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <select className={fieldClass} style={fieldStyle} value={form.data.details.payment_method} onChange={(e) => form.setData('details', { ...form.data.details, payment_method: e.target.value })}>
                    {PAYMENT_METHODS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                {form.data.details.payment_method === 'bank_transfer' ? (
                    <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Bank name, account name, and account number" value={form.data.details.bank_details} onChange={(e) => form.setData('details', { ...form.data.details, bank_details: e.target.value })} />
                ) : null}
                <select className={fieldClass} style={fieldStyle} value={form.data.purchase_request_id} onChange={(e) => form.setData('purchase_request_id', e.target.value)}>
                    <option value="">Link a purchase request (optional)</option>
                    {orders.map((order) => <option key={order.id} value={order.id}>{order.reference || order.title}</option>)}
                </select>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">Line items</p>
                {form.data.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                        <input className={`${fieldClass} col-span-2`} style={fieldStyle} placeholder="Description" value={item.description} onChange={(e) => form.setData('items', form.data.items.map((row, i) => (i === index ? { ...row, description: e.target.value } : row)))} />
                        <input type="number" className={fieldClass} style={fieldStyle} placeholder="Qty" value={item.quantity} onChange={(e) => form.setData('items', form.data.items.map((row, i) => (i === index ? { ...row, quantity: e.target.value } : row)))} />
                        <input className={fieldClass} style={fieldStyle} placeholder="Unit" value={item.unit} onChange={(e) => form.setData('items', form.data.items.map((row, i) => (i === index ? { ...row, unit: e.target.value } : row)))} />
                        <input type="number" className={`${fieldClass} col-span-2`} style={fieldStyle} placeholder="Unit cost" value={item.unit_cost} onChange={(e) => form.setData('items', form.data.items.map((row, i) => (i === index ? { ...row, unit_cost: e.target.value } : row)))} />
                    </div>
                ))}
                <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => form.setData('items', [...form.data.items, { description: '', quantity: 1, unit: 'unit', unit_cost: '' }])}>Add line</button>
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Notes" value={form.data.notes} onChange={(e) => form.setData('notes', e.target.value)} />
                <input type="file" className={fieldClass} style={fieldStyle} onChange={(e) => form.setData('file', e.target.files?.[0] || null)} />
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>Save document</button>
            </form>
            <div className="space-y-3">
                {documents.length === 0 ? <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No logistics documents yet. Prepare a waybill, invoice, quotation, or purchase order.</p> : null}
                {documents.map((doc) => (
                    <article key={doc.id} className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">{doc.kind_label || doc.kind}</p>
                                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{doc.title}</h3>
                                <p className="text-xs text-brand-muted">{doc.reference} · {doc.party_to || doc.vendor || 'LAYYA'} · {doc.currency || 'SSP'} · {doc.uploader?.name || 'Finance'}</p>
                            </div>
                        </div>
                        {(doc.items || []).length ? (
                            <ul className="mt-3 text-xs text-brand-muted">
                                {doc.items.slice(0, 4).map((item, i) => (
                                    <li key={`${doc.id}-item-${i}`}>{item.quantity || 1} × {item.description}</li>
                                ))}
                            </ul>
                        ) : null}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <a href={doc.print_url} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }}>View / print</a>
                            <a href={doc.download_url} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL, border: `1px solid ${BORDER}` }}>Download</a>
                            {doc.file_url ? <a href={doc.file_url} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL }}>Attached file</a> : null}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
