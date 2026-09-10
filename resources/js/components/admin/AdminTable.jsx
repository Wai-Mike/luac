import { useState } from 'react';
import { TEAL, TEAL_PALE, SURFACE, BORDER } from '@/lib/admin-theme';

export function AdminTable({ columns, children, footer }) {
    return (
        <div className="overflow-x-auto rounded-2xl bg-white" style={{ border: `1px solid ${BORDER}` }}>
            <table className="w-full min-w-[640px] text-sm">
                <thead style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
            {footer || null}
        </div>
    );
}

export function AdminRow({ children, className = '' }) {
    const [hover, setHover] = useState(false);

    return (
        <tr
            className={`group ${className}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ background: hover ? TEAL_PALE : 'transparent' }}
        >
            {children}
        </tr>
    );
}

export function PaginationBar({ meta, onPage }) {
    if (!meta?.links?.length) {
        return null;
    }

    const from = meta.from ?? 0;
    const to = meta.to ?? 0;
    const total = meta.total ?? 0;

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="text-xs text-brand-muted">
                Showing {from}–{to} of {total}
            </p>
            <div className="flex flex-wrap gap-1">
                {meta.links.map((link, index) => (
                    <button
                        key={`${link.label}-${index}`}
                        type="button"
                        disabled={!link.url}
                        onClick={() => link.url && onPage?.(link.url)}
                        className="rounded-lg px-2.5 py-1 text-xs font-semibold disabled:opacity-40"
                        style={{
                            background: link.active ? TEAL : 'transparent',
                            color: link.active ? '#fff' : MUTED_SAFE,
                        }}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}

const MUTED_SAFE = '#4a6b6b';
