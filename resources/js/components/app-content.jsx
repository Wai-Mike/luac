import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppContent({ variant = 'header', children, className, ...props }) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset
                {...props}
                className={cn(
                    'flex flex-col bg-gradient-to-b from-neutral-50/90 via-background to-orange-500/[0.04]',
                    'dark:from-zinc-950 dark:via-background dark:to-orange-950/20',
                    className,
                )}
            >
                {children}
            </SidebarInset>
        );
    }

    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            {children}
        </main>
    );
}
