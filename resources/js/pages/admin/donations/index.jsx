import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Donations' },
];

function money(amount, currency = 'usd') {
    const value = Number(amount || 0);
    if (String(currency).toLowerCase() === 'ssp') {
        return `SSP ${value.toLocaleString()}`;
    }

    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function AdminDonationsIndex({ donations }) {
    const rows = paginatorItems(donations);
    const meta = donations && !Array.isArray(donations) ? donations : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Donations" />

            <div className="mx-auto max-w-6xl space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Donations</h1>
                    <p className="mt-1 text-sm text-slate-600">Pledges and gifts submitted from the public fundraising form.</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Donor</th>
                                <th className="px-4 py-3">Program</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Method</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                        No donations yet.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((donation) => (
                                    <tr key={donation.id}>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900">{donation.donor_name}</p>
                                            <p className="text-xs text-slate-500">
                                                {donation.donor_phone || '—'}
                                                {donation.donor_email ? ` · ${donation.donor_email}` : ''}
                                            </p>
                                            {donation.notes ? <p className="mt-1 text-xs text-slate-500">{donation.notes}</p> : null}
                                        </td>
                                        <td className="px-4 py-3 text-slate-700">{donation.campaign?.title || '—'}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900">{money(donation.amount, donation.currency)}</p>
                                            <p className="text-xs text-slate-500">{money(donation.amount_usd, 'usd')} USD</p>
                                        </td>
                                        <td className="px-4 py-3 capitalize text-slate-700">
                                            {String(donation.payment_method || '').replaceAll('_', ' ')}
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            {donation.donated_at ? new Date(donation.donated_at).toLocaleString() : '—'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {meta?.links ? (
                    <div className="flex flex-wrap gap-2">
                        {meta.links.map((link, index) => (
                            <Link
                                key={`${link.label}-${index}`}
                                href={link.url || '#'}
                                className={`rounded-lg px-3 py-1.5 text-sm ${
                                    link.active
                                        ? 'bg-[rgb(4,50,75)] text-white'
                                        : 'border border-slate-300 bg-white text-slate-700'
                                } ${link.url ? '' : 'pointer-events-none opacity-40'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}
