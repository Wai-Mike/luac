import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { cn } from '@/lib/utils';

/** Inertia app shell: sidebar, sticky header with breadcrumbs, padded main column. Pass `contentClassName` for full-bleed layouts. */
export default function AppLayout({ children, breadcrumbs = [], contentClassName }) {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs} contentClassName={cn('motion-safe:scroll-smooth', contentClassName)}>
            {children}
        </AppSidebarLayout>
    );
}
