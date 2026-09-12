import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';
import { SURFACE } from '@/lib/admin-theme';

export default function AdminLayout({ children, title = 'Dashboard', subtitle }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = SURFACE;
        document.body.style.backgroundColor = SURFACE;

        const stored = window.localStorage.getItem('layya-admin-sidebar');
        if (stored === 'collapsed') {
            setCollapsed(true);
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle('mobile-menu-open', mobileOpen);
        return () => document.body.classList.remove('mobile-menu-open');
    }, [mobileOpen]);

    const toggle = () => {
        if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
            setCollapsed((open) => {
                const next = !open;
                window.localStorage.setItem('layya-admin-sidebar', next ? 'collapsed' : 'expanded');
                return next;
            });
            return;
        }

        setMobileOpen((open) => !open);
    };

    return (
        <div className="flex h-screen h-dvh overflow-hidden" style={{ background: SURFACE, colorScheme: 'light' }}>
            <div className="hidden h-full lg:flex">
                <AdminSidebar collapsed={collapsed} />
            </div>

            {mobileOpen ? (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/40"
                        aria-label="Close menu"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute inset-y-0 left-0 h-full max-w-[min(16.5rem,85vw)] shadow-2xl">
                        <AdminSidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
                    </div>
                </div>
            ) : null}

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <AdminTopBar collapsed={collapsed} mobileOpen={mobileOpen} onToggle={toggle} title={title} subtitle={subtitle} />
                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-6 sm:py-6 lg:px-8">{children}</main>
            </div>
        </div>
    );
}
