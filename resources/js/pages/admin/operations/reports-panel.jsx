import { useMemo } from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { BORDER, SURFACE, TEAL } from '@/lib/admin-theme';
import { router, useForm, usePage } from '@inertiajs/react';

const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };

const KINDS = [
    { value: 'monthly', label: 'Monthly Departmental Progress Report' },
    { value: 'weekly', label: 'Weekly Departmental Progress Report' },
    { value: 'quarterly', label: 'Quarterly Departmental Progress Report' },
    { value: 'post_event', label: 'Post-Event Departmental Report' },
];

const ACTION_STATUSES = ['Pending', 'Ongoing', 'Planned', 'Done'];

function currentPeriod() {
    return new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function departmentOf(name = '') {
    const trimmed = String(name || '').trim();
    if (!trimmed) {
        return '';
    }

    return `Department of ${trimmed.replace(/^department(\s+of)?\s+/i, '')}`;
}

function emptyPayload(userName = '', departmentName = '') {
    const office = departmentOf(departmentName);

    return {
        submitted_to: 'The Office of the Chairperson',
        submitted_by: office,
        prepared_by: userName,
        purpose: 'The purpose of this monthly report is to provide leadership with timely, organized, and evidence-based information on departmental progress, financial status, achievements, challenges, pending issues, and required follow-up actions.',
        objectives: '',
        metrics: [{ metric: '', status: '' }],
        highlights: '',
        financial_update: '',
        challenges: '',
        risks: [{ risk: '', effect: '', mitigation: '' }],
        actions: [{ item: '', office, status: 'Pending' }],
        next_priorities: '',
        recommendations: '',
        conclusion: '',
        reviewed_by: '',
        approved_by: '',
        approved_on: '',
        attachment_title: '',
        attachment_note: '',
        attachment_columns: ['S/N', 'Full Name', 'School Admitted In'],
        attachment_rows: [['', '', '']],
        cc: [
            'Office of the Secretary General',
            'Office of the Finance Secretary',
            'Office of the External Affairs Secretary',
            'File',
        ],
    };
}

export default function ReportsPanel({ reports = [], departments = [], canPublish = false, lockedDepartmentId = null }) {
    const user = usePage().props.auth?.user;
    const defaultDepartment = departments.find((dept) => Number(dept.id) === Number(lockedDepartmentId)) || null;
    const form = useForm({
        title: '',
        period: currentPeriod(),
        summary: '',
        status: 'draft',
        kind: 'departmental',
        template: 'monthly',
        department_id: defaultDepartment?.id || '',
        submitted_on: new Date().toISOString().slice(0, 10),
        is_public: false,
        document: null,
        payload: emptyPayload(user?.name || '', defaultDepartment?.name || ''),
    });

    const grouped = useMemo(() => {
        const byId = new Map(departments.map((dept) => [Number(dept.id), []]));
        const loose = [];
        reports.forEach((report) => {
            const id = Number(report.department_id);
            if (byId.has(id)) {
                byId.get(id).push(report);
            } else {
                loose.push(report);
            }
        });
        return { byId, loose };
    }, [departments, reports]);

    const setPayload = (key, value) => form.setData('payload', { ...form.data.payload, [key]: value });
    const setRow = (key, index, patch) => {
        const rows = form.data.payload[key].map((row, i) => (i === index ? { ...row, ...patch } : row));
        setPayload(key, rows);
    };
    const addRow = (key, blank) => setPayload(key, [...form.data.payload[key], blank]);
    const selectedDepartment = departments.find((dept) => Number(dept.id) === Number(form.data.department_id));

    return (
        <div className="space-y-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('admin.operations.reports.store'), {
                        preserveScroll: true,
                        forceFormData: Boolean(form.data.document),
                        onSuccess: () => form.reset(),
                    });
                }}
                className="min-w-0 space-y-4 overflow-hidden rounded-2xl bg-white p-5"
                style={{ border: `1px solid ${BORDER}` }}
            >
                <div>
                    <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Departmental progress report</h2>
                    <p className="text-xs text-brand-muted">Luac Akook De Yieu Youth Association – Juba. One paper per department, using the Chairperson’s monthly template.</p>
                </div>

                <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                    <select
                        className={fieldClass}
                        style={fieldStyle}
                        value={form.data.department_id}
                        disabled={Boolean(lockedDepartmentId)}
                        onChange={(e) => {
                            const previous = departmentOf(departments.find((dept) => Number(dept.id) === Number(form.data.department_id))?.name);
                            const nextOffice = departmentOf(departments.find((dept) => String(dept.id) === e.target.value)?.name);
                            form.setData({
                                ...form.data,
                                department_id: e.target.value,
                                payload: {
                                    ...form.data.payload,
                                    submitted_by: !form.data.payload.submitted_by || form.data.payload.submitted_by === previous
                                        ? nextOffice
                                        : form.data.payload.submitted_by,
                                    actions: form.data.payload.actions.map((row) => ({
                                        ...row,
                                        office: !row.office || row.office === previous ? nextOffice : row.office,
                                    })),
                                },
                            });
                        }}
                    >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                    <select className={fieldClass} style={fieldStyle} value={form.data.template} onChange={(e) => form.setData('template', e.target.value)}>
                        {KINDS.map((kind) => <option key={kind.value} value={kind.value}>{kind.label}</option>)}
                    </select>
                    <input className={fieldClass} style={fieldStyle} placeholder="Reporting month (e.g. June 2026)" value={form.data.period} onChange={(e) => form.setData('period', e.target.value)} />
                    <input type="date" className={fieldClass} style={fieldStyle} value={form.data.submitted_on} onChange={(e) => form.setData('submitted_on', e.target.value)} />
                </div>

                <input className={fieldClass} style={fieldStyle} placeholder="Report title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />

                <div className="grid gap-3 md:grid-cols-3">
                    <input className={fieldClass} style={fieldStyle} placeholder="Submitted to" value={form.data.payload.submitted_to} onChange={(e) => setPayload('submitted_to', e.target.value)} />
                    <input className={fieldClass} style={fieldStyle} placeholder="Submitted by" value={form.data.payload.submitted_by} onChange={(e) => setPayload('submitted_by', e.target.value)} />
                    <input className={fieldClass} style={fieldStyle} placeholder="Prepared by" value={form.data.payload.prepared_by} onChange={(e) => setPayload('prepared_by', e.target.value)} />
                </div>

                <Section title="1. Executive Summary">
                    <textarea rows={4} className={fieldClass} style={fieldStyle} placeholder="Executive summary" value={form.data.summary} onChange={(e) => form.setData('summary', e.target.value)} />
                </Section>
                <Section title="2. Purpose of the Report">
                    <textarea rows={3} className={fieldClass} style={fieldStyle} value={form.data.payload.purpose} onChange={(e) => setPayload('purpose', e.target.value)} />
                </Section>
                <Section title="3. Department Objectives for the Month">
                    <textarea rows={4} className={fieldClass} style={fieldStyle} placeholder="One objective per line" value={form.data.payload.objectives} onChange={(e) => setPayload('objectives', e.target.value)} />
                </Section>

                <Section title="4. Key Metrics and Performance Summary">
                    {form.data.payload.metrics.map((row, index) => (
                        <div key={`metric-${index}`} className="grid gap-2 md:grid-cols-2">
                            <input className={fieldClass} style={fieldStyle} placeholder="Metric" value={row.metric} onChange={(e) => setRow('metrics', index, { metric: e.target.value })} />
                            <input className={fieldClass} style={fieldStyle} placeholder="Status / amount" value={row.status} onChange={(e) => setRow('metrics', index, { status: e.target.value })} />
                        </div>
                    ))}
                    <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => addRow('metrics', { metric: '', status: '' })}>Add metric</button>
                </Section>

                <Section title="5. Major Highlights and Achievements">
                    <textarea rows={4} className={fieldClass} style={fieldStyle} value={form.data.payload.highlights} onChange={(e) => setPayload('highlights', e.target.value)} />
                </Section>
                <Section title="6. Financial Update">
                    <textarea rows={4} className={fieldClass} style={fieldStyle} value={form.data.payload.financial_update} onChange={(e) => setPayload('financial_update', e.target.value)} />
                </Section>
                <Section title="7. Challenges, Constraints, and Pending Issues">
                    <textarea rows={4} className={fieldClass} style={fieldStyle} value={form.data.payload.challenges} onChange={(e) => setPayload('challenges', e.target.value)} />
                </Section>

                <Section title="8. Risks and Mitigation Measures">
                    {form.data.payload.risks.map((row, index) => (
                        <div key={`risk-${index}`} className="grid gap-2 md:grid-cols-3">
                            <input className={fieldClass} style={fieldStyle} placeholder="Risk" value={row.risk} onChange={(e) => setRow('risks', index, { risk: e.target.value })} />
                            <input className={fieldClass} style={fieldStyle} placeholder="Possible effect" value={row.effect} onChange={(e) => setRow('risks', index, { effect: e.target.value })} />
                            <input className={fieldClass} style={fieldStyle} placeholder="Mitigation" value={row.mitigation} onChange={(e) => setRow('risks', index, { mitigation: e.target.value })} />
                        </div>
                    ))}
                    <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => addRow('risks', { risk: '', effect: '', mitigation: '' })}>Add risk</button>
                </Section>

                <Section title="9. Action Items and Follow-Up Plan">
                    {form.data.payload.actions.map((row, index) => (
                        <div key={`action-${index}`} className="grid min-w-0 gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,10rem)_minmax(0,8rem)]">
                            <input className={fieldClass} style={fieldStyle} placeholder="Action item" value={row.item} onChange={(e) => setRow('actions', index, { item: e.target.value })} />
                            <input className={fieldClass} style={fieldStyle} placeholder="Responsible office" value={row.office} onChange={(e) => setRow('actions', index, { office: e.target.value })} />
                            <select className={fieldClass} style={fieldStyle} value={row.status} onChange={(e) => setRow('actions', index, { status: e.target.value })}>
                                {ACTION_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                            </select>
                        </div>
                    ))}
                    <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => addRow('actions', { item: '', office: departmentOf(selectedDepartment?.name), status: 'Pending' })}>Add action</button>
                </Section>

                <Section title="10. Next Reporting Period Priorities">
                    <textarea rows={3} className={fieldClass} style={fieldStyle} value={form.data.payload.next_priorities} onChange={(e) => setPayload('next_priorities', e.target.value)} />
                </Section>
                <Section title="11. Recommendations">
                    <textarea rows={3} className={fieldClass} style={fieldStyle} value={form.data.payload.recommendations} onChange={(e) => setPayload('recommendations', e.target.value)} />
                </Section>
                <Section title="12. Conclusion">
                    <textarea rows={3} className={fieldClass} style={fieldStyle} value={form.data.payload.conclusion} onChange={(e) => setPayload('conclusion', e.target.value)} />
                </Section>

                <Section title="13. Approval, attachments, and copies">
                    <div className="grid gap-3 md:grid-cols-3">
                        <input className={fieldClass} style={fieldStyle} placeholder="Reviewed by" value={form.data.payload.reviewed_by} onChange={(e) => setPayload('reviewed_by', e.target.value)} />
                        <input className={fieldClass} style={fieldStyle} placeholder="Approved by" value={form.data.payload.approved_by} onChange={(e) => setPayload('approved_by', e.target.value)} />
                        <input className={fieldClass} style={fieldStyle} placeholder="Date of approval" value={form.data.payload.approved_on} onChange={(e) => setPayload('approved_on', e.target.value)} />
                    </div>
                    <input className={fieldClass} style={fieldStyle} placeholder="Attachment title (e.g. Official list of newly admitted students)" value={form.data.payload.attachment_title} onChange={(e) => setPayload('attachment_title', e.target.value)} />
                    <textarea rows={2} className={fieldClass} style={fieldStyle} placeholder="Attachment note" value={form.data.payload.attachment_note} onChange={(e) => setPayload('attachment_note', e.target.value)} />
                    <div className="grid gap-2 md:grid-cols-3">
                        {form.data.payload.attachment_columns.map((column, index) => (
                            <input
                                key={`col-${index}`}
                                className={fieldClass}
                                style={fieldStyle}
                                value={column}
                                onChange={(e) => {
                                    const columns = form.data.payload.attachment_columns.map((item, i) => (i === index ? e.target.value : item));
                                    setPayload('attachment_columns', columns);
                                }}
                            />
                        ))}
                    </div>
                    {form.data.payload.attachment_rows.map((row, index) => (
                        <div key={`attach-${index}`} className="grid gap-2 md:grid-cols-3">
                            {row.map((cell, col) => (
                                <input
                                    key={`attach-${index}-${col}`}
                                    className={fieldClass}
                                    style={fieldStyle}
                                    placeholder={form.data.payload.attachment_columns[col] || 'Cell'}
                                    value={cell}
                                    onChange={(e) => {
                                        const rows = form.data.payload.attachment_rows.map((item, i) => (i === index ? item.map((value, c) => (c === col ? e.target.value : value)) : item));
                                        setPayload('attachment_rows', rows);
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                    <button type="button" className="text-xs font-semibold" style={{ color: TEAL }} onClick={() => setPayload('attachment_rows', [...form.data.payload.attachment_rows, ['', '', '']])}>Add attachment row</button>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">Copy to / Cc</p>
                    {form.data.payload.cc.map((office, index) => (
                        <input key={`cc-${index}`} className={fieldClass} style={fieldStyle} value={office} onChange={(e) => setPayload('cc', form.data.payload.cc.map((item, i) => (i === index ? e.target.value : item)))} />
                    ))}
                    <input type="file" accept=".doc,.docx,.pdf" className={fieldClass} style={fieldStyle} onChange={(e) => form.setData('document', e.target.files?.[0] || null)} />
                </Section>

                <div className="flex flex-wrap items-center gap-3">
                    {canPublish ? (
                        <label className="flex items-center gap-2 text-sm text-brand-ink">
                            <input type="checkbox" checked={form.data.is_public} onChange={(e) => form.setData('is_public', e.target.checked)} />
                            Also approve for the public Reports page
                        </label>
                    ) : (
                        <p className="text-xs text-brand-muted">Internal departmental paper. Only the Chairman or Deputy can publish to the website.</p>
                    )}
                    <button type="submit" disabled={form.processing} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: TEAL }}>Save departmental report</button>
                </div>
            </form>

            <div className="space-y-5">
                {departments.map((dept) => (
                    <DepartmentReports
                        key={dept.id}
                        department={dept}
                        reports={grouped.byId.get(Number(dept.id)) || []}
                        canPublish={canPublish}
                    />
                ))}
                {grouped.loose.length ? (
                    <DepartmentReports department={{ name: 'Unassigned' }} reports={grouped.loose} canPublish={canPublish} />
                ) : null}
                {departments.length === 0 && reports.length === 0 ? (
                    <p className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>No departmental reports yet.</p>
                ) : null}
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="space-y-2 rounded-2xl p-3" style={{ background: SURFACE }}>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{title}</p>
            {children}
        </div>
    );
}

function DepartmentReports({ department, reports, canPublish }) {
    return (
        <section className="min-w-0 overflow-hidden rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">{department.code || 'Department'}</p>
                    <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{department.name}</h3>
                </div>
                <p className="text-xs text-brand-muted">{reports.length} {reports.length === 1 ? 'report' : 'reports'}</p>
            </div>
            {reports.length === 0 ? (
                <p className="text-sm text-brand-muted">No paper filed for this department yet.</p>
            ) : (
                <div className="space-y-3">
                    {reports.map((report) => (
                        <article key={report.id} className="rounded-2xl p-4" style={{ background: SURFACE }}>
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <h4 className="font-semibold text-brand-ink">{report.title}</h4>
                                    <p className="text-xs text-brand-muted">{report.period || '—'} · {report.kind_label} · {report.author?.name || 'Secretary'} · {report.reference}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <StatusBadge status={report.approval_status || 'pending'} />
                                    {report.is_public ? <StatusBadge status="published" label="On website" /> : <StatusBadge status="draft" label="Internal" />}
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-brand-muted">{report.summary}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href={report.print_url} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }}>View / print</a>
                                <a href={report.download_url} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL, border: `1px solid ${BORDER}` }}>Download</a>
                                {report.file_url ? <a href={report.file_url} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: TEAL }}>{report.file_name || 'Attached file'}</a> : null}
                                {canPublish && !report.is_public ? (
                                    <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }} onClick={() => router.post(route('admin.operations.reports.approve', report.id))}>
                                        Approve for website
                                    </button>
                                ) : null}
                                <button type="button" className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-700" onClick={() => router.delete(route('admin.operations.reports.destroy', report.id))}>Delete</button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
