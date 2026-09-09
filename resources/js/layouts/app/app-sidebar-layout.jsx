import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { cn } from '@/lib/utils';

export default function AppSidebarLayout({ children, breadcrumbs = [], contentClassName }) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="min-h-svh min-w-0 flex-1">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div
                    role="main"
                    className={cn(
                        'flex-1 overflow-x-hidden',
                        'px-4 pb-8 pt-5 sm:px-6 md:pb-10 md:pt-6 lg:px-8 lg:pb-12',
                        'bg-brand-soft',
                        contentClassName,
                    )}
                >
                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
