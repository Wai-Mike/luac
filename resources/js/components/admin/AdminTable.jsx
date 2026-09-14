import { useState } from 'react';
import { BORDER, MUTED, SURFACE, TEAL, TEAL_PALE, WHITE } from '@/lib/admin-theme';

export function AdminTable({ columns, children, footer }) {
    return (
        <div className="min-w-0 max-w-full overflow-x-auto bg-white [-webkit-overflow-scrolling:touch]" style={{ border: `1px solid ${BORDER}`, borderRadius: 14 }}>
            <table className="w-full min-w-[36rem] text-[13px]">
                <thead style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide"
                                style={{ color: MUTED }}
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
            style={{ background: hover ? TEAL_PALE : WHITE, borderBottom: `1px solid ${BORDER}` }}
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
            <p className="text-xs" style={{ color: MUTED }}>
                Showing {from}–{to} of {total}
            </p>
            <div className="flex flex-wrap gap-1">
                {meta.links.map((link, index) => (
                    <button
                        key={`${link.label}-${index}`}
                        type="button"
                        disabled={!link.url}
                        onClick={() => link.url && onPage?.(link.url)}
                        className="min-h-9 min-w-9 rounded-[8px] px-2.5 py-1 text-xs font-semibold disabled:opacity-40"
                        style={{
                            background: link.active ? TEAL : 'transparent',
                            color: link.active ? '#fff' : MUTED,
                        }}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
