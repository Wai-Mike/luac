import { useMemo, useState } from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { BORDER, SURFACE, TEAL } from '@/lib/admin-theme';
import { router, useForm } from '@inertiajs/react';

const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };
const CURRENCIES = [
    { value: 'SSP', label: 'South Sudanese pounds (SSP)' },
    { value: 'USD', label: 'US dollars (USD)' },
];
const EVENT_KINDS = [
    { value: 'inauguration', label: 'Inauguration / official launch' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'training', label: 'Training session' },
];
const EVENT_PHASES = [
    { id: 'planning', label: '1. Governance' },
    { id: 'budgeting', label: '2. Budget' },
    { id: 'procurement', label: '3. Procurement' },
    { id: 'programme', label: '4. Programme' },
    { id: 'execution', label: '5. Operations' },
    { id: 'reporting', label: '6. Reporting' },
    { id: 'done', label: 'Closed' },
];
const COMMITTEE_ROLES = [
    { value: 'event_director', label: 'Event Director / Lead' },
    { value: 'logistics_procurement', label: 'Logistics & Procurement Manager' },
    { value: 'finance', label: 'Finance Officer' },
    { value: 'protocol_comms', label: 'Protocol & Communications Lead' },
    { value: 'technical_content', label: 'Technical / Content Coordinator' },
];
const BUDGET_STREAMS = [
    { category: 'Venue & Facilities', elements: 'Hall rental, breakout rooms, sound stage, podium, security staff', unit_metric: 'Daily rate or flat fee' },
    { category: 'Catering Services', elements: 'Arrival tea/coffee, mid-morning break, lunch buffet, afternoon tea, bottled water', unit_metric: 'Per-head, per-day cost' },
    { category: 'Technical & AV Equipment', elements: 'PA system, microphones (lapel/wireless), projectors, screens, translation booths', unit_metric: 'Daily rental rate' },
    { category: 'Branding & Print Production', elements: 'Backdrop banners, teardrop flags, directional signs, printed programs, badges, folders', unit_metric: 'Per unit / run cost' },
    { category: 'Stationery & Workshop Kits', elements: 'Notebooks, pens, flipcharts, markers, USB drives, certificates', unit_metric: 'Per participant cost' },
    { category: 'Honoraria & Facilitation', elements: 'Keynote speaker fees, workshop facilitator rates, MC honorarium', unit_metric: 'Per session or lump sum' },
    { category: 'Travel, Accommodation & Per Diem', elements: 'Flights, local ground transport, hotel rooms, DSA', unit_metric: 'Per person, per night/trip' },
    { category: 'Protocol, Security & Medical', elements: 'Security detail, emergency medical kit, VIP gifts/plaques, ribbon-cutting kit', unit_metric: 'Fixed package' },
    { category: 'Media & Communications', elements: 'Press briefing packs, photographer/videographer fees, livestreaming team', unit_metric: 'Project-based fee' },
];
const KIND_FOCUS = {
    inauguration: 'High-level protocol, security clearance, ribbon-cutting, press packs, VIP seating, and plaque/monument logistics.',
    workshop: 'Interactive room layouts, break-out groups, moderation tools, and an output-driven agenda.',
    training: 'Structured learning, pre- and post-assessments, training manuals, certificates, and presentation hardware.',
};
const DOCUMENTS = [
    { id: 'brief', label: 'Brief', phase: 'Governance' },
    { id: 'committee', label: 'Committee', phase: 'Governance' },
    { id: 'budget', label: 'Budget', phase: 'Budget' },
    { id: 'tor', label: 'ToR', phase: 'Procurement' },
    { id: 'agenda', label: 'Agenda', phase: 'Programme' },
    { id: 'confirmation', label: 'Letter', phase: 'Programme' },
    { id: 'register', label: 'Register', phase: 'Operations' },
    { id: 'evaluation', label: 'Evaluation', phase: 'Reporting' },
    { id: 'report', label: 'Report', phase: 'Reporting' },
];

function emptyBudget() {
    return BUDGET_STREAMS.map((stream) => ({ ...stream, quantity: '', unit_cost: '', amount: '' }));
}

function emptyCommittee() {
    return COMMITTEE_ROLES.map((role) => ({ role: role.value, user_id: '' }));
}

function emptyPlan() {
    return {
        kind_notes: '',
        speaker_briefing: '',
        confirmation_notes: '',
        dress_code: '',
        pre_reading: '',
        setup_notes: '',
        registration_desks: 'VIPs, General Delegates, Media, Facilitators',
        protocol_notes: '',
        troubleshooting: '',
        inventory_notes: '',
        agenda: [{ time: '', item: '', owner: '', notes: '' }],
        vendors: [{ service: '', vendor: '', specs: '', status: 'sourcing' }],
        report: {
            executive_summary: '',
            achievements: '',
            demographics: '',
            feedback: '',
            media: '',
            recommendations: '',
            actual_spend: '',
            ticket_revenue: '',
            attendance_count: '',
        },
    };
}

export default function EventsPanel({ events, executives }) {
    const form = useForm({
        title: '',
        kind: 'workshop',
        event_date: '',
        ends_on: '',
        venue: '',
        audience: '',
        objectives: '',
        kpis: '',
        currency: 'SSP',
        contingency_percent: 12,
        program_outline: '',
        committee: emptyCommittee(),
        budget_items: emptyBudget(),
        plan: emptyPlan(),
    });

    return (
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.events.store'), { preserveScroll: true, onSuccess: () => form.reset() });
                }}
                className="min-w-0 space-y-3 overflow-hidden rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Plan an event</h2>
                <p className="text-xs text-brand-muted">Follow the six LAYYA phases: governance, budget, procurement, programme, operations, then reporting. Each phase has a paper you can print.</p>
                <input className={fieldClass} style={fieldStyle} placeholder="Event title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.kind} onChange={(e) => form.setData('kind', e.target.value)}>
                    {EVENT_KINDS.map((kind) => <option key={kind.value} value={kind.value}>{kind.label}</option>)}
                </select>
                <p className="text-[11px] leading-relaxed text-brand-muted">{KIND_FOCUS[form.data.kind]}</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <input type="date" className={fieldClass} style={fieldStyle} value={form.data.event_date} onChange={(e) => form.setData('event_date', e.target.value)} />
                    <input type="date" className={fieldClass} style={fieldStyle} value={form.data.ends_on} onChange={(e) => form.setData('ends_on', e.target.value)} />
                </div>
                <input className={fieldClass} style={fieldStyle} placeholder="Venue" value={form.data.venue} onChange={(e) => form.setData('venue', e.target.value)} />
                <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Target audience" value={form.data.audience} onChange={(e) => form.setData('audience', e.target.value)} />
                <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Objectives" value={form.data.objectives} onChange={(e) => form.setData('objectives', e.target.value)} />
                <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="KPIs (attendance, learning, press coverage)" value={form.data.kpis} onChange={(e) => form.setData('kpis', e.target.value)} />
                <select className={fieldClass} style={fieldStyle} value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)}>
                    {CURRENCIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <select className={fieldClass} style={fieldStyle} value={form.data.contingency_percent} onChange={(e) => form.setData('contingency_percent', Number(e.target.value))}>
                    <option value={10}>Contingency 10%</option>
                    <option value={12}>Contingency 12%</option>
                    <option value={15}>Contingency 15%</option>
                </select>
                <button type="submit" disabled={form.processing} className="w-full rounded-full py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>Save event plan</button>
            </form>
            <div className="space-y-4">
                {events.length === 0 ? <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No events yet. Start with governance: title, type, audience, and objectives.</p> : null}
                {events.map((event) => <EventCard key={event.id} event={event} executives={executives} />)}
            </div>
        </div>
    );
}

function EventCard({ event, executives }) {
    const [phase, setPhase] = useState(event.status === 'done' ? 'reporting' : (EVENT_PHASES.some((item) => item.id === event.status) ? event.status : 'planning'));
    const initial = useMemo(() => buildEventForm(event), [event]);
    const form = useForm(initial);

    const save = (extra = {}) => {
        router.put(route('admin.operations.events.update', event.id), { ...form.data, ...extra }, { preserveScroll: true });
    };

    return (
        <article className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">{event.reference} · {event.kind_label}</p>
                    <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{event.title}</h3>
                    <p className="text-xs text-brand-muted">{(event.event_date || '').toString().slice(0, 10) || 'Date TBC'}{(event.ends_on ? ` – ${String(event.ends_on).slice(0, 10)}` : '')} · {event.venue || 'Venue TBC'} · {event.currency_label} {Number(event.grand_total || 0).toLocaleString()}</p>
                </div>
                <StatusBadge status={event.status === 'done' ? 'approved' : 'pending'} label={event.phase_label} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {(event.documents || []).map((doc) => {
                    const meta = DOCUMENTS.find((item) => item.id === doc.id);
                    return (
                        <div key={doc.id} className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2" style={{ background: SURFACE }}>
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-muted">{meta?.phase || 'Paper'}</p>
                                <p className="text-xs font-semibold text-brand-ink">{meta?.label || doc.label}</p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-1">
                                <a href={doc.print_url} target="_blank" rel="noreferrer" className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white" style={{ background: TEAL }}>Print</a>
                                <a href={doc.download_url} className="rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ color: TEAL, border: `1px solid ${BORDER}` }}>Download</a>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="tab-scroll mt-4 rounded-2xl p-1" style={{ background: SURFACE }}>
                {EVENT_PHASES.filter((item) => item.id !== 'done').map((item) => (
                    <button key={item.id} type="button" onClick={() => setPhase(item.id)} className="min-h-11 rounded-full px-3 py-1.5 text-[11px] font-semibold sm:min-h-0" style={{ background: phase === item.id ? '#fff' : 'transparent', color: TEAL }}>
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="mt-4 space-y-3">
                {phase === 'planning' ? <GovernanceFields form={form} executives={executives} /> : null}
                {phase === 'budgeting' ? <BudgetFields form={form} /> : null}
                {phase === 'procurement' ? <ProcurementFields form={form} /> : null}
                {phase === 'programme' ? <ProgrammeFields form={form} /> : null}
                {phase === 'execution' ? <OperationsFields form={form} /> : null}
                {phase === 'reporting' ? <ReportingFields form={form} /> : null}
                <div className="flex flex-wrap gap-2">
                    <button type="button" className="rounded-full px-4 py-2 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => save({ status: phase })}>Save this phase</button>
                    {phase !== 'reporting' ? (
                        <button type="button" className="rounded-full px-4 py-2 text-xs font-semibold" style={{ color: TEAL, border: `1px solid ${BORDER}` }} onClick={() => { const next = EVENT_PHASES[EVENT_PHASES.findIndex((item) => item.id === phase) + 1]; if (next) { setPhase(next.id); save({ status: next.id }); } }}>Advance to next phase</button>
                    ) : (
                        <button type="button" className="rounded-full px-4 py-2 text-xs font-semibold" style={{ color: TEAL, border: `1px solid ${BORDER}` }} onClick={() => save({ status: 'done' })}>Close event</button>
                    )}
                </div>
            </div>
            <EventTaskForm event={event} executives={event.committee?.length ? event.committee : executives} />
        </article>
    );
}

function GovernanceFields({ form, executives }) {
    return (
        <>
            <select className={fieldClass} style={fieldStyle} value={form.data.kind} onChange={(e) => form.setData('kind', e.target.value)}>
                {EVENT_KINDS.map((kind) => <option key={kind.value} value={kind.value}>{kind.label}</option>)}
            </select>
            <p className="text-[11px] leading-relaxed text-brand-muted">{KIND_FOCUS[form.data.kind]}</p>
            <div className="grid gap-2 sm:grid-cols-2">
                <input type="date" className={fieldClass} style={fieldStyle} value={form.data.event_date || ''} onChange={(e) => form.setData('event_date', e.target.value)} />
                <input type="date" className={fieldClass} style={fieldStyle} value={form.data.ends_on || ''} onChange={(e) => form.setData('ends_on', e.target.value)} />
            </div>
            <input className={fieldClass} style={fieldStyle} placeholder="Venue" value={form.data.venue || ''} onChange={(e) => form.setData('venue', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Target audience" value={form.data.audience || ''} onChange={(e) => form.setData('audience', e.target.value)} />
            <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Objectives" value={form.data.objectives || ''} onChange={(e) => form.setData('objectives', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="KPIs" value={form.data.kpis || ''} onChange={(e) => form.setData('kpis', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Type-specific requirements" value={form.data.plan.kind_notes} onChange={(e) => form.setData('plan', { ...form.data.plan, kind_notes: e.target.value })} />
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Steering committee</p>
            {COMMITTEE_ROLES.map((role, index) => (
                <label key={role.value} className="block text-xs text-brand-muted">
                    {role.label}
                    <select className={`${fieldClass} mt-1`} style={fieldStyle} value={form.data.committee[index]?.user_id || ''} onChange={(e) => form.setData('committee', form.data.committee.map((row, i) => (i === index ? { ...row, user_id: e.target.value } : row)))}>
                        <option value="">Assign</option>
                        {executives.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                </label>
            ))}
        </>
    );
}

function BudgetFields({ form }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <select className={fieldClass} style={fieldStyle} value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)}>
                    {CURRENCIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <select className={fieldClass} style={fieldStyle} value={form.data.contingency_percent} onChange={(e) => form.setData('contingency_percent', Number(e.target.value))}>
                    <option value={10}>Contingency 10%</option>
                    <option value={12}>Contingency 12%</option>
                    <option value={15}>Contingency 15%</option>
                </select>
            </div>
            {form.data.budget_items.map((item, index) => (
                <div key={item.category} className="space-y-2 rounded-2xl p-3" style={{ background: SURFACE }}>
                    <p className="text-sm font-semibold text-brand-ink">{item.category}</p>
                    <p className="text-[11px] text-brand-muted">{item.elements} · {item.unit_metric}</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <input type="number" className={fieldClass} style={fieldStyle} placeholder="Qty" value={item.quantity || ''} onChange={(e) => form.setData('budget_items', form.data.budget_items.map((row, i) => (i === index ? { ...row, quantity: e.target.value } : row)))} />
                        <input type="number" className={fieldClass} style={fieldStyle} placeholder="Unit cost" value={item.unit_cost || ''} onChange={(e) => form.setData('budget_items', form.data.budget_items.map((row, i) => (i === index ? { ...row, unit_cost: e.target.value } : row)))} />
                        <input type="number" className={fieldClass} style={fieldStyle} placeholder="Amount" value={item.amount || ''} onChange={(e) => form.setData('budget_items', form.data.budget_items.map((row, i) => (i === index ? { ...row, amount: e.target.value } : row)))} />
                    </div>
                </div>
            ))}
        </>
    );
}

function ProcurementFields({ form }) {
    return (
        <>
            <p className="text-xs text-brand-muted">Write exact specifications before contacting suppliers. Compare bids, contract, then inspect 24–48 hours before the event.</p>
            {form.data.plan.vendors.map((vendor, index) => (
                <div key={`vendor-${index}`} className="space-y-2 rounded-2xl p-3" style={{ background: SURFACE }}>
                    <input className={fieldClass} style={fieldStyle} placeholder="Service (catering, AV, print)" value={vendor.service} onChange={(e) => form.setData('plan', { ...form.data.plan, vendors: form.data.plan.vendors.map((row, i) => (i === index ? { ...row, service: e.target.value } : row)) })} />
                    <input className={fieldClass} style={fieldStyle} placeholder="Vendor" value={vendor.vendor} onChange={(e) => form.setData('plan', { ...form.data.plan, vendors: form.data.plan.vendors.map((row, i) => (i === index ? { ...row, vendor: e.target.value } : row)) })} />
                    <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Specifications" value={vendor.specs} onChange={(e) => form.setData('plan', { ...form.data.plan, vendors: form.data.plan.vendors.map((row, i) => (i === index ? { ...row, specs: e.target.value } : row)) })} />
                    <select className={fieldClass} style={fieldStyle} value={vendor.status} onChange={(e) => form.setData('plan', { ...form.data.plan, vendors: form.data.plan.vendors.map((row, i) => (i === index ? { ...row, status: e.target.value } : row)) })}>
                        <option value="sourcing">Sourcing / bidding</option>
                        <option value="contracted">Contracted</option>
                        <option value="inspected">Inspected 24–48h</option>
                    </select>
                </div>
            ))}
            <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => form.setData('plan', { ...form.data.plan, vendors: [...form.data.plan.vendors, { service: '', vendor: '', specs: '', status: 'sourcing' }] })}>Add vendor line</button>
        </>
    );
}

function ProgrammeFields({ form }) {
    return (
        <>
            {form.data.plan.agenda.map((row, index) => (
                <div key={`agenda-${index}`} className="grid gap-2 sm:grid-cols-2">
                    <input className={fieldClass} style={fieldStyle} placeholder="Time" value={row.time} onChange={(e) => form.setData('plan', { ...form.data.plan, agenda: form.data.plan.agenda.map((item, i) => (i === index ? { ...item, time: e.target.value } : item)) })} />
                    <input className={fieldClass} style={fieldStyle} placeholder="Owner" value={row.owner} onChange={(e) => form.setData('plan', { ...form.data.plan, agenda: form.data.plan.agenda.map((item, i) => (i === index ? { ...item, owner: e.target.value } : item)) })} />
                    <input className={`${fieldClass} sm:col-span-2`} style={fieldStyle} placeholder="Session / item" value={row.item} onChange={(e) => form.setData('plan', { ...form.data.plan, agenda: form.data.plan.agenda.map((item, i) => (i === index ? { ...item, item: e.target.value } : item)) })} />
                    <input className={`${fieldClass} sm:col-span-2`} style={fieldStyle} placeholder="Run-of-show notes" value={row.notes || ''} onChange={(e) => form.setData('plan', { ...form.data.plan, agenda: form.data.plan.agenda.map((item, i) => (i === index ? { ...item, notes: e.target.value } : item)) })} />
                </div>
            ))}
            <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => form.setData('plan', { ...form.data.plan, agenda: [...form.data.plan.agenda, { time: '', item: '', owner: '', notes: '' }] })}>Add agenda line</button>
            <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Speaker / facilitator briefing (templates, time limits, AV)" value={form.data.plan.speaker_briefing} onChange={(e) => form.setData('plan', { ...form.data.plan, speaker_briefing: e.target.value })} />
            <input className={fieldClass} style={fieldStyle} placeholder="Dress code" value={form.data.plan.dress_code} onChange={(e) => form.setData('plan', { ...form.data.plan, dress_code: e.target.value })} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Confirmation / logistics notes" value={form.data.plan.confirmation_notes} onChange={(e) => form.setData('plan', { ...form.data.plan, confirmation_notes: e.target.value })} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Pre-event reading or baseline survey" value={form.data.plan.pre_reading} onChange={(e) => form.setData('plan', { ...form.data.plan, pre_reading: e.target.value })} />
        </>
    );
}

function OperationsFields({ form }) {
    return (
        <>
            <div className="grid grid-cols-1 gap-2 text-xs text-brand-muted sm:grid-cols-3 lg:grid-cols-5">
                {['D-1 setup', 'Registration', 'Opening & protocol', 'Content flow', 'Closing & certificates'].map((step) => (
                    <div key={step} className="rounded-xl px-3 py-2" style={{ background: SURFACE }}>{step}</div>
                ))}
            </div>
            <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="D-1 setup: stage, banners, AV check, registration desks, signage" value={form.data.plan.setup_notes} onChange={(e) => form.setData('plan', { ...form.data.plan, setup_notes: e.target.value })} />
            <input className={fieldClass} style={fieldStyle} placeholder="Registration desks" value={form.data.plan.registration_desks} onChange={(e) => form.setData('plan', { ...form.data.plan, registration_desks: e.target.value })} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Protocol and VIP seating" value={form.data.plan.protocol_notes} onChange={(e) => form.setData('plan', { ...form.data.plan, protocol_notes: e.target.value })} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Back-of-house troubleshooting / radio channel" value={form.data.plan.troubleshooting} onChange={(e) => form.setData('plan', { ...form.data.plan, troubleshooting: e.target.value })} />
        </>
    );
}

function ReportingFields({ form }) {
    const report = form.data.plan.report || {};
    const setReport = (key, value) => form.setData('plan', { ...form.data.plan, report: { ...report, [key]: value } });

    return (
        <>
            <textarea rows={3} className={fieldClass} style={fieldStyle} placeholder="Executive summary and background" value={report.executive_summary || ''} onChange={(e) => setReport('executive_summary', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Key achievements and session summaries" value={report.achievements || ''} onChange={(e) => setReport('achievements', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Participant breakdown (gender / organisation)" value={report.demographics || ''} onChange={(e) => setReport('demographics', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Feedback analysis" value={report.feedback || ''} onChange={(e) => setReport('feedback', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Photo gallery and media links" value={report.media || ''} onChange={(e) => setReport('media', e.target.value)} />
            <input className={fieldClass} style={fieldStyle} placeholder="Actual spend" value={report.actual_spend || ''} onChange={(e) => setReport('actual_spend', e.target.value)} />
            <input type="number" className={fieldClass} style={fieldStyle} placeholder="Ticket / participation fees collected" value={report.ticket_revenue || ''} onChange={(e) => setReport('ticket_revenue', e.target.value)} />
            <input type="number" className={fieldClass} style={fieldStyle} placeholder="Attendance count" value={report.attendance_count || ''} onChange={(e) => setReport('attendance_count', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Recommendations" value={report.recommendations || ''} onChange={(e) => setReport('recommendations', e.target.value)} />
            <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Breakdown and inventory of non-expendable assets" value={form.data.plan.inventory_notes} onChange={(e) => form.setData('plan', { ...form.data.plan, inventory_notes: e.target.value })} />
        </>
    );
}

function EventTaskForm({ event, executives }) {
    const form = useForm({ title: '', assigned_to: '', due_on: '', priority: 'high', event_id: event.id });

    return (
        <form className="mt-3 grid gap-2 rounded-2xl p-3 sm:grid-cols-2" style={{ background: SURFACE }} onSubmit={(e) => { e.preventDefault(); form.post(route('admin.operations.tasks.store'), { preserveScroll: true, onSuccess: () => form.reset('title', 'assigned_to', 'due_on') }); }}>
            <input className={`${fieldClass} sm:col-span-2`} style={fieldStyle} placeholder="Committee task to monitor" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
            <select className={fieldClass} style={fieldStyle} value={form.data.assigned_to} onChange={(e) => form.setData('assigned_to', e.target.value)}>
                <option value="">Assign to</option>
                {executives.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <select className={fieldClass} style={fieldStyle} value={form.data.priority} onChange={(e) => form.setData('priority', e.target.value)}>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
            </select>
            <input type="date" className={fieldClass} style={fieldStyle} value={form.data.due_on} onChange={(e) => form.setData('due_on', e.target.value)} />
            <button type="submit" className="rounded-full px-3 py-2 text-xs font-semibold text-white" style={{ background: TEAL }}>Assign deadline</button>
        </form>
    );
}

function buildEventForm(event) {
    const plan = { ...emptyPlan(), ...(event.plan_data || event.plan || {}) };
    plan.report = { ...emptyPlan().report, ...(plan.report || {}) };
    if (!plan.agenda?.length) {
        plan.agenda = emptyPlan().agenda;
    }
    if (!plan.vendors?.length) {
        plan.vendors = emptyPlan().vendors;
    }
    const existing = event.budget_items || [];
    const budget_items = BUDGET_STREAMS.map((stream) => {
        const row = existing.find((item) => item.category === stream.category);
        return {
            ...stream,
            quantity: row?.quantity ?? '',
            unit_cost: row?.unit_cost ?? '',
            amount: row?.amount ?? '',
            elements: row?.elements || stream.elements,
            unit_metric: row?.unit_metric || stream.unit_metric,
        };
    });

    return {
        title: event.title,
        kind: event.kind || 'workshop',
        event_date: (event.event_date || '').toString().slice(0, 10),
        ends_on: (event.ends_on || '').toString().slice(0, 10),
        venue: event.venue || '',
        audience: event.audience || '',
        objectives: event.objectives || '',
        kpis: event.kpis || '',
        currency: event.currency || 'SSP',
        contingency_percent: event.contingency_percent || 12,
        program_outline: event.program_outline || '',
        status: event.status || 'planning',
        committee: COMMITTEE_ROLES.map((role) => ({
            role: role.value,
            user_id: event.committee?.find((user) => user.pivot?.role === role.value)?.id || '',
        })),
        budget_items,
        plan,
    };
}
