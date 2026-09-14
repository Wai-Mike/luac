import { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, Globe, Menu, Search, X } from 'lucide-react';
import { BORDER, INK, MUTED, SURFACE, TEAL, formatBriefingDate } from '@/lib/admin-theme';

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
        if (mobileOpen) setOpen(false);
    }, [mobileOpen]);

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

        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointer);
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
            className="relative z-30 flex h-16 shrink-0 items-center gap-2 bg-white px-3 sm:h-20 sm:gap-5 sm:px-7"
            style={{ borderBottom: `1px solid ${BORDER}` }}
        >
            <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setOpen(false);
                        onToggle();
                    }}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] sm:h-10 sm:w-10"
                    style={{ color: MUTED, background: SURFACE }}
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
                <div className="min-w-0">
                    <h1 className="font-manrope truncate text-[16px] font-semibold leading-none sm:text-[20px]" style={{ color: INK }}>
                        {title}
                    </h1>
                    <p className="mt-1 truncate text-[11px] sm:text-[12px]" style={{ color: MUTED }}>
                        {formatBriefingDate()}
                    </p>
                </div>
            </div>

            <div className="hidden min-w-0 md:block">
                <label className="relative block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: MUTED }} />
                    <input
                        type="search"
                        readOnly
                        placeholder="Search records, reports…"
                        className="h-10 w-[250px] rounded-[10px] py-2 pl-9 pr-3 text-[13px] outline-none"
                        style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: INK }}
                    />
                </label>
            </div>

            <div className="flex shrink-0 items-center gap-2">
                <div className="relative" ref={panelRef}>
                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-[10px]"
                        style={{ background: SURFACE, color: MUTED }}
                        aria-label="Notifications"
                        aria-expanded={open}
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpen((value) => !value);
                        }}
                    >
                        <Bell className="h-5 w-5" strokeWidth={1.75} />
                        {unread > 0 ? (
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: '#C94B4B' }} />
                        ) : null}
                    </button>

                    {open ? (
                        <>
                            <button
                                type="button"
                                className="fixed inset-0 z-[60] bg-black/40 md:hidden"
                                aria-label="Close notifications"
                                onClick={() => setOpen(false)}
                            />
                            <div
                                className="fixed inset-x-0 bottom-0 top-16 z-[70] flex max-h-[calc(100dvh-4rem)] flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:top-20 sm:max-h-[calc(100dvh-5rem)] md:absolute md:inset-auto md:right-0 md:top-auto md:mt-2 md:h-auto md:max-h-96 md:w-[min(22rem,calc(100vw-2rem))] md:rounded-[14px]"
                                style={{ border: `1px solid ${BORDER}` }}
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                                    <p className="text-sm font-semibold" style={{ color: INK }}>Notifications</p>
                                    {unread > 0 ? (
                                        <button
                                            type="button"
                                            className="min-h-11 text-xs font-semibold md:min-h-0"
                                            style={{ color: TEAL }}
                                            onClick={() => router.post(route('admin.notifications.read-all'), {}, { preserveScroll: true })}
                                        >
                                            Mark all read
                                        </button>
                                    ) : null}
                                </div>
                                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain md:max-h-80">
                                    {items.length === 0 ? (
                                        <p className="px-4 py-8 text-center text-sm" style={{ color: MUTED }}>No notifications yet.</p>
                                    ) : (
                                        items.map((item) => {
                                            const unreadItem = !item.read_at;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={(event) => openItem(event, item)}
                                                    className="block min-h-14 w-full px-4 py-3 text-left"
                                                    style={{ background: unreadItem ? '#FCEAEA' : '#fff', borderBottom: `1px solid ${BORDER}` }}
                                                >
                                                    <p className="text-sm font-semibold break-words" style={{ color: INK }}>{item.title}</p>
                                                    {item.body ? <p className="mt-0.5 text-xs break-words" style={{ color: MUTED }}>{item.body}</p> : null}
                                                    <p className="mt-1 text-[11px]" style={{ color: MUTED }}>{timeAgo(item.created_at)}</p>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
                <Link
                    href={route('home')}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-3.5 text-[13px] font-semibold text-white"
                    style={{ background: TEAL }}
                >
                    <Globe className="h-4 w-4" strokeWidth={1.75} />
                    <span className="hidden sm:inline">View site</span>
                </Link>
            </div>
        </header>
    );
}
