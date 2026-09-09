import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { Head, router, useForm, usePage } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Website content' },
];

const fieldClass =
    'w-full rounded-xl border border-brand/20 bg-white px-3 py-2 text-sm text-brand-ink outline-none focus:border-brand';

function FieldError({ message }) {
    if (!message) {
        return null;
    }

    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function uploadPortrait(file, onUrl) {
    const form = new FormData();
    form.append('image', file);

    router.post(route('admin.media.portrait'), form, {
        forceFormData: true,
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
            const url = page.props.flash?.uploaded_image;
            if (url) {
                onUrl(url);
            }
        },
    });
}

function MemberList({ title, listKey, members, setData, errors, canEdit }) {
    const addMember = () => {
        setData(listKey, [...members, { name: '', role: '', image: '/images/youth.jpg' }]);
    };

    const updateMember = (index, field, value) => {
        const next = members.map((member, i) => (i === index ? { ...member, [field]: value } : member));
        setData(listKey, next);
    };

    const removeMember = (index) => {
        setData(
            listKey,
            members.filter((_, i) => i !== index),
        );
    };

    return (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-brand-ink">{title}</h2>
                {canEdit ? (
                    <button
                        type="button"
                        onClick={addMember}
                        className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand hover:bg-cream"
                    >
                        Add member
                    </button>
                ) : null}
            </div>
            <div className="space-y-4">
                {members.map((member, index) => (
                    <div key={`${listKey}-${index}`} className="grid gap-3 rounded-2xl bg-brand-soft/60 p-4 md:grid-cols-[5rem_1fr_1fr]">
                        <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-brand-dark">
                            <img src={member.image || '/images/youth.jpg'} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-brand-muted">Name</label>
                            <input
                                value={member.name}
                                onChange={(e) => updateMember(index, 'name', e.target.value)}
                                className={fieldClass}
                            />
                            <FieldError message={errors[`${listKey}.${index}.name`]} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-brand-muted">Role</label>
                            <input
                                value={member.role}
                                onChange={(e) => updateMember(index, 'role', e.target.value)}
                                className={fieldClass}
                            />
                            <FieldError message={errors[`${listKey}.${index}.role`]} />
                        </div>
                        <div className="md:col-span-3">
                            <label className="mb-1 block text-xs font-medium text-brand-muted">Portrait</label>
                            <div className="flex flex-wrap items-center gap-2">
                                {canEdit ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={fieldClass}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                uploadPortrait(file, (url) => updateMember(index, 'image', url));
                                            }
                                        }}
                                    />
                                ) : null}
                                <input
                                    value={member.image || ''}
                                    onChange={(e) => updateMember(index, 'image', e.target.value)}
                                    className={`${fieldClass} min-w-0 flex-1`}
                                    placeholder="/images/youth.jpg or uploaded path"
                                />
                                {canEdit && members.length > 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => removeMember(index)}
                                        className="shrink-0 rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                                    >
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
    const page = usePage();
    const flash = page.props.flash ?? {};
    const { canEditContent } = useCapabilities();
    const canEdit = canEditProp ?? canEditContent;
    const { data, setData, put, processing, errors } = useForm({
        hero: content.hero,
        hero_stats: content.hero_stats,
        mission_vision: content.mission_vision,
        contact: content.contact,
        executive_members: content.executive_members,
        council_members: content.council_members,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.content.site.update'), { preserveScroll: true });
    };

    const updateStat = (index, field, value) => {
        const next = data.hero_stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat));
        setData('hero_stats', next);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} contentClassName="bg-brand-soft">
            <Head title="Admin · Website content" />

            <form onSubmit={canEdit ? submit : (e) => e.preventDefault()} className="mx-auto max-w-6xl space-y-6">
                <fieldset disabled={!canEdit} className="space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">Public site</p>
                            <h1 className="mt-2 text-3xl font-semibold text-brand-ink">Website content</h1>
                            <p className="mt-1 text-sm text-brand-muted">
                                {canEdit
                                    ? 'Update the public homepage, leadership portraits, and contact details. Upload photos from here instead of pasting file paths.'
                                    : 'View only. Ask the Chairman to assign you as an admin before you can edit.'}
                            </p>
                        </div>
                        {canEdit ? (
                            <button type="submit" disabled={processing} className="btn btn-amber disabled:opacity-50">
                                {processing ? 'Saving…' : 'Save changes'}
                            </button>
                        ) : null}
                    </div>

                    {flash.success ? (
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-brand">{flash.success}</div>
                    ) : null}

                    <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-brand-ink">Hero</h2>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Headline (one line per row)</label>
                            <textarea
                                rows={4}
                                value={data.hero.headline}
                                onChange={(e) => setData('hero', { ...data.hero, headline: e.target.value })}
                                className={fieldClass}
                            />
                            <FieldError message={errors['hero.headline']} />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Subtext</label>
                            <textarea
                                rows={3}
                                value={data.hero.subtext}
                                onChange={(e) => setData('hero', { ...data.hero, subtext: e.target.value })}
                                className={fieldClass}
                            />
                            <FieldError message={errors['hero.subtext']} />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Location badge</label>
                            <input
                                value={data.hero.location}
                                onChange={(e) => setData('hero', { ...data.hero, location: e.target.value })}
                                className={fieldClass}
                            />
                            <FieldError message={errors['hero.location']} />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {data.hero_stats.map((stat, index) => (
                                <div key={`stat-${index}`} className="grid gap-2 rounded-2xl bg-brand-soft/60 p-3 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-brand-muted">Value</label>
                                        <input
                                            value={stat.value}
                                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                                            className={fieldClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-brand-muted">Label</label>
                                        <input
                                            value={stat.label}
                                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                                            className={fieldClass}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-brand-ink">Mission and vision</h2>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Heading</label>
                            <textarea
                                rows={2}
                                value={data.mission_vision.heading}
                                onChange={(e) => setData('mission_vision', { ...data.mission_vision, heading: e.target.value })}
                                className={fieldClass}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Mission</label>
                            <textarea
                                rows={3}
                                value={data.mission_vision.mission}
                                onChange={(e) => setData('mission_vision', { ...data.mission_vision, mission: e.target.value })}
                                className={fieldClass}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-brand-ink">Vision</label>
                            <textarea
                                rows={3}
                                value={data.mission_vision.vision}
                                onChange={(e) => setData('mission_vision', { ...data.mission_vision, vision: e.target.value })}
                                className={fieldClass}
                            />
                        </div>
                    </section>

                    <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-brand-ink">Contact details</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-brand-ink">Phone</label>
                                <input
                                    value={data.contact.phone}
                                    onChange={(e) => setData('contact', { ...data.contact, phone: e.target.value })}
                                    className={fieldClass}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-brand-ink">Email</label>
                                <input
                                    type="email"
                                    value={data.contact.email}
                                    onChange={(e) => setData('contact', { ...data.contact, email: e.target.value })}
                                    className={fieldClass}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-brand-ink">Address</label>
                                <input
                                    value={data.contact.address}
                                    onChange={(e) => setData('contact', { ...data.contact, address: e.target.value })}
                                    className={fieldClass}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-brand-ink">Hours</label>
                                <input
                                    value={data.contact.hours}
                                    onChange={(e) => setData('contact', { ...data.contact, hours: e.target.value })}
                                    className={fieldClass}
                                />
                            </div>
                        </div>
                    </section>

                    <MemberList
                        title="Executive members"
                        listKey="executive_members"
                        members={data.executive_members}
                        setData={setData}
                        errors={errors}
                        canEdit={canEdit}
                    />
                    <MemberList
                        title="Council members"
                        listKey="council_members"
                        members={data.council_members}
                        setData={setData}
                        errors={errors}
                        canEdit={canEdit}
                    />

                    {canEdit ? (
                        <div className="flex justify-end">
                            <button type="submit" disabled={processing} className="btn btn-amber disabled:opacity-50">
                                {processing ? 'Saving…' : 'Save changes'}
                            </button>
                        </div>
                    ) : null}
                </fieldset>
            </form>
        </AppLayout>
    );
}
