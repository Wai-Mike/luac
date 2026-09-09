import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppSidebarHeader({ breadcrumbs = [] }) {
    return (
        <header
            className={cn(
                'sticky top-0 z-40 shrink-0 border-b transition-[height] duration-200 ease-out',
                'border-brand/10 bg-white/80 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/70',
                'shadow-[0_9px_30px_-12px_rgba(0,56,56,0.12)]',
                'flex h-[3.25rem] items-stretch group-has-data-[collapsible=icon]/sidebar-wrapper:h-11 md:h-14 md:group-has-data-[collapsible=icon]/sidebar-wrapper:h-[3rem]',
            )}
        >
            <div className="hidden shrink-0 self-stretch w-1 rounded-br md:block" aria-hidden>
                <div className="h-full w-full bg-gradient-to-b from-amber via-cream to-brand" />
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 items-center gap-3 px-3 py-2 sm:gap-4 sm:px-4 lg:px-8 lg:py-0">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <SidebarTrigger
                        className={cn(
                            'relative h-9 w-9 shrink-0 rounded-lg text-brand transition-colors outline-none md:h-10 md:w-10',
                            'hover:bg-brand-soft hover:text-brand-dark',
                            'focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                        )}
                        aria-label="Toggle navigation"
                    />
                    <div
                        className={cn(
                            'min-h-[1.25rem] min-w-0 pb-px',
                            breadcrumbs.length > 0 && 'border-l border-brand/15 pl-3',
                        )}
                    >
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>

                <div className="shrink-0 border-l border-brand/10 pl-2 sm:pl-3">
                    <NavUser />
                </div>
            </div>
        </header>
    );
}
