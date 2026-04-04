import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function GuestNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage().props;

    return (
        <div className="sticky top-0 z-50">
            {/* Top bar — navy from logo lettering (RK / 3K-style strip) */}
            <div className="bg-navy py-2.5 text-slate-300">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                        <a href="tel:+211927779952" className="flex items-center gap-2 transition-colors hover:text-white">
                            <svg className="h-4 w-4 shrink-0 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            <span>0927 779 952</span>
                        </a>
                        <a href="mailto:layya.youth@gmail.com" className="hidden items-center gap-2 sm:flex transition-colors hover:text-white">
                            <svg className="h-4 w-4 shrink-0 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="max-w-[200px] truncate sm:max-w-none">layya.youth@gmail.com</span>
                        </a>
                    </div>
                    <div className="hidden items-center gap-3 lg:flex">
                        <a href="#" className="transition-colors hover:text-white" aria-label="Facebook">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="#" className="transition-colors hover:text-white" aria-label="LinkedIn">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <nav className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between lg:h-16">
                        <a href={route('home')} className="flex min-w-0 items-center gap-3">
                            <img src="/images/logo.jpg" alt="LAYYA" className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200" />
                            <div className="min-w-0 text-left">
                                <p className="truncate text-lg font-bold tracking-tight text-navy">LAYYA</p>
                                <p className="hidden truncate text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:block">
                                    Luac Akok Yieu Youth Association
                                </p>
                            </div>
                        </a>

                        <div className="hidden items-center gap-5 lg:gap-6 lg:flex">
                            <a href={route('home')} className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                Home
                            </a>
                            <a href={route('about')} className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                About
                            </a>
                            <a href={route('services')} className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                Programs
                            </a>
                            <a href={route('youth-census.register')} className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                Youth Census
                            </a>
                            <a href={route('tawus-hub')} className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                Tawus Hub
                            </a>
                            <a href={route('reports')} className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                Reports
                            </a>
                            <a href="/strategic-plan" className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                10-Year Plan
                            </a>
                            <a href={route('contact')} className="text-sm font-medium text-slate-700 transition-colors hover:text-brand">
                                Contact
                            </a>
                            <a
                                href={route('contact')}
                                className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
                            >
                                Get in touch
                            </a>
                            {auth.user && (
                                <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                                    <img
                                        src={auth.user.avatar || '/images/default-avatar.png'}
                                        alt=""
                                        className="h-8 w-8 rounded-full border border-slate-200"
                                    />
                                    <Link
                                        href={route('user.dashboard')}
                                        className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="lg:hidden">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-navy hover:bg-slate-50"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="border-t border-slate-100 py-3 lg:hidden">
                            <div className="flex flex-col gap-0.5">
                                {[
                                    ['Home', route('home')],
                                    ['About LAYYA', route('about')],
                                    ['Programs', route('services')],
                                    ['Youth Census', route('youth-census.register')],
                                    ['Tawus Hub', route('tawus-hub')],
                                    ['Reports', route('reports')],
                                    ['10-Year Plan', '/strategic-plan'],
                                    ['Contact', route('contact')],
                                ].map(([label, href]) => (
                                    <a
                                        key={href}
                                        href={href}
                                        className="rounded-md px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-brand-surface"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </a>
                                ))}
                                <a
                                    href={route('contact')}
                                    className="mx-1 mt-2 rounded-md bg-brand py-3 text-center text-base font-semibold text-white hover:bg-brand-dark"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get in touch
                                </a>
                                {auth.user && (
                                    <>
                                        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 px-3 pt-3">
                                            <img src={auth.user.avatar || '/images/default-avatar.png'} alt="" className="h-8 w-8 rounded-full" />
                                            <span className="text-sm font-medium text-navy">{auth.user.name}</span>
                                        </div>
                                        <Link
                                            href={route('user.dashboard')}
                                            className="mx-1 mt-1 rounded-md bg-brand py-3 text-center text-base font-semibold text-white hover:bg-brand-dark"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
