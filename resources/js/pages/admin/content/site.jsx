import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, SURFACE, TEAL } from '@/lib/admin-theme';
import { uploadPortrait } from '@/lib/upload-portrait';
import { Head, useForm, usePage } from '@inertiajs/react';

const TABS = ['Leadership', 'Homepage', 'About', 'FAQ', 'Tawus Hub'];
const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm text-brand-ink outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)', background: '#fff' };

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function MemberList({ title, hint, listKey, members, setData, errors, canEdit }) {
    const addMember = () => setData(listKey, [...members, { name: '', role: '', image: '/images/youth.jpg' }]);
    const updateMember = (index, field, value) => {
        setData(listKey, members.map((member, i) => (i === index ? { ...member, [field]: value } : member)));
    };
    const removeMember = (index) => setData(listKey, members.filter((_, i) => i !== index));

    return (
        <section className="space-y-4 rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="font-fraunces text-lg font-semibold text-brand-ink">{title}</h2>
                    {hint ? <p className="text-xs text-brand-muted">{hint}</p> : null}
                </div>
                {canEdit ? (
                    <button type="button" onClick={addMember} className="rounded-full px-3 py-1.5 text-sm font-semibold text-white" style={{ background: TEAL }}>
                        Add member
                    </button>
                ) : null}
            </div>
            <div className="space-y-4">
                {members.map((member, index) => (
                    <div key={`${listKey}-${index}`} className="grid gap-3 rounded-xl p-4 md:grid-cols-[5rem_1fr_1fr]" style={{ background: SURFACE }}>
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-brand-dark">
                            <img src={member.image || '/images/youth.jpg'} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Name</label>
                            <input value={member.name} onChange={(e) => updateMember(index, 'name', e.target.value)} className={fieldClass} style={fieldStyle} />
                            <FieldError message={errors[`${listKey}.${index}.name`]} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Position</label>
                            <input value={member.role} onChange={(e) => updateMember(index, 'role', e.target.value)} className={fieldClass} style={fieldStyle} />
                            <FieldError message={errors[`${listKey}.${index}.role`]} />
                        </div>
                        <div className="md:col-span-3">
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Portrait photo</label>
                            <div className="flex flex-wrap items-center gap-2">
                                {canEdit ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={fieldClass}
                                        style={fieldStyle}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) uploadPortrait(file, (url) => updateMember(index, 'image', url));
                                        }}
                                    />
                                ) : null}
                                {canEdit && members.length > 1 ? (
                                    <button type="button" onClick={() => removeMember(index)} className="rounded-full px-3 py-2 text-xs font-semibold text-red-700">
                                        Remove
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function AdminSiteContent({ content, canEdit: canEditProp }) {
    const flash = usePage().props.flash ?? {};
    const { canEditContent } = useCapabilities();
    const canEdit = canEditProp ?? canEditContent;
    const [tab, setTab] = useState('Leadership');
    const { data, setData, put, processing, errors } = useForm({
        hero: content.hero,
        hero_stats: content.hero_stats,
        mission_vision: content.mission_vision,
        contact: content.contact,
        executive_members: content.executive_members,
        council_members: content.council_members,
        faqs: content.faqs ?? [],
        impact_stats: content.impact_stats ?? [],
        values: content.values ?? [],
        constitution_facts: content.constitution_facts,
        tawus_hub: content.tawus_hub,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.content.site.update'), { preserveScroll: true });
    };

    const updateStat = (key, index, field, value) => {
        setData(key, data[key].map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)));
    };

    return (
        <AppLayout title="Website" subtitle="Everything the public site shows — including leadership photos">
            <Head title="Admin · Website" />

            <form onSubmit={canEdit ? submit : (e) => e.preventDefault()} className="space-y-6">
                <fieldset disabled={!canEdit} className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-brand-muted">
                            {canEdit ? 'Changes here appear on the public website as soon as you save.' : 'View only. Ask the Chairman to assign you as an admin before you can edit.'}
                        </p>
                        {canEdit ? (
                            <button type="submit" disabled={processing} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                                {processing ? 'Saving…' : 'Save website'}
                            </button>
                        ) : null}
                    </div>

                    {flash.success ? <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>{flash.success}</div> : null}

                    <div className="flex flex-wrap gap-1 rounded-2xl p-1" style={{ background: SURFACE }}>
                        {TABS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setTab(item)}
                                className="rounded-full px-4 py-2 text-sm font-semibold"
                                style={{ background: tab === item ? '#fff' : 'transparent', color: tab === item ? TEAL : '#4a6b6b' }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {tab === 'Leadership' ? (
                        <div className="space-y-6">
                            <MemberList
                                title="Executive members"
                                hint="17-member executive. Upload a portrait for each office — this is what the public Team page shows."
                                listKey="executive_members"
                                members={data.executive_members}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                            />
                            <MemberList
                                title="Council members"
                                hint="Seven-member council headed by the Speaker."
                                listKey="council_members"
                                members={data.council_members}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                            />
                        </div>
                    ) : null}

                    {tab === 'Homepage' ? (
                        <div className="grid gap-4 lg:grid-cols-2">
                            <section className="space-y-4 rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Hero</h2>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Headline</label>
                                <textarea rows={4} value={data.hero.headline} onChange={(e) => setData('hero', { ...data.hero, headline: e.target.value })} className={fieldClass} style={fieldStyle} />
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Subtext</label>
                                <textarea rows={3} value={data.hero.subtext} onChange={(e) => setData('hero', { ...data.hero, subtext: e.target.value })} className={fieldClass} style={fieldStyle} />
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Location</label>
                                <input value={data.hero.location} onChange={(e) => setData('hero', { ...data.hero, location: e.target.value })} className={fieldClass} style={fieldStyle} />
                            </section>
                            <section className="space-y-4 rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Mission, vision & contact</h2>
                                <textarea rows={2} value={data.mission_vision.mission} onChange={(e) => setData('mission_vision', { ...data.mission_vision, mission: e.target.value })} className={fieldClass} style={fieldStyle} />
                                <textarea rows={2} value={data.mission_vision.vision} onChange={(e) => setData('mission_vision', { ...data.mission_vision, vision: e.target.value })} className={fieldClass} style={fieldStyle} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input value={data.contact.phone} onChange={(e) => setData('contact', { ...data.contact, phone: e.target.value })} className={fieldClass} style={fieldStyle} placeholder="Phone" />
                                    <input value={data.contact.email} onChange={(e) => setData('contact', { ...data.contact, email: e.target.value })} className={fieldClass} style={fieldStyle} placeholder="Email" />
                                    <input value={data.contact.address} onChange={(e) => setData('contact', { ...data.contact, address: e.target.value })} className={fieldClass} style={fieldStyle} placeholder="Address" />
                                    <input value={data.contact.hours} onChange={(e) => setData('contact', { ...data.contact, hours: e.target.value })} className={fieldClass} style={fieldStyle} placeholder="Hours" />
                                </div>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    {(data.hero_stats || []).map((stat, index) => (
                                        <div key={`hs-${index}`} className="grid grid-cols-2 gap-2">
                                            <input value={stat.value} onChange={(e) => updateStat('hero_stats', index, 'value', e.target.value)} className={fieldClass} style={fieldStyle} />
                                            <input value={stat.label} onChange={(e) => updateStat('hero_stats', index, 'label', e.target.value)} className={fieldClass} style={fieldStyle} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    ) : null}

                    {tab === 'About' ? (
                        <section className="space-y-4 rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Constitution facts</h2>
                            {['status', 'aim', 'languages', 'places', 'membership', 'term'].map((key) => (
                                <div key={key}>
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">{key}</label>
                                    <textarea rows={2} value={data.constitution_facts?.[key] || ''} onChange={(e) => setData('constitution_facts', { ...data.constitution_facts, [key]: e.target.value })} className={fieldClass} style={fieldStyle} />
                                </div>
                            ))}
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Values (comma separated)</label>
                            <input
                                value={(data.values || []).join(', ')}
                                onChange={(e) => setData('values', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
                                className={fieldClass}
                                style={fieldStyle}
                            />
                        </section>
                    ) : null}

                    {tab === 'FAQ' ? (
                        <section className="space-y-4 rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                            <div className="flex justify-between">
                                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Frequently asked questions</h2>
                                {canEdit ? (
                                    <button type="button" onClick={() => setData('faqs', [...data.faqs, { q: '', a: '' }])} className="text-sm font-semibold" style={{ color: TEAL }}>
                                        Add question
                                    </button>
                                ) : null}
                            </div>
                            {(data.faqs || []).map((item, index) => (
                                <div key={`faq-${index}`} className="space-y-2 rounded-xl p-4" style={{ background: SURFACE }}>
                                    <input value={item.q} onChange={(e) => setData('faqs', data.faqs.map((row, i) => (i === index ? { ...row, q: e.target.value } : row)))} className={fieldClass} style={fieldStyle} placeholder="Question" />
                                    <textarea rows={3} value={item.a} onChange={(e) => setData('faqs', data.faqs.map((row, i) => (i === index ? { ...row, a: e.target.value } : row)))} className={fieldClass} style={fieldStyle} placeholder="Answer" />
                                </div>
                            ))}
                        </section>
                    ) : null}

                    {tab === 'Tawus Hub' ? (
                        <section className="space-y-4 rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Tawus Hub page</h2>
                            <input value={data.tawus_hub?.title || ''} onChange={(e) => setData('tawus_hub', { ...data.tawus_hub, title: e.target.value })} className={fieldClass} style={fieldStyle} placeholder="Title" />
                            <textarea rows={2} value={data.tawus_hub?.subtitle || ''} onChange={(e) => setData('tawus_hub', { ...data.tawus_hub, subtitle: e.target.value })} className={fieldClass} style={fieldStyle} placeholder="Subtitle" />
                            <textarea rows={4} value={data.tawus_hub?.body || ''} onChange={(e) => setData('tawus_hub', { ...data.tawus_hub, body: e.target.value })} className={fieldClass} style={fieldStyle} placeholder="Body" />
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Skills (one per line)</label>
                            <textarea
                                rows={6}
                                value={(data.tawus_hub?.skills || []).join('\n')}
                                onChange={(e) => setData('tawus_hub', { ...data.tawus_hub, skills: e.target.value.split('\n').map((row) => row.trim()).filter(Boolean) })}
                                className={fieldClass}
                                style={fieldStyle}
                            />
                        </section>
                    ) : null}
                </fieldset>
            </form>
        </AppLayout>
    );
}
