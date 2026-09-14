import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, SURFACE, TEAL } from '@/lib/admin-theme';
import { Head, Link, useForm } from '@inertiajs/react';

const TABS = ['General', 'Appearance', 'Notifications', 'Security', 'Integrations'];
const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm text-brand-ink outline-none focus:border-brand';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)' };

export default function AdminSettings({ settings = {} }) {
    const { canEditContent } = useCapabilities();
    const [tab, setTab] = useState('General');
    const [saved, setSaved] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        site_name: settings.site_name || 'Luac Akook Yieu Youth Association (LAYYA)',
        site_description: settings.site_description || '',
        contact_email: settings.contact_email || '',
        appearance: settings.appearance || 'light',
        notifications: {
            email: settings.notifications?.email ?? true,
            census: settings.notifications?.census ?? true,
            feedback: settings.notifications?.feedback ?? true,
            donations: settings.notifications?.donations ?? true,
        },
        security: {
            session_timeout: settings.security?.session_timeout ?? 120,
            require_verified_email: settings.security?.require_verified_email ?? true,
        },
        integrations: {
            whatsapp: settings.integrations?.whatsapp || '0927 779 952',
            smtp_from: settings.integrations?.smtp_from || 'info@luac-akook-yieu.org',
        },
    });

    useEffect(() => {
        window.localStorage.setItem('layya-admin-appearance', data.appearance);
        document.documentElement.classList.toggle('dark', data.appearance === 'dark');
    }, [data.appearance]);

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

            <form onSubmit={canEditContent ? submit : (e) => e.preventDefault()} className="space-y-6">
                <div className="tab-scroll rounded-2xl p-1" style={{ background: SURFACE }}>
                    {TABS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setTab(item)}
                            className="min-h-11 rounded-full px-3 py-2 text-[13px] font-medium sm:min-h-0 sm:px-4"
                            style={{
                                background: tab === item ? '#fff' : 'transparent',
                                color: tab === item ? TEAL : '#4a6b6b',
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <fieldset disabled={!canEditContent} className="space-y-4">
                    {tab === 'General' ? (
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="space-y-4 rounded-2xl bg-white p-5 sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
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
                            </div>
                            <div className="space-y-4 rounded-2xl bg-white p-5 sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
                                <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Mission statement</h2>
                                <textarea rows={6} value={data.site_description} onChange={(e) => setData('site_description', e.target.value)} className={fieldClass} style={fieldStyle} />
                            </div>
                        </div>
                    ) : null}

                    {tab === 'Appearance' ? (
                        <div className="rounded-2xl bg-white p-5 sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Appearance</h2>
                            <p className="mt-1 text-sm text-brand-muted">Choose how the admin dashboard looks on this device.</p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {['light', 'dark'].map((mode) => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setData('appearance', mode)}
                                        className="rounded-2xl p-4 text-left"
                                        style={{ border: `2px solid ${data.appearance === mode ? TEAL : BORDER}`, background: mode === 'dark' ? '#0c1f1f' : '#fff' }}
                                    >
                                        <p className="font-semibold" style={{ color: mode === 'dark' ? '#f3ece0' : TEAL }}>{mode === 'light' ? 'Light' : 'Dark'}</p>
                                        <p className="mt-1 text-xs" style={{ color: mode === 'dark' ? '#f3ece0aa' : '#4a6b6b' }}>
                                            {mode === 'light' ? 'Bright panels for daytime work.' : 'Tilt-green night theme for late sessions.'}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {tab === 'Notifications' ? (
                        <div className="space-y-3 rounded-2xl bg-white p-5 sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Notifications</h2>
                            {[
                                ['email', 'Email alerts'],
                                ['census', 'Youth census registrations'],
                                ['feedback', 'Contact page feedback'],
                                ['donations', 'New donations'],
                            ].map(([key, label]) => (
                                <label key={key} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm" style={{ background: SURFACE }}>
                                    <span>{label}</span>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(data.notifications[key])}
                                        onChange={(e) => setData('notifications', { ...data.notifications, [key]: e.target.checked })}
                                    />
                                </label>
                            ))}
                        </div>
                    ) : null}

                    {tab === 'Security' ? (
                        <div className="space-y-4 rounded-2xl bg-white p-5 sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Security</h2>
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Session timeout (minutes)</label>
                                <input type="number" min="15" max="1440" value={data.security.session_timeout} onChange={(e) => setData('security', { ...data.security, session_timeout: Number(e.target.value) })} className={fieldClass} style={fieldStyle} />
                            </div>
                            <label className="flex items-center justify-between rounded-xl px-3 py-3 text-sm" style={{ background: SURFACE }}>
                                <span>Require verified email before admin access</span>
                                <input type="checkbox" checked={Boolean(data.security.require_verified_email)} onChange={(e) => setData('security', { ...data.security, require_verified_email: e.target.checked })} />
                            </label>
                            <Link href="/settings/password" className="inline-block text-sm font-semibold" style={{ color: TEAL }}>
                                Change your password →
                            </Link>
                        </div>
                    ) : null}

                    {tab === 'Integrations' ? (
                        <div className="space-y-4 rounded-2xl bg-white p-5 sm:p-6" style={{ border: `1px solid ${BORDER}` }}>
                            <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Integrations</h2>
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">WhatsApp number</label>
                                <input value={data.integrations.whatsapp} onChange={(e) => setData('integrations', { ...data.integrations, whatsapp: e.target.value })} className={fieldClass} style={fieldStyle} />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Outgoing mail from</label>
                                <input type="email" value={data.integrations.smtp_from} onChange={(e) => setData('integrations', { ...data.integrations, smtp_from: e.target.value })} className={fieldClass} style={fieldStyle} />
                            </div>
                        </div>
                    ) : null}
                </fieldset>

                {canEditContent ? (
                    saved ? (
                        <div className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: '#e8f5e9', color: '#2e7d32' }}>Settings saved</div>
                    ) : (
                        <button type="submit" disabled={processing} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                            {processing ? 'Saving…' : 'Save settings'}
                        </button>
                    )
                ) : null}
            </form>
        </AppLayout>
    );
}
