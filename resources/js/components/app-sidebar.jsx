import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
    useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Building2,
    ChevronRight,
    FileText,
    GraduationCap,
    Home,
    LayoutGrid,
    Settings,
    Store,
    Users,
} from 'lucide-react';

/** Maps department `slug` to Ziggy route name for `/departments/.../dashboard`. */
const DEPARTMENT_DASHBOARD_ROUTE = {
    'executive-office': 'departments.executive-office.dashboard',
    'finance-administration': 'departments.finance-administration.dashboard',
    'ict-information': 'departments.ict-information.dashboard',
    'programs-welfare': 'departments.programs-welfare.dashboard',
    'external-legal-affairs': 'departments.external-legal-affairs.dashboard',
};

function normalizePath(routeUrl, inertiaUrl) {
    try {
        const path = typeof routeUrl === 'string' && routeUrl.startsWith('http') ? new URL(routeUrl).pathname : routeUrl.split('?')[0];
        const p = path.replace(/\/$/, '') || '/';
        const c = inertiaUrl.replace(/\/$/, '') || '/';
        return c === p || c.startsWith(`${p}/`);
    } catch {
        return false;
    }
}

function getSidebarPlan(user, permissions) {
    if (!user) {
        return {
            variant: 'guest',
            dashboardGroup: null,
            generalFlat: [{ title: 'Home', url: route('home'), icon: Home }],
            managementFlat: [],
        };
    }

    const canViewAdmin = permissions.includes('view_dashboard');
    const canManageDepartments = permissions.includes('manage_departments');

    if (!canViewAdmin) {
        return {
            variant: 'member',
            dashboardGroup: null,
            generalFlat: [
                { title: 'Dashboard', url: route('user.dashboard'), icon: LayoutGrid },
                { title: 'Profile', url: route('user.profile'), icon: Users },
            ],
            managementFlat: [],
        };
    }

    const deptSlug = user.department?.slug;
    const deptRouteName = deptSlug ? DEPARTMENT_DASHBOARD_ROUTE[deptSlug] : null;

    const dashboardChildren = [
        { title: 'Overview', url: route('admin.dashboard'), icon: LayoutGrid },
        { title: 'Analytics', url: route('admin.analytics.index'), icon: BarChart3 },
        ...(deptRouteName
            ? [{ title: user.department?.name || 'Department', url: route(deptRouteName), icon: Building2 }]
            : []),
    ];

    return {
        variant: 'admin',
        dashboardGroup: { title: 'Dashboard', icon: LayoutGrid, children: dashboardChildren },
        generalFlat: [
            {
                title: 'Comments',
                url: route('admin.content.comments'),
                icon: FileText,
                badge: null,
            },
            {
                title: 'Youth census',
                url: route('admin.youth-members.index'),
                icon: GraduationCap,
            },
        ],
        managementFlat: [
            { title: 'Users', url: route('admin.users'), icon: Users },
            ...(canManageDepartments ? [{ title: 'Departments', url: route('admin.departments.index'), icon: Store }] : []),
            { title: 'Settings', url: route('admin.settings'), icon: Settings },
        ],
    };
}

function DashboardNavSection({ dashboardGroup, currentUrl }) {
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const collapsed = state === 'collapsed' && !isMobile;

    if (!dashboardGroup) {
        return null;
    }

    const filteredChildren = dashboardGroup.children;

    const anyActive = filteredChildren.some((c) => normalizePath(c.url, currentUrl));
    const dashOpenMatch = dashboardGroup.children.some((c) => normalizePath(c.url, currentUrl));

    if (collapsed) {
        if (filteredChildren.length === 0) {
            return null;
        }
        return (
            <SidebarMenu>
                {filteredChildren.map((child) => (
                    <SidebarMenuItem key={child.title}>
                        <SidebarMenuButton
                            asChild
                            tooltip={child.title}
                            isActive={normalizePath(child.url, currentUrl)}
                            className="rounded-lg transition-colors [&>svg]:text-[rgb(29,84,114)] dark:[&>svg]:text-sky-300"
                        >
                            <Link href={child.url} prefetch>
                                <child.icon />
                                <span>{child.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        );
    }

    if (filteredChildren.length === 0) {
        return null;
    }

    return (
        <SidebarMenu>
            <Collapsible asChild defaultOpen={dashOpenMatch} className="group/collapse">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            tooltip={dashboardGroup.title}
                            className={`rounded-lg [&>svg]:text-[rgb(29,84,114)] dark:[&>svg]:text-sky-300 ${anyActive ? 'bg-sidebar-accent/90 font-semibold shadow-sm ring-1 ring-[rgb(29,84,114)]/12 dark:bg-white/10 dark:ring-white/15' : ''}`}
                            isActive={anyActive}
                        >
                            <dashboardGroup.icon />
                            <span>{dashboardGroup.title}</span>
                            <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapse:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub className="ml-3 border-[rgb(29,84,114)]/20 dark:border-white/15">
                            {filteredChildren.map((child) => (
                                <SidebarMenuSubItem key={child.title}>
                                    <SidebarMenuSubButton asChild isActive={normalizePath(child.url, currentUrl)}>
                                        <Link href={child.url} prefetch>
                                            <child.icon />
                                            <span>{child.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    );
}

function FlatNavLinks({ items, currentUrl }) {
    const filtered = items;
    if (filtered.length === 0) {
        return null;
    }
    return (
        <SidebarMenu>
            {filtered.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className="rounded-lg [&>svg]:text-[rgb(29,84,114)] dark:[&>svg]:text-sky-300"
                        isActive={normalizePath(item.url, currentUrl)}
                    >
                        <Link href={item.url} prefetch>
                            <item.icon />
                            <span>{item.title}</span>
                            {item.badge !== null && item.badge !== undefined && item.badge > 0 && (
                                <SidebarMenuBadge className="bg-orange-500/90 font-semibold text-white">{item.badge}</SidebarMenuBadge>
                            )}
                            {item.dot && <span className="absolute right-2 top-1/2 flex size-2 -translate-y-1/2 rounded-full bg-orange-500 ring-4 ring-transparent" />}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}


export function AppSidebar() {
    const page = usePage();
    const { auth } = page.props;
    const user = auth?.user ?? null;
    const permissions = auth?.permissions ?? [];

    const plan = getSidebarPlan(user, permissions);

    const effectiveDashboard = plan.dashboardGroup;
    const generalFlat = plan.generalFlat;
    const managementFlat = plan.managementFlat;
    const hasGeneral = effectiveDashboard != null || generalFlat.length > 0;
    const showManagementHeading = managementFlat.length > 0;

    const homeHref = user ? route('dashboard') : route('home');

    return (
        <Sidebar collapsible="icon" variant="sidebar" className="[--sidebar:transparent]">
            <div className="flex h-full min-h-0 w-full flex-col rounded-none border-0 bg-white/72 shadow-none ring-0 backdrop-blur-2xl dark:bg-zinc-950/55 [&_[data-sidebar=header]]:px-4 [&_[data-sidebar=footer]]:px-4 [&_[data-sidebar=content]]:gap-4 [&_[data-sidebar=content]]:px-4">
                <SidebarHeader className="gap-2 pb-2 pt-4">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                asChild
                                tooltip="LAYYA"
                                className="rounded-xl border border-white/25 bg-white/35 shadow-sm backdrop-blur-sm hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/12"
                            >
                                <Link href={homeHref} prefetch>
                                    <img
                                        src="/images/logo.jpg"
                                        alt="LAYYA"
                                        className="size-10 shrink-0 rounded-full object-cover ring-2 ring-white/40 shadow-sm dark:ring-white/15"
                                    />
                                    <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                        <span className="truncate font-bold tracking-tight text-sidebar-foreground">LAYYA</span>
                                        <span className="truncate text-[11px] font-medium uppercase tracking-wide text-sidebar-foreground/65">
                                            Luac Akok Yieu Youth Association
                                        </span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent className="pb-4">
                    {hasGeneral && (
                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel className="mb-1 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/55">
                                General
                            </SidebarGroupLabel>
                            <DashboardNavSection dashboardGroup={effectiveDashboard} currentUrl={page.url} />
                            <FlatNavLinks items={generalFlat} currentUrl={page.url} />
                        </SidebarGroup>
                    )}

                    {showManagementHeading && (
                        <>
                            <SidebarSeparator className="my-1 bg-gradient-to-r from-transparent via-sidebar-border to-transparent opacity-80" />
                            <SidebarGroup className="p-0">
                                <SidebarGroupLabel className="mb-1 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/55">
                                    Management
                                </SidebarGroupLabel>
                                <FlatNavLinks items={managementFlat} currentUrl={page.url} />
                            </SidebarGroup>
                        </>
                    )}
                </SidebarContent>
            </div>
        </Sidebar>
    );
}
