import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppSidebarHeader({ breadcrumbs = [] }) {
    return (
        <header
            className={cn(
                'sticky top-0 z-40 shrink-0 border-b transition-[height] duration-200 ease-out',
                'border-neutral-200/90 bg-white/78 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/65 dark:border-neutral-700/85 dark:bg-zinc-950/78 dark:supports-[backdrop-filter]:bg-zinc-950/65',
                'shadow-[0_9px_30px_-12px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)]',
                'flex h-[3.25rem] items-stretch group-has-data-[collapsible=icon]/sidebar-wrapper:h-11 md:h-14 md:group-has-data-[collapsible=icon]/sidebar-wrapper:h-[3rem]',
            )}
        >
            <div className="hidden shrink-0 self-stretch w-1 rounded-br md:block" aria-hidden>
                <div className="h-full w-full bg-gradient-to-b from-[rgb(29,84,114)] via-[rgb(29,84,114)] to-[rgb(15,118,148)] opacity-95 dark:to-sky-600" />
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 items-center gap-3 px-3 py-2 sm:gap-4 sm:px-4 lg:px-8 lg:py-0">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <SidebarTrigger
                        className={cn(
                            'relative h-9 w-9 shrink-0 rounded-lg text-neutral-600 transition-colors outline-none md:h-10 md:w-10',
                            'hover:bg-neutral-100 hover:text-neutral-900',
                            'focus-visible:ring-2 focus-visible:ring-[rgb(29,84,114)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950',
                            'dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-white',
                        )}
                        aria-label="Toggle navigation"
                    />
                    <div
                        className={cn(
                            'min-h-[1.25rem] min-w-0 pb-px',
                            breadcrumbs.length > 0 && 'border-l border-neutral-200/90 pl-3 dark:border-neutral-600/60',
                        )}
                    >
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>

                <div className="shrink-0 border-l border-neutral-200/70 pl-2 dark:border-neutral-600/50 sm:pl-3">
                    <NavUser />
                </div>
            </div>
        </header>
    );
}
