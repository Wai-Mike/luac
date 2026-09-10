import { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, ExternalLink, Menu, Search, X } from 'lucide-react';
import { BORDER, MUTED, SURFACE, TEAL, TEAL_LIGHT } from '@/lib/admin-theme';

function timeAgo(value) {
    if (!value) return '';
    const then = new Date(value).getTime();
    if (Number.isNaN(then)) return '';
    const seconds = Math.round((Date.now() - then) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(value).toLocaleDateString();
}

export default function AdminTopBar({ collapsed, mobileOpen = false, onToggle, title, subtitle }) {
    const page = usePage();
    const inbox = page.props.admin?.notifications ?? { unread: 0, items: [] };
    const unread = Number(inbox.unread ?? 0);
    const items = Array.isArray(inbox.items) ? inbox.items : [];
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const onPointer = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const onKey = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('click', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const openItem = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        router.post(route('admin.notifications.read', item.id));
    };

    return (
        <header
            className="flex h-16 shrink-0 items-center gap-2 bg-white px-3 sm:gap-4 sm:px-6"
            style={{ borderBottom: `1px solid ${BORDER}`, height: 64 }}
        >
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ color: MUTED, background: SURFACE }}
                >
                    {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
                <div className="min-w-0">
                    <h1 className="truncate font-fraunces text-[15px] font-semibold text-brand-ink">{title}</h1>
                    {subtitle ? <p className="hidden truncate text-xs text-brand-muted sm:block">{subtitle}</p> : null}
                </div>
            </div>

            <div className="hidden min-w-[200px] max-w-sm flex-1 md:block">
                <label className="relative block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: MUTED }} />
                    <input
                        type="search"
                        placeholder="Search…"
                        className="w-full rounded-xl py-2 pl-9 pr-3 text-sm text-brand-ink outline-none"
                        style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                    />
                </label>
            </div>

            <div className="flex shrink-0 items-center gap-2">
                <div className="relative" ref={panelRef}>
                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: open ? TEAL_LIGHT : SURFACE, color: open ? TEAL : MUTED }}
                        aria-label="Notifications"
                        aria-expanded={open}
                        onClick={() => setOpen((value) => !value)}
                    >
                        <Bell className="h-4 w-4" />
                        {unread > 0 ? (
                            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: '#e53935' }}>
                                {unread > 9 ? '9+' : unread}
                            </span>
                        ) : null}
                    </button>

                    {open ? (
                        <div
                            className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl bg-white shadow-xl"
                            style={{ border: `1px solid ${BORDER}` }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                                <p className="text-sm font-semibold text-brand-ink">Notifications</p>
                                {unread > 0 ? (
                                    <button
                                        type="button"
                                        className="text-xs font-semibold"
                                        style={{ color: TEAL }}
                                        onClick={() => router.post(route('admin.notifications.read-all'), {}, { preserveScroll: true })}
                                    >
                                        Mark all read
                                    </button>
                                ) : null}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {items.length === 0 ? (
                                    <p className="px-4 py-8 text-center text-sm text-brand-muted">No notifications yet.</p>
                                ) : (
                                    items.map((item) => {
                                        const unreadItem = !item.read_at;
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={(event) => openItem(event, item)}
                                                className="block w-full px-4 py-3 text-left"
                                                style={{ background: unreadItem ? TEAL_LIGHT : '#fff', borderBottom: `1px solid ${BORDER}` }}
                                            >
                                                <p className="text-sm font-semibold text-brand-ink">{item.title}</p>
                                                {item.body ? <p className="mt-0.5 text-xs text-brand-muted">{item.body}</p> : null}
                                                <p className="mt-1 text-[11px] text-brand-muted">{timeAgo(item.created_at)}</p>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
                <Link
                    href={route('home')}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold sm:px-3"
                    style={{ background: TEAL_LIGHT, color: TEAL }}
                >
                    <span className="hidden sm:inline">View Site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                </Link>
            </div>
        </header>
    );
}
