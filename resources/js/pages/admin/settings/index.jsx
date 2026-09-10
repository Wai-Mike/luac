import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import useSiteContent from '@/hooks/useSiteContent';
import { BORDER, SURFACE, TEAL } from '@/lib/admin-theme';
import { Head, Link, useForm } from '@inertiajs/react';

const TABS = ['General', 'Appearance', 'Notifications', 'Security', 'Integrations'];
const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm text-brand-ink outline-none focus:border-brand';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };

export default function AdminSettings() {
    const { canEditContent } = useCapabilities();
    const { contact, missionVision } = useSiteContent();
    const [tab, setTab] = useState('General');
    const [saved, setSaved] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        site_name: 'Luac Akook Yieu Youth Association (LAYYA)',
        site_description: missionVision.mission || '',
        contact_email: contact.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setSaved(true);
                window.setTimeout(() => setSaved(false), 3000);
            },
        });
    };

    return (
        <AppLayout title="Settings" subtitle="Organisation details and panel preferences">
            <Head title="Admin · Settings" />

            <div className="space-y-6">
                <div className="flex flex-wrap gap-1 rounded-2xl p-1" style={{ background: SURFACE }}>
                    {TABS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setTab(item)}
                            className="rounded-full px-4 py-2 text-sm font-semibold"
                            style={{
                                background: tab === item ? '#fff' : 'transparent',
                                color: tab === item ? TEAL : '#4a6b6b',
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {tab === 'General' ? (
                    <form onSubmit={canEditContent ? submit : (e) => e.preventDefault()} className="grid gap-4 lg:grid-cols-2">
                        <fieldset disabled={!canEditContent} className="space-y-4 rounded-2xl bg-white p-6" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Organisation details</h2>
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Site name</label>
                                <input value={data.site_name} onChange={(e) => setData('site_name', e.target.value)} className={fieldClass} style={fieldStyle} />
                                {errors.site_name ? <p className="mt-1 text-xs text-red-600">{errors.site_name}</p> : null}
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Contact email</label>
                                <input type="email" value={data.contact_email} onChange={(e) => setData('contact_email', e.target.value)} className={fieldClass} style={fieldStyle} />
                                {errors.contact_email ? <p className="mt-1 text-xs text-red-600">{errors.contact_email}</p> : null}
                            </div>
                            <Link href={route('admin.content.site.edit')} className="inline-block text-sm font-semibold" style={{ color: TEAL }}>
                                Edit public website copy →
                            </Link>
                        </fieldset>

                        <fieldset disabled={!canEditContent} className="space-y-4 rounded-2xl bg-white p-6" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Mission statement</h2>
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Description</label>
                                <textarea rows={6} value={data.site_description} onChange={(e) => setData('site_description', e.target.value)} className={fieldClass} style={fieldStyle} />
                                {errors.site_description ? <p className="mt-1 text-xs text-red-600">{errors.site_description}</p> : null}
                            </div>
                            {canEditContent ? (
                                saved ? (
                                    <div className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                                        Settings saved
                                    </div>
                                ) : (
                                    <button type="submit" disabled={processing} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                                        {processing ? 'Saving…' : 'Save'}
                                    </button>
                                )
                            ) : null}
                        </fieldset>
                    </form>
                ) : (
                    <div className="rounded-2xl bg-white p-8 text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>
                        {tab} settings will be wired here. The General tab already updates organisation metadata.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
