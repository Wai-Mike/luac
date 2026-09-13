import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Messages' },
];

function formatWhen(value) {
    return value ? new Date(value).toLocaleString() : '—';
}

function StatusSelect({ message, canEdit, onChange }) {
    return (
        <select
            value={message.status}
            disabled={!canEdit}
            onChange={(e) => onChange(message.id, e.target.value)}
            className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm disabled:bg-slate-100 sm:w-auto"
        >
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
        </select>
    );
}

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

            <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Contact messages</h1>
                    <p className="mt-1 text-sm text-slate-600">Messages sent from the public contact and get-involved forms.</p>
                </div>

                {flash.success ? (
                    <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{flash.success}</div>
                ) : null}

                {rows.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
                        No messages yet.
                    </div>
                ) : (
                    <>
                        <div className="space-y-3 md:hidden">
                            {rows.map((message) => (
                                <article
                                    key={message.id}
                                    className={`rounded-xl border bg-white p-4 shadow-sm ${
                                        message.status === 'new' ? 'border-teal-200 bg-teal-50/40' : 'border-slate-200'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-medium break-words text-slate-900">{message.name}</p>
                                            <p className="mt-0.5 text-xs break-all text-slate-500">{message.email}</p>
                                            {message.phone ? <p className="text-xs text-slate-500">{message.phone}</p> : null}
                                        </div>
                                        <p className="shrink-0 text-[11px] text-slate-400">{formatWhen(message.created_at)}</p>
                                    </div>
                                    <p className="mt-3 text-sm font-medium break-words text-slate-800">{message.subject || '—'}</p>
                                    <p className="mt-2 text-sm leading-relaxed break-words whitespace-pre-wrap text-slate-700">{message.message}</p>
                                    <div className="mt-4">
                                        <StatusSelect message={message} canEdit={canEditContent} onChange={setStatus} />
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block [-webkit-overflow-scrolling:touch]">
                            <table className="min-w-[720px] w-full divide-y divide-slate-100 text-sm">
                                <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">From</th>
                                        <th className="px-4 py-3">Subject</th>
                                        <th className="px-4 py-3">Message</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {rows.map((message) => (
                                        <tr key={message.id} className={message.status === 'new' ? 'bg-teal-50/40' : ''}>
                                            <td className="px-4 py-3 align-top">
                                                <p className="font-medium text-slate-900">{message.name}</p>
                                                <p className="text-xs break-all text-slate-500">
                                                    {message.email}
                                                    {message.phone ? ` · ${message.phone}` : ''}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">{formatWhen(message.created_at)}</p>
                                            </td>
                                            <td className="px-4 py-3 align-top break-words text-slate-700">{message.subject || '—'}</td>
                                            <td className="max-w-md px-4 py-3 align-top break-words whitespace-pre-wrap text-slate-700">{message.message}</td>
                                            <td className="px-4 py-3 align-top">
                                                <StatusSelect message={message} canEdit={canEditContent} onChange={setStatus} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

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
