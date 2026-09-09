import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Messages' },
];

export default function AdminContactsIndex({ messages }) {
    const page = usePage();
    const flash = page.props.flash ?? {};
    const { canEditContent } = useCapabilities();
    const rows = paginatorItems(messages);
    const meta = messages && !Array.isArray(messages) ? messages : null;

    const setStatus = (id, status) => {
        router.patch(route('admin.contacts.update', id), { status }, { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Messages" />

            <div className="mx-auto max-w-6xl space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Contact messages</h1>
                    <p className="mt-1 text-sm text-slate-600">Messages sent from the public contact and get-involved forms.</p>
                </div>

                {flash.success ? (
                    <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{flash.success}</div>
                ) : null}

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-3">From</th>
                                <th className="px-4 py-3">Subject</th>
                                <th className="px-4 py-3">Message</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                                        No messages yet.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((message) => (
                                    <tr key={message.id} className={message.status === 'new' ? 'bg-teal-50/40' : ''}>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900">{message.name}</p>
                                            <p className="text-xs text-slate-500">
                                                {message.email}
                                                {message.phone ? ` · ${message.phone}` : ''}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                {message.created_at ? new Date(message.created_at).toLocaleString() : '—'}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-slate-700">{message.subject || '—'}</td>
                                        <td className="max-w-md px-4 py-3 text-slate-700">{message.message}</td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={message.status}
                                                disabled={!canEditContent}
                                                onChange={(e) => setStatus(message.id, e.target.value)}
                                                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm disabled:bg-slate-100"
                                            >
                                                <option value="new">New</option>
                                                <option value="read">Read</option>
                                                <option value="archived">Archived</option>
                                            </select>
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
