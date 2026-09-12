import { usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import GuestButton from '@/components/GuestButton';

export default function GuestNavbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { auth, url } = usePage().props;
    const user = auth?.user;
    const path = typeof window !== 'undefined' ? window.location.pathname : url || '/';

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
    }, []);

    useEffect(() => {
        document.body.classList.toggle('mobile-menu-open', open);
        return () => document.body.classList.remove('mobile-menu-open');
    }, [open]);

    const linkClass = (active) =>
        `inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-2.5 text-[12px] font-medium leading-none transition duration-150 ${
            active ? 'bg-white/15 text-white' : 'text-white/72 hover:bg-white/10 hover:text-white'
        }`;

    return (
        <header className={`fixed inset-x-0 top-0 z-50 bg-brand transition-[box-shadow] duration-150 ${scrolled ? 'shadow-[0_8px_24px_rgba(0,0,0,0.18)]' : ''}`}>
            <div className="flex h-16 w-full flex-nowrap items-center gap-3 px-4 sm:px-6 lg:px-8">
                <BrandLogo href={route('home')} showWordmark={false} />

                <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 lg:flex">
                    {links.map(([href, label, active]) => (
                        <a key={href} href={href} className={linkClass(active)}>
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="ml-auto hidden shrink-0 items-center lg:flex">
                    <GuestButton href={user ? route('dashboard') : route('login')} variant="ghost" className="min-h-9 px-4 text-[13px]">
                        {user ? 'Dashboard' : 'Executive login'}
                    </GuestButton>
                </div>

                <button type="button" className="ml-auto text-white lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {open ? (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close menu" onClick={() => setOpen(false)} />
                    <aside className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col bg-brand px-5 py-6 transition-transform duration-300 ease-out">
                        <div className="mb-6 flex items-center justify-between">
                            <BrandLogo href={route('home')} showWordmark={false} />
                            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-white">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            {links.map(([href, label, active]) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    className={`rounded-full px-4 py-3 text-[15px] font-medium ${active ? 'bg-white/15 text-white' : 'text-white/72'}`}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <GuestButton href={user ? route('dashboard') : route('login')} variant="ghost" className="w-full">
                                {user ? 'Dashboard' : 'Executive login'}
                            </GuestButton>
                        </div>
                    </aside>
                </div>
            ) : null}
        </header>
    );
}
