import { usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import GuestButton from '@/components/GuestButton';

function currentPath(url) {
    return (url || '/').split('?')[0];
}

export default function GuestNavbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const page = usePage();
    const user = page.props.auth?.user;
    const path = currentPath(page.url);
    const overlay = !scrolled && !open;

    const links = [
        [route('home'), 'Home', path === '/'],
        [route('about'), 'About', path.startsWith('/about')],
        [route('programs'), 'Programs', path.startsWith('/programs')],
        [route('youth-census.register'), 'Youth Census', path.startsWith('/youth-census')],
        [route('tawus-hub'), 'Tawus Hub', path.startsWith('/tawus')],
        [route('gallery'), 'Gallery', path.startsWith('/gallery')],
        [route('fundraising'), 'Fundraising', path.startsWith('/fundraising')],
        [route('team'), 'Leadership', path.startsWith('/team')],
        [route('videos'), 'Videos', path.startsWith('/videos')],
        [route('contact'), 'Contact', path.startsWith('/contact')],
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [path]);

    useEffect(() => {
        document.body.classList.toggle('mobile-menu-open', open);
        return () => document.body.classList.remove('mobile-menu-open');
    }, [open]);

    const linkClass = (active) => {
        if (overlay) {
            return `inline-flex h-8 shrink-0 items-center whitespace-nowrap px-2.5 text-[12px] font-medium leading-none transition duration-150 ${
                active ? 'text-white' : 'text-white/70 hover:text-white'
            }`;
        }
        return `inline-flex h-8 shrink-0 items-center whitespace-nowrap px-2.5 text-[12px] font-medium leading-none transition duration-150 ${
            active ? 'text-brand' : 'text-brand-ink/65 hover:text-brand-ink'
        }`;
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-200 ${
                overlay
                    ? 'border-b border-transparent bg-gradient-to-b from-brand-ink/55 to-transparent'
                    : `border-b border-brand-soft bg-white ${scrolled ? 'shadow-[0_8px_24px_rgba(12,31,31,0.08)]' : ''}`
            }`}
        >
            <div className="flex h-16 w-full flex-nowrap items-center gap-3 px-3 sm:px-6 lg:px-8">
                <BrandLogo href={route('home')} light={overlay} />

                <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 lg:flex">
                    {links.map(([href, label, active]) => (
                        <a key={href} href={href} className={linkClass(active)}>
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
                    <GuestButton
                        href={user ? route('dashboard') : route('login')}
                        variant={overlay ? 'ghost' : 'outline'}
                        className="min-h-9 px-4 text-[13px]"
                    >
                        {user ? 'Dashboard' : 'Executive login'}
                    </GuestButton>
                    <GuestButton href={route('get-involved')} variant="amber" className="min-h-9 px-5 text-[13px]">
                        Get involved
                    </GuestButton>
                </div>

                <button
                    type="button"
                    className={`ml-auto inline-flex h-11 w-11 items-center justify-center lg:hidden ${overlay ? 'text-white' : 'text-brand-ink'}`}
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {open ? (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button type="button" className="absolute inset-0 bg-brand-ink/40" aria-label="Close menu" onClick={() => setOpen(false)} />
                    <aside className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col overflow-y-auto bg-white px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ease-out">
                        <div className="mb-6 flex items-center justify-between">
                            <BrandLogo href={route('home')} light={false} />
                            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center text-brand-ink">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex min-h-0 flex-1 flex-col gap-1">
                            {links.map(([href, label, active]) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    className={`rounded-full px-4 py-3 text-[15px] font-medium ${active ? 'bg-brand text-white' : 'text-brand-ink/70'}`}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <GuestButton href={user ? route('dashboard') : route('login')} variant="outline" className="w-full">
                                {user ? 'Dashboard' : 'Executive login'}
                            </GuestButton>
                            <GuestButton href={route('get-involved')} variant="amber" className="w-full">
                                Get involved
                            </GuestButton>
                        </div>
                    </aside>
                </div>
            ) : null}
        </header>
    );
}
