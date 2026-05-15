import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

export function NavUser({ className }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isMobile = useIsMobile();
    const { state } = useSidebar();

    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        'flex max-w-[13.5rem] items-center gap-1.5 rounded-xl border px-2 py-1.5 text-sm shadow-sm outline-none transition',
                        'border-neutral-200/90 bg-neutral-50/85 text-neutral-800',
                        'hover:border-neutral-300 hover:bg-white',
                        'focus-visible:border-[rgb(29,84,114)]/40 focus-visible:ring-[3px] focus-visible:ring-[rgb(29,84,114)]/20',
                        'dark:border-white/12 dark:bg-white/[0.06] dark:text-neutral-100 dark:hover:border-white/18 dark:hover:bg-white/[0.1]',
                        'sm:max-w-[16rem]',
                        className,
                    )}
                >
                    <UserInfo user={user} />
                    <ChevronsUpDown className="ml-0.5 size-4 shrink-0 opacity-50" aria-hidden />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="z-50 w-[min(var(--radix-dropdown-menu-trigger-width),18rem)] min-w-56 rounded-xl border border-neutral-200/90 bg-white/95 p-1 shadow-lg backdrop-blur-md dark:border-neutral-700 dark:bg-zinc-950/95"
                align="end"
                sideOffset={6}
                side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
            >
                <UserMenuContent user={user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
