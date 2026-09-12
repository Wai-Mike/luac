import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import KpiCard from '@/components/admin/KpiCard';
import { AdminRow, AdminTable, PaginationBar } from '@/components/admin/AdminTable';
import { BORDER, CAT, CAT_LIGHT, TEAL, TEAL_LIGHT, initials } from '@/lib/admin-theme';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';
import { formatSsp, formatUsd } from '@/pages/guest/data/money';
import { BadgeCheck, Download, Users, Wallet } from 'lucide-react';

const fieldClass = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const fieldStyle = { border: '1.5px solid rgba(0,77,77,0.2)', background: '#fff' };

function yearsAround(current) {
    const year = Number(current) || new Date().getFullYear();
    const start = Math.min(2024, year);
    const list = [];
    for (let value = year + 1; value >= start; value -= 1) {
        list.push(value);
    }
    return list;
}

function FeeRow({ member, year, search }) {
    const [amount, setAmount] = useState(String(member.amount_paid ?? 0));
    const [currency, setCurrency] = useState(member.currency || 'ssp');
    const name = `${member.first_name} ${member.last_name}`.trim();
    const color = CAT[member.id % CAT.length];

    const save = (event) => {
        event.preventDefault();
        router.put(
            route('admin.memberships.update', member.id),
            {
                year,
                amount_paid: amount || 0,
                currency,
                search: search || undefined,
            },
            { preserveScroll: true },
        );
    };

    return (
        <AdminRow>
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
                        style={{ background: CAT_LIGHT[member.id % CAT_LIGHT.length], color }}
                    >
                        {initials(name)}
                    </span>
                    <div>
                        <p className="font-medium text-brand-ink">{name}</p>
                        <p className="text-xs text-brand-muted">{member.phone || member.email || '—'}</p>
                        {member.source === 'membership' ? (
                            <p className="text-[11px] font-semibold" style={{ color: TEAL }}>Walk-in</p>
                        ) : null}
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-brand-muted">{member.age ?? '—'}</td>
            <td className="px-4 py-3 capitalize text-brand-muted">{member.gender || '—'}</td>
            <td className="px-4 py-3 text-brand-muted">{member.payam || member.county || '—'}</td>
            <td className="px-4 py-3">
                <form onSubmit={save} className="flex flex-wrap items-center gap-2">
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        className="w-24 rounded-lg px-2 py-1.5 text-sm outline-none"
                        style={{ border: `1.5px solid ${BORDER}` }}
                        aria-label={`Membership fee for ${name}`}
                    />
                    <select
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        className="rounded-lg px-2 py-1.5 text-sm outline-none"
                        style={{ border: `1.5px solid ${BORDER}` }}
                        aria-label={`Currency for ${name}`}
                    >
                        <option value="ssp">SSP</option>
                        <option value="usd">USD</option>
                    </select>
                    <button type="submit" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white" style={{ background: TEAL }}>
                        Save
                    </button>
                </form>
            </td>
        </AdminRow>
    );
}

export default function MembershipIndex({ members, year, filters = {}, stats = {} }) {
    const rows = paginatorItems(members);
    const meta = members && !Array.isArray(members) ? members : null;
    const search = filters.search || '';
    const flash = usePage().props.flash ?? {};
    const selectedYear = Number(year) || new Date().getFullYear();
    const walkIn = useForm({
        first_name: '',
        last_name: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        payam: '',
        year: selectedYear,
        amount_paid: '',
        currency: 'ssp',
        notes: '',
    });

    const onSearch = (event) => {
        event.preventDefault();
        const q = new FormData(event.target).get('search') || '';
        router.get(route('admin.memberships.index'), { year: selectedYear, ...(q ? { search: q } : {}) }, { preserveState: true });
    };

    return (
        <AppLayout title="Membership" subtitle={`Youth membership fees for ${selectedYear}`}>
            <Head title="Admin · Membership" />

            <div className="space-y-6">
                {flash.success ? (
                    <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                        {flash.success}
                    </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <KpiCard icon={Users} value={stats.registered ?? rows.length} label="Members" />
                    <KpiCard icon={BadgeCheck} value={stats.paid ?? 0} label={`Paid in ${selectedYear}`} />
                    <KpiCard icon={Wallet} value={formatSsp(stats.ssp)} label="Fees (SSP)" />
                    <KpiCard value={formatUsd(stats.usd)} label="Fees (USD)" />
                </div>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        walkIn.post(route('admin.memberships.store'), {
                            preserveScroll: true,
                            onSuccess: () => walkIn.reset('first_name', 'last_name', 'age', 'gender', 'phone', 'email', 'payam', 'amount_paid', 'notes'),
                        });
                    }}
                    className="space-y-4 rounded-2xl bg-white p-5"
                    style={{ border: `1px solid ${BORDER}` }}
                >
                    <div>
                        <h2 className="font-fraunces text-lg font-semibold text-brand-ink">Add a paying member</h2>
                        <p className="mt-1 text-sm text-brand-muted">Use this when someone has paid membership fees but has not filled the youth census.</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">First name</label>
                            <input className={fieldClass} style={fieldStyle} value={walkIn.data.first_name} onChange={(e) => walkIn.setData('first_name', e.target.value)} required />
                            {walkIn.errors.first_name ? <p className="mt-1 text-xs text-red-600">{walkIn.errors.first_name}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Last name</label>
                            <input className={fieldClass} style={fieldStyle} value={walkIn.data.last_name} onChange={(e) => walkIn.setData('last_name', e.target.value)} required />
                            {walkIn.errors.last_name ? <p className="mt-1 text-xs text-red-600">{walkIn.errors.last_name}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Age</label>
                            <input type="number" min="10" max="80" className={fieldClass} style={fieldStyle} value={walkIn.data.age} onChange={(e) => walkIn.setData('age', e.target.value)} required />
                            {walkIn.errors.age ? <p className="mt-1 text-xs text-red-600">{walkIn.errors.age}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Gender</label>
                            <select className={fieldClass} style={fieldStyle} value={walkIn.data.gender} onChange={(e) => walkIn.setData('gender', e.target.value)}>
                                <option value="">Select…</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Phone</label>
                            <input className={fieldClass} style={fieldStyle} value={walkIn.data.phone} onChange={(e) => walkIn.setData('phone', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Email</label>
                            <input type="email" className={fieldClass} style={fieldStyle} value={walkIn.data.email} onChange={(e) => walkIn.setData('email', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Payam</label>
                            <input className={fieldClass} style={fieldStyle} value={walkIn.data.payam} onChange={(e) => walkIn.setData('payam', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Amount paid</label>
                            <input type="number" min="0.01" step="0.01" className={fieldClass} style={fieldStyle} value={walkIn.data.amount_paid} onChange={(e) => walkIn.setData('amount_paid', e.target.value)} required />
                            {walkIn.errors.amount_paid ? <p className="mt-1 text-xs text-red-600">{walkIn.errors.amount_paid}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Currency</label>
                            <select className={fieldClass} style={fieldStyle} value={walkIn.data.currency} onChange={(e) => walkIn.setData('currency', e.target.value)}>
                                <option value="ssp">SSP</option>
                                <option value="usd">USD</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" disabled={walkIn.processing} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: TEAL }}>
                        {walkIn.processing ? 'Saving…' : 'Add paid member'}
                    </button>
                </form>

                <form onSubmit={onSearch} className="flex flex-wrap gap-2">
                    <select
                        value={selectedYear}
                        onChange={(event) => router.get(route('admin.memberships.index'), { year: event.target.value, ...(search ? { search } : {}) })}
                        className="rounded-xl px-3 py-2 text-sm outline-none"
                        style={{ border: `1.5px solid ${BORDER}` }}
                        aria-label="Membership year"
                    >
                        {yearsAround(selectedYear).map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                    <input
                        name="search"
                        type="search"
                        defaultValue={search}
                        placeholder="Search name, phone, email…"
                        className="min-w-0 w-full flex-1 rounded-xl px-3 py-2.5 text-sm outline-none sm:min-w-[200px] sm:w-auto"
                        style={{ border: `1.5px solid ${BORDER}` }}
                    />
                    <button type="submit" className="min-h-11 rounded-xl px-4 py-2 text-sm font-semibold text-white" style={{ background: TEAL }}>
                        Search
                    </button>
                    <a
                        href={route('admin.memberships.export', { year: selectedYear })}
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
                        style={{ background: TEAL_LIGHT, color: TEAL }}
                    >
                        <Download className="h-4 w-4" />
                        Export Excel
                    </a>
                    <Link href={route('admin.youth-members.index')} className="inline-flex min-h-11 items-center rounded-xl px-4 py-2 text-sm font-semibold" style={{ background: TEAL_LIGHT, color: TEAL }}>
                        Census records
                    </Link>
                </form>

                <AdminTable
                    columns={['Member', 'Age', 'Gender', 'Payam', `Fee ${selectedYear}`]}
                    footer={<PaginationBar meta={meta} onPage={(url) => router.get(url, {}, { preserveState: true })} />}
                >
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-sm text-brand-muted">
                                No members yet. Add a paying member above, or register youth on the census.
                            </td>
                        </tr>
                    ) : (
                        rows.map((member) => (
                            <FeeRow key={member.id} member={member} year={selectedYear} search={search} />
                        ))
                    )}
                </AdminTable>
            </div>
        </AppLayout>
    );
}
