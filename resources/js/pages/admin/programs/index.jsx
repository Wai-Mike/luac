import AppLayout from '@/layouts/app-layout';
import ChartTip from '@/components/admin/ChartTip';
import StatusBadge from '@/components/admin/StatusBadge';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, CAT, MUTED, SURFACE, TEAL } from '@/lib/admin-theme';
import { uploadPortrait } from '@/lib/upload-portrait';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { BookOpen, HeartHandshake, Monitor, Plus, Sparkles, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ICONS = [Users, HeartHandshake, Sparkles, Monitor, BookOpen];
const fieldClass = 'w-full rounded-xl px-3 py-2 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };

export default function AdminPrograms({ programs: initialPrograms = [] }) {
    const { canEditContent } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const { data, setData, put, processing } = useForm({
        programs: initialPrograms,
        redirect: 'admin.programs.index',
    });

    const update = (index, field, value) => {
        setData('programs', data.programs.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const add = () => {
        setData('programs', [...data.programs, { title: '', body: '', tag: '', image: '/images/education.jpg', participants: 0, sessions: 0, facilitators: 0, status: 'active' }]);
    };

    const engagement = data.programs.map((p) => ({ name: p.title || 'Untitled', participants: Number(p.participants || 0) }));

    return (
        <AppLayout title="Programs" subtitle="Public program pages — edit copy, photos, and metrics">
            <Head title="Admin · Programs" />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (canEditContent) put(route('admin.content.site.update'), { preserveScroll: true });
                }}
                className="space-y-6"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-brand-muted">These cards appear on the public Programs page and the homepage preview.</p>
                    <div className="flex gap-2">
                        {canEditContent ? (
                            <>
                                <button type="button" onClick={add} className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold" style={{ background: SURFACE, color: TEAL }}>
                                    <Plus className="h-4 w-4" /> New Program
                                </button>
                                <button type="submit" disabled={processing} className="rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                                    {processing ? 'Saving…' : 'Save programs'}
                                </button>
                            </>
                        ) : null}
                    </div>
                </div>
                {flash.success ? <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>{flash.success}</div> : null}

                <fieldset disabled={!canEditContent} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.programs.map((program, i) => {
                        const Icon = ICONS[i % ICONS.length];
                        return (
                            <article key={`program-${i}`} className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                                <div className="flex items-start justify-between">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: CAT[i % CAT.length] }}>
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <StatusBadge status={program.status || 'active'} />
                                </div>
                                <div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-brand-dark">
                                    <img src={program.image || '/images/education.jpg'} alt="" className="h-full w-full object-cover" />
                                </div>
                                <input className={`${fieldClass} mt-3 font-fraunces font-semibold`} style={fieldStyle} value={program.title} onChange={(e) => update(i, 'title', e.target.value)} />
                                <input className={`${fieldClass} mt-2`} style={fieldStyle} value={program.tag || ''} onChange={(e) => update(i, 'tag', e.target.value)} placeholder="Tag" />
                                <textarea rows={3} className={`${fieldClass} mt-2`} style={fieldStyle} value={program.body} onChange={(e) => update(i, 'body', e.target.value)} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={`${fieldClass} mt-2`}
                                    style={fieldStyle}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) uploadPortrait(file, (url) => update(i, 'image', url));
                                    }}
                                />
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {['participants', 'sessions', 'facilitators'].map((key) => (
                                        <div key={key} className="rounded-xl px-2 py-2 text-center" style={{ background: SURFACE }}>
                                            <input type="number" min="0" className="w-full bg-transparent text-center font-fraunces text-lg font-bold outline-none" value={program[key] ?? 0} onChange={(e) => update(i, key, Number(e.target.value))} />
                                            <p className="text-[10px] capitalize text-brand-muted">{key}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <select value={program.status || 'active'} onChange={(e) => update(i, 'status', e.target.value)} className={fieldClass} style={fieldStyle}>
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                    {canEditContent && data.programs.length > 1 ? (
                                        <button type="button" className="text-xs font-semibold text-red-600" onClick={() => setData('programs', data.programs.filter((_, index) => index !== i))}>
                                            Remove
                                        </button>
                                    ) : null}
                                </div>
                            </article>
                        );
                    })}
                </fieldset>

                <div className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                    <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Program engagement</h2>
                    <div className="mt-4 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={engagement} layout="vertical" margin={{ left: 130 }} barSize={18}>
                                <CartesianGrid horizontal={false} stroke="rgba(0,77,77,0.1)" strokeDasharray="3 3" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
                                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} width={120} />
                                <Tooltip content={<ChartTip />} />
                                <Bar dataKey="participants" radius={[0, 4, 4, 0]}>
                                    {engagement.map((d, i) => (
                                        <Cell key={`prog-${d.name}`} fill={CAT[i % CAT.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <Link href={route('programs')} className="mt-4 inline-block text-sm font-semibold" style={{ color: TEAL }}>
                        View public programs →
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}
