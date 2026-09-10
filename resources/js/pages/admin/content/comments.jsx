import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import StatusBadge from '@/components/admin/StatusBadge';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, CAT, CAT_LIGHT, initials, TEAL } from '@/lib/admin-theme';
import { Head, router } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';

export default function AdminContentComments({ comments: commentsPaginator }) {
    const rows = paginatorItems(commentsPaginator);
    const [local, setLocal] = useState({});
    const pending = rows.filter((c) => {
        const status = local[c.id] || commentStatus(c);
        return status === 'pending' || status === 'flagged';
    }).length;

    return (
        <AppLayout title="Moderation" subtitle="Review public comments before they appear">
            <Head title="Admin · Moderation" />

            <div className="space-y-4">
                <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: '#fdf3e7', color: '#9a6b24' }}>
                    {pending} comment{pending === 1 ? '' : 's'} waiting for review. Approve to publish, or reject to remove from the queue.
                </div>

                {rows.length === 0 ? (
                    <p className="rounded-2xl bg-white p-8 text-center text-sm text-brand-muted" style={{ border: `1px solid ${BORDER}` }}>
                        No comments in the queue.
                    </p>
                ) : (
                    rows.map((comment, i) => {
                        const status = local[comment.id] || commentStatus(comment);
                        if (status === 'removed') {
                            return null;
                        }
                        return (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                                index={i}
                                status={status}
                                onApprove={() => {
                                    setLocal((prev) => ({ ...prev, [comment.id]: 'approved' }));
                                    router.post(route('admin.content.comments.approve', comment.id), {}, { preserveScroll: true });
                                }}
                                onReject={() => {
                                    setLocal((prev) => ({ ...prev, [comment.id]: 'removed' }));
                                    router.post(route('admin.content.comments.reject', comment.id), {}, { preserveScroll: true });
                                }}
                                onDelete={() => {
                                    setLocal((prev) => ({ ...prev, [comment.id]: 'removed' }));
                                    router.delete(route('admin.content.comments.destroy', comment.id), { preserveScroll: true });
                                }}
                            />
                        );
                    })
                )}
            </div>
        </AppLayout>
    );
}

function commentStatus(comment) {
    if (comment.is_approved === true || comment.is_approved === 1) {
        return 'approved';
    }
    if (comment.rejection_reason) {
        return 'flagged';
    }
    return 'pending';
}

function CommentCard({ comment, index, status, onApprove, onReject, onDelete }) {
    const { canEditContent } = useCapabilities();
    const author = comment.user?.name || comment.user?.email || 'Guest';
    const color = CAT[index % CAT.length];

    return (
        <article className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 gap-3">
                    <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                        style={{ background: CAT_LIGHT[index % CAT_LIGHT.length], color }}
                    >
                        {initials(author)}
                    </span>
                    <div>
                        <p className="text-sm text-brand-ink">
                            <span className="font-semibold">{author}</span>
                            <span className="text-brand-muted"> on </span>
                            <span className="font-medium" style={{ color: TEAL }}>community story</span>
                            <span className="text-brand-muted"> · {comment.created_at ? new Date(comment.created_at).toLocaleString() : '—'}</span>
                        </p>
                        <p className="mt-2 text-sm text-brand-ink">{comment.body || comment.content || '—'}</p>
                    </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                    {status === 'approved' ? <StatusBadge status="approved" /> : null}
                    {canEditContent && status === 'pending' ? (
                        <>
                            <button type="button" onClick={onApprove} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: '#2e7d32' }}>
                                Approve
                            </button>
                            <button type="button" onClick={onReject} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: '#c62828' }}>
                                Reject
                            </button>
                        </>
                    ) : null}
                    {canEditContent && status === 'flagged' ? (
                        <button type="button" onClick={onDelete} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: '#c62828' }}>
                            Delete Spam
                        </button>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
