import { Link, router, usePage } from '@inertiajs/react';
import {
    BadgeCheck,
    Building2,
    ClipboardCheck,
    Globe,
    GraduationCap,
    HeartHandshake,
    Image,
    Landmark,
    Layers,
    LayoutDashboard,
    Newspaper,
    LogOut,
    Settings,
    ShieldAlert,
    Users,
} from 'lucide-react';
import { TEAL_DARK } from '@/lib/admin-theme';

function isActive(match, url) {
    return typeof match === 'function' ? match(url) : false;
}

export default function AdminSidebar({ collapsed, onNavigate }) {
    const page = usePage();
    const user = page.props.auth?.user;
    const pending = Number(page.props.admin?.pending_moderation ?? 0);
    const url = page.url.split('?')[0];

    const items = [
        { title: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, match: (path) => path === '/admin' || path === '/dashboard' || path.startsWith('/admin/analytics') },
        { title: 'Website', href: route('admin.content.site.edit'), icon: Globe, match: (path) => path.startsWith('/admin/content/site') },
        { title: 'Youth Members', href: route('admin.youth-members.index'), icon: GraduationCap, match: (path) => path.startsWith('/admin/youth-members') },
        { title: 'Membership', href: route('admin.memberships.index'), icon: BadgeCheck, match: (path) => path.startsWith('/admin/memberships') },
        { title: 'Programs', href: route('admin.programs.index'), icon: Layers, match: (path) => path.startsWith('/admin/programs') },
        { title: 'Fundraising', href: route('admin.donations.index'), icon: HeartHandshake, match: (path) => path.startsWith('/admin/donations') },
        { title: 'Finances', href: route('admin.finances.index'), icon: Landmark, match: (path) => path.startsWith('/admin/finances') },
        { title: 'News & Events', href: route('admin.news.index'), icon: Newspaper, match: (path) => path.startsWith('/admin/news') },
        { title: 'Gallery', href: route('admin.media.index'), icon: Image, match: (path) => path.startsWith('/admin/media') },
        { title: 'Operations', href: route('admin.operations.index'), icon: ClipboardCheck, match: (path) => path.startsWith('/admin/operations') },
        { title: 'Users', href: route('admin.users'), icon: Users, match: (path) => path.startsWith('/admin/users') },
        { title: 'Moderation', href: route('admin.content.comments'), icon: ShieldAlert, match: (path) => path.startsWith('/admin/content/comments'), badge: pending },
        { title: 'Departments', href: route('admin.departments.index'), icon: Building2, match: (path) => path.startsWith('/admin/departments') },
        { title: 'Settings', href: route('admin.settings'), icon: Settings, match: (path) => path.startsWith('/admin/settings') },
    ];

    return (
        <aside
            className="flex h-full w-full shrink-0 flex-col overflow-hidden text-white"
            style={{
                width: collapsed ? 64 : 240,
                maxWidth: '100%',
                background: TEAL_DARK,
                transition: 'width 300ms ease',
            }}
        >
            <div className={`flex items-center gap-3 px-3 py-4 ${collapsed ? 'justify-center' : ''}`}>
                <img
                    src="/images/logo.jpg"
                    alt="LAYYA"
                    className="h-9 w-9 shrink-0 rounded-lg bg-white object-contain"
                />
                {!collapsed ? (
                    <div className="min-w-0">
                        <p className="truncate text-[14px] font-bold leading-tight text-white">LAYYA Admin</p>
                        <p className="truncate text-[10px]" style={{ color: 'rgba(125, 212, 212, 0.5)' }}>
                            Management Panel
                        </p>
                    </div>
                ) : null}
            </div>

            <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2">
                {items.map((item) => {
                    const active = isActive(item.match, url);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            title={item.title}
                            onClick={() => onNavigate?.()}
                            className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium ${collapsed ? 'justify-center' : ''}`}
                            style={{
                                background: active ? 'rgba(255,255,255,0.14)' : 'transparent',
                                color: active ? '#fff' : 'rgba(255,255,255,0.58)',
                                transition: 'background-color 150ms ease, color 150ms ease',
                            }}
                            onMouseEnter={(e) => {
                                if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = active ? 'rgba(255,255,255,0.14)' : 'transparent';
                            }}
                        >
                            <Icon className="h-[17px] w-[17px] shrink-0" />
                            {!collapsed ? <span className="min-w-0 flex-1 truncate">{item.title}</span> : null}
                            {!collapsed && item.badge > 0 ? (
                                <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: '#e53935' }}>
                                    {item.badge}
                                </span>
                            ) : null}
                            {collapsed && item.badge > 0 ? (
                                <span className="absolute ml-6 mt-[-18px] h-2 w-2 rounded-full" style={{ background: '#e53935' }} />
                            ) : null}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto px-2 pb-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {!collapsed ? (
                    <div className="mb-2 rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <p className="truncate text-sm font-semibold text-white">{user?.name || 'Executive'}</p>
                        <p className="truncate text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            {user?.email || ''}
                        </p>
                    </div>
                ) : null}
                <button
                    type="button"
                    onClick={() => router.post(route('logout'))}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm ${collapsed ? 'text-center' : ''}`}
                    style={{ color: 'rgba(255,255,255,0.45)', transition: 'color 150ms ease' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                    }}
                >
                    {collapsed ? <LogOut className="mx-auto h-4 w-4" /> : 'Sign Out'}
                </button>
            </div>
        </aside>
    );
}
