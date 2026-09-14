import { Link, router, usePage } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    ClipboardList,
    Globe,
    Heart,
    IdCard,
    Image,
    LayoutDashboard,
    LogOut,
    MessageSquareWarning,
    Newspaper,
    Settings,
    Users,
    Wallet,
} from 'lucide-react';
import AdminMark from '@/components/admin/AdminMark';
import { GOLD, SIDEBAR_MUTED, TEAL, initials } from '@/lib/admin-theme';

function isActive(match, url) {
    return typeof match === 'function' ? match(url) : false;
}

const ITEMS = [
    { title: 'Dashboard', href: () => route('admin.dashboard'), icon: LayoutDashboard, match: (path) => path === '/admin' || path === '/dashboard' || path.startsWith('/admin/analytics') },
    { title: 'Website', href: () => route('admin.content.site.edit'), icon: Globe, match: (path) => path.startsWith('/admin/content/site') },
    { title: 'Youth Members', href: () => route('admin.youth-members.index'), icon: Users, match: (path) => path.startsWith('/admin/youth-members') },
    { title: 'Membership', href: () => route('admin.memberships.index'), icon: IdCard, match: (path) => path.startsWith('/admin/memberships') },
    { title: 'Programs', href: () => route('admin.programs.index'), icon: Calendar, match: (path) => path.startsWith('/admin/programs') },
    { title: 'Fundraising', href: () => route('admin.donations.index'), icon: Heart, match: (path) => path.startsWith('/admin/donations') },
    { title: 'Finances', href: () => route('admin.finances.index'), icon: Wallet, match: (path) => path.startsWith('/admin/finances') },
    { title: 'News & Events', href: () => route('admin.news.index'), icon: Newspaper, match: (path) => path.startsWith('/admin/news') },
    { title: 'Gallery', href: () => route('admin.media.index'), icon: Image, match: (path) => path.startsWith('/admin/media') },
    { title: 'Operations', href: () => route('admin.operations.index'), icon: ClipboardList, match: (path) => path.startsWith('/admin/operations') },
    { title: 'Users', href: () => route('admin.users'), icon: Users, match: (path) => path.startsWith('/admin/users') },
    { title: 'Moderation', href: () => route('admin.content.comments'), icon: MessageSquareWarning, match: (path) => path.startsWith('/admin/content/comments'), badge: true },
    { title: 'Departments', href: () => route('admin.departments.index'), icon: Building2, match: (path) => path.startsWith('/admin/departments') },
    { title: 'Settings', href: () => route('admin.settings'), icon: Settings, match: (path) => path.startsWith('/admin/settings') },
];

export default function AdminSidebar({ collapsed, onNavigate }) {
    const page = usePage();
    const user = page.props.auth?.user;
    const pending = Number(page.props.admin?.pending_moderation ?? 0);
    const url = page.url.split('?')[0];

    return (
        <aside
            className="flex h-full w-full shrink-0 flex-col overflow-hidden text-white"
            style={{
                width: collapsed ? 76 : 252,
                maxWidth: '100%',
                background: TEAL,
                transition: 'width 280ms ease',
            }}
        >
            <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? 'justify-center px-2' : ''}`}>
                <AdminMark />
                {!collapsed ? (
                    <div className="min-w-0">
                        <p className="font-manrope truncate text-[20px] font-extrabold leading-none tracking-tight text-white">LAYYA</p>
                        <p className="mt-1 truncate text-[11px] font-medium" style={{ color: SIDEBAR_MUTED }}>
                            Admin portal
                        </p>
                    </div>
                ) : null}
            </div>

            <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-3 pb-3">
                {ITEMS.map((item) => {
                    const active = isActive(item.match, url);
                    const Icon = item.icon;
                    const badge = item.badge ? pending : 0;
                    return (
                        <Link
                            key={item.title}
                            href={item.href()}
                            title={item.title}
                            onClick={() => onNavigate?.()}
                            className={`relative flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium ${collapsed ? 'justify-center' : ''}`}
                            style={{
                                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                                color: active ? '#fff' : SIDEBAR_MUTED,
                            }}
                        >
                            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} style={{ color: active ? GOLD : SIDEBAR_MUTED }} />
                            {!collapsed ? <span className="min-w-0 flex-1 truncate">{item.title}</span> : null}
                            {!collapsed && badge > 0 ? (
                                <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: '#C94B4B' }}>
                                    {badge}
                                </span>
                            ) : null}
                            {collapsed && badge > 0 ? (
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: '#C94B4B' }} />
                            ) : null}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto px-3 pb-4 pt-3" style={{ borderTop: '1px solid rgba(140,180,176,0.18)' }}>
                {!collapsed ? (
                    <div className="mb-3 flex items-center gap-3 rounded-[12px] px-2 py-2">
                        <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-manrope text-[12px] font-extrabold"
                            style={{ background: GOLD, color: TEAL }}
                        >
                            {initials(user?.name)}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-white">{user?.name || 'Executive'}</p>
                            <p className="truncate text-[11px]" style={{ color: SIDEBAR_MUTED }}>
                                {user?.department?.name || user?.email || 'Executive'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mb-3 flex justify-center">
                        <span
                            className="flex h-9 w-9 items-center justify-center rounded-full font-manrope text-[12px] font-extrabold"
                            style={{ background: GOLD, color: TEAL }}
                        >
                            {initials(user?.name)}
                        </span>
                    </div>
                )}
                <button
                    type="button"
                    onClick={() => router.post(route('logout'))}
                    className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium ${collapsed ? 'justify-center' : ''}`}
                    style={{ color: SIDEBAR_MUTED }}
                >
                    <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    {!collapsed ? 'Sign out' : null}
                </button>
            </div>
        </aside>
    );
}
