import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import KpiCard from '@/components/admin/KpiCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { AdminRow, AdminTable, PaginationBar } from '@/components/admin/AdminTable';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, CAT, CAT_LIGHT, SURFACE, TEAL } from '@/lib/admin-theme';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';
import { formatSsp, formatUsd } from '@/pages/guest/data/money';
import { uploadPortrait } from '@/lib/upload-portrait';
import { Download, HeartHandshake, Plus, Target, Users } from 'lucide-react';

const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)', background: '#fff' };

function money(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(amount || 0));
}

export default function AdminDonationsIndex({ donations, campaigns = [], programs = [], stats = {} }) {
    const rows = paginatorItems(donations);
    const meta = donations && !Array.isArray(donations) ? donations : null;
    const { canEditContent } = useCapabilities();
    const flash = usePage().props.flash ?? {};
    const [editingGoals, setEditingGoals] = useState(false);

    const gift = useForm({
        donor_name: '',
        donor_phone: '',
        donor_email: '',
        program: programs[0] || '',
        amount: '',
        currency: 'usd',
        payment_method: 'cash',
        donated_at: new Date().toISOString().slice(0, 10),
        notes: '',
    });

    const campaignForm = useForm({
        campaigns: campaigns.map((c) => ({
            title: c.title,
            description: c.description || '',
            target: c.target || 0,
            target_ssp: c.target_ssp || 0,
            image: c.image || '/images/cover.jpg',
        })),
    });

    return (
        <AppLayout title="Fundraising" subtitle="Record gifts, set amounts needed, and export donors to Excel">
            <Head title="Admin · Fundraising" />

            <div className="space-y-6">
                {flash.success ? (
                    <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                        {flash.success}
                    </div>
                ) : null}

                <div className="flex flex-wrap items-center justify-end">
                    <a
                        href={route('admin.donations.export')}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                        style={{ background: TEAL }}
                    >
                        <Download className="h-4 w-4" />
                        Export Excel
                    </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <KpiCard icon={HeartHandshake} value={money(stats.usd)} label="Raised (USD)" />
                    <KpiCard icon={Users} value={stats.total ?? rows.length} label="Donors" />
                    <KpiCard value={stats.campaigns ?? campaigns.length} icon={Target} label="Active campaigns" />
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        gift.post(route('admin.donations.store'), {
                            preserveScroll: true,
                            onSuccess: () => gift.reset('donor_name', 'donor_phone', 'donor_email', 'amount', 'notes'),
                        });
                    }}
                    className="space-y-4 rounded-2xl bg-white p-5"
                    style={{ border: `1px solid ${BORDER}` }}
                >
                    <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Record a donation</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Donor name</label>
                            <input className={fieldClass} style={fieldStyle} value={gift.data.donor_name} onChange={(e) => gift.setData('donor_name', e.target.value)} required />
                            {gift.errors.donor_name ? <p className="mt-1 text-xs text-red-600">{gift.errors.donor_name}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Phone</label>
                            <input className={fieldClass} style={fieldStyle} value={gift.data.donor_phone} onChange={(e) => gift.setData('donor_phone', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Email</label>
                            <input type="email" className={fieldClass} style={fieldStyle} value={gift.data.donor_email} onChange={(e) => gift.setData('donor_email', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Campaign</label>
                            <select className={fieldClass} style={fieldStyle} value={gift.data.program} onChange={(e) => gift.setData('program', e.target.value)}>
                                {programs.map((title) => (
                                    <option key={title} value={title}>{title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Amount given</label>
                            <input type="number" min="1" step="0.01" className={fieldClass} style={fieldStyle} value={gift.data.amount} onChange={(e) => gift.setData('amount', e.target.value)} required />
                            {gift.errors.amount ? <p className="mt-1 text-xs text-red-600">{gift.errors.amount}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Currency</label>
                            <select className={fieldClass} style={fieldStyle} value={gift.data.currency} onChange={(e) => gift.setData('currency', e.target.value)}>
                                <option value="usd">USD</option>
                                <option value="ssp">SSP</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Method</label>
                            <select className={fieldClass} style={fieldStyle} value={gift.data.payment_method} onChange={(e) => gift.setData('payment_method', e.target.value)}>
                                <option value="cash">Cash</option>
                                <option value="mobile_money">Mobile money</option>
                                <option value="bank">Bank transfer</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Date</label>
                            <input type="date" className={fieldClass} style={fieldStyle} value={gift.data.donated_at} onChange={(e) => gift.setData('donated_at', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Notes</label>
                        <input className={fieldClass} style={fieldStyle} value={gift.data.notes} onChange={(e) => gift.setData('notes', e.target.value)} placeholder="Optional" />
                    </div>
                    <button type="submit" disabled={gift.processing} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                        {gift.processing ? 'Saving…' : 'Add donation'}
                    </button>
                </form>

                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Campaigns &amp; amounts needed</h2>
                    {canEditContent ? (
                        <button type="button" onClick={() => setEditingGoals((open) => !open)} className="text-sm font-semibold" style={{ color: TEAL }}>
                            {editingGoals ? 'Close editor' : 'Edit goals'}
                        </button>
                    ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign, i) => (
                        <article key={campaign.title} className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                            {campaign.image ? (
                                <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-brand-dark">
                                    <img src={campaign.image} alt="" className="h-full w-full object-cover" />
                                </div>
                            ) : null}
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-fraunces text-lg font-semibold text-brand-ink">{campaign.title}</h3>
                                <StatusBadge status={campaign.status || 'active'} />
                            </div>
                            <p className="mt-1 text-xs text-brand-muted">{campaign.description}</p>
                            <div className="mt-4 flex items-end justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="break-words font-fraunces text-2xl font-bold text-brand-ink">{formatUsd(campaign.raised)}</p>
                                    <p className="break-words text-xs text-brand-muted">raised of {formatUsd(campaign.target)} needed</p>
                                    <p className="mt-1 break-words text-xs text-brand-muted">
                                        {formatSsp(campaign.raised_ssp)} raised of {formatSsp(campaign.target_ssp)} needed
                                    </p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="font-fraunces text-lg font-bold" style={{ color: CAT[i % CAT.length] }}>
                                        {campaign.percent}%
                                    </p>
                                    <p className="text-xs text-brand-muted">
                                        {campaign.donors} {Number(campaign.donors) === 1 ? 'donor' : 'donors'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: CAT_LIGHT[i % CAT_LIGHT.length] }}>
                                <div className="h-full rounded-full" style={{ width: `${campaign.percent}%`, background: CAT[i % CAT.length] }} />
                            </div>
                        </article>
                    ))}
                    {canEditContent ? (
                        <button
                            type="button"
                            className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl text-sm font-semibold"
                            style={{ border: '2px dashed rgba(0,77,77,0.2)', color: TEAL }}
                            onClick={() => {
                                setEditingGoals(true);
                                campaignForm.setData('campaigns', [
                                    ...campaignForm.data.campaigns,
                                    { title: 'New campaign', description: '', target: 0, target_ssp: 0, image: '/images/cover.jpg' },
                                ]);
                            }}
                        >
                            <Plus className="h-5 w-5" />
                            Add campaign
                        </button>
                    ) : null}
                </div>

                {canEditContent && editingGoals ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            campaignForm.put(route('admin.donations.campaigns.update'), {
                                preserveScroll: true,
                                onSuccess: () => setEditingGoals(false),
                            });
                        }}
                        className="space-y-3 rounded-2xl bg-white p-5"
                        style={{ border: `1px solid ${BORDER}` }}
                    >
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Amount needed for each campaign</h2>
                        <p className="text-sm text-brand-muted">Enter the pound goal yourself. It is not converted from the dollar amount. Card photos stay until you replace them.</p>
                        <div className="hidden gap-2 px-3 text-xs font-semibold uppercase tracking-wide text-brand-muted lg:grid lg:grid-cols-[1fr_1fr_140px_160px_1fr]">
                            <span>Campaign</span>
                            <span>Description</span>
                            <span>Needed (USD)</span>
                            <span>Needed (SSP)</span>
                            <span>Card photo</span>
                        </div>
                        {campaignForm.data.campaigns.map((campaign, i) => (
                            <div key={`camp-${i}`} className="grid gap-2 rounded-xl p-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_140px_160px_1fr]" style={{ background: SURFACE }}>
                                <div className="min-w-0">
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted lg:hidden">Campaign</label>
                                    <input
                                    className={fieldClass}
                                    style={fieldStyle}
                                    value={campaign.title}
                                    onChange={(e) => campaignForm.setData('campaigns', campaignForm.data.campaigns.map((row, index) => (index === i ? { ...row, title: e.target.value } : row)))}
                                    aria-label="Campaign name"
                                />
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted lg:hidden">Description</label>
                                    <input
                                    className={fieldClass}
                                    style={fieldStyle}
                                    value={campaign.description}
                                    onChange={(e) => campaignForm.setData('campaigns', campaignForm.data.campaigns.map((row, index) => (index === i ? { ...row, description: e.target.value } : row)))}
                                    aria-label="Campaign description"
                                />
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted lg:hidden">Needed (USD)</label>
                                    <input
                                    type="number"
                                    min="0"
                                    className={fieldClass}
                                    style={fieldStyle}
                                    value={campaign.target}
                                    onChange={(e) => campaignForm.setData('campaigns', campaignForm.data.campaigns.map((row, index) => (index === i ? { ...row, target: Number(e.target.value) } : row)))}
                                    aria-label="Amount needed in USD"
                                />
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted lg:hidden">Needed (SSP)</label>
                                    <input
                                    type="number"
                                    min="0"
                                    className={fieldClass}
                                    style={fieldStyle}
                                    value={campaign.target_ssp}
                                    onChange={(e) => campaignForm.setData('campaigns', campaignForm.data.campaigns.map((row, index) => (index === i ? { ...row, target_ssp: Number(e.target.value) } : row)))}
                                    aria-label="Amount needed in SSP"
                                />
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted lg:hidden">Card photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={fieldClass}
                                        style={fieldStyle}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                uploadPortrait(file, (url) =>
                                                    campaignForm.setData(
                                                        'campaigns',
                                                        campaignForm.data.campaigns.map((row, index) => (index === i ? { ...row, image: url } : row)),
                                                    ),
                                                );
                                            }
                                        }}
                                        aria-label="Campaign card photo"
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="submit" disabled={campaignForm.processing} className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: TEAL }}>
                            Save amounts needed
                        </button>
                    </form>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Donors</h2>
                    <a href={route('admin.donations.export')} className="text-sm font-semibold" style={{ color: TEAL }}>
                        Download donor list (Excel)
                    </a>
                </div>

                <AdminTable
                    columns={['Donor', 'Program', 'Amount given', 'Method', 'Date']}
                    footer={<PaginationBar meta={meta} onPage={(url) => router.get(url, {}, { preserveState: true })} />}
                >
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-sm text-brand-muted">
                                No donations yet. Record a gift above, or wait for the public form.
                            </td>
                        </tr>
                    ) : (
                        rows.map((donation) => (
                            <AdminRow key={donation.id}>
                                <td className="px-4 py-3">
                                    <p className="font-medium text-brand-ink">{donation.donor_name}</p>
                                    <p className="text-xs text-brand-muted">{donation.donor_phone || donation.donor_email || '—'}</p>
                                </td>
                                <td className="px-4 py-3 text-brand-muted">{donation.campaign?.title || 'Gift'}</td>
                                <td className="px-4 py-3 font-medium text-brand-ink">
                                    {donation.currency === 'ssp' ? `${Number(donation.amount).toLocaleString()} SSP` : money(donation.amount_usd ?? donation.amount)}
                                </td>
                                <td className="px-4 py-3 capitalize text-brand-muted">{String(donation.payment_method || '').replaceAll('_', ' ')}</td>
                                <td className="px-4 py-3 text-brand-muted">{donation.donated_at ? new Date(donation.donated_at).toLocaleDateString() : '—'}</td>
                            </AdminRow>
                        ))
                    )}
                </AdminTable>
            </div>
        </AppLayout>
    );
}
