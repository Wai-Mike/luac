import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Comments' },
];

export default function AdminContentComments({ comments: commentsPaginator }) {
    const rows = paginatorItems(commentsPaginator);
    const meta = commentsPaginator && !Array.isArray(commentsPaginator) ? commentsPaginator : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Comments" />

            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Comment moderation</h1>
                        <p className="mt-1 text-sm text-slate-600">Approve, reject, or remove comments</p>
                    </div>
                    <Link href="/admin" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                        Dashboard
                    </Link>
                </div>

                <div className="space-y-4">
                    {rows.length === 0 ? (
                        <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                            No comments.
                        </p>
                    ) : (
                        rows.map((c) => <CommentCard key={c.id} comment={c} />)
                    )}
                </div>

                {meta?.links && (
                    <nav className="flex flex-wrap justify-center gap-2 text-sm">
                        {meta.links.map((link, i) => (
                            <button
                                key={i}
                                type="button"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                className={`rounded-lg px-3 py-1 ${
                                    link.active
                                        ? 'bg-[rgb(4,50,75)] text-white'
                                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                } disabled:cursor-not-allowed disabled:opacity-40`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                )}
            </div>
        </AppLayout>
    );
}

function CommentCard({ comment }) {
    const author = comment.user?.name || comment.user?.email || 'Unknown';
    const approved = comment.is_approved === true || comment.is_approved === 1;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                    <p className="text-sm font-medium text-slate-900">{author}</p>
                    <p className="text-xs text-slate-500">#{comment.id}</p>
                </div>
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}
                >
                    {approved ? 'Approved' : 'Pending / rejected'}
                </span>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-800">{comment.body || comment.content || '—'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() =>
                        router.post(route('admin.content.comments.approve', comment.id), {}, { preserveScroll: true })
                    }
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                >
                    Approve
                </button>
                <button
                    type="button"
                    onClick={() =>
                        router.post(route('admin.content.comments.reject', comment.id), {}, { preserveScroll: true })
                    }
                    className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
                >
                    Reject
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (!confirm('Delete this comment?')) return;
                        router.delete(route('admin.content.comments.destroy', comment.id), { preserveScroll: true });
                    }}
                    className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
