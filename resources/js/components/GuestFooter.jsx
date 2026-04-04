import { Link } from '@inertiajs/react';

export default function GuestFooter() {
    return (
        <footer className="bg-navy py-12 text-slate-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <img
                                src="/images/logo.jpg"
                                alt="Luac Akok Yieu Youth Association"
                                className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-600"
                            />
                            <div>
                                <h3 className="text-base font-bold text-white">LAYYA</h3>
                                <p className="text-xs text-slate-400">Juba, South Sudan</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Youth-led association building skills, leadership, and community action in Luac Akok Yieu.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Quick links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={route('services')} className="transition-colors hover:text-brand-light">
                                    Programs
                                </Link>
                            </li>
                            <li>
                                <Link href={route('youth-census.register')} className="transition-colors hover:text-brand-light">
                                    Youth census
                                </Link>
                            </li>
                            <li>
                                <Link href={route('faq')} className="transition-colors hover:text-brand-light">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href={route('tawus-hub')} className="transition-colors hover:text-brand-light">
                                    Tawus Hub
                                </Link>
                            </li>
                            <li>
                                <Link href={route('reports')} className="transition-colors hover:text-brand-light">
                                    Reports & updates
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">About</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={route('about')} className="transition-colors hover:text-brand-light">
                                    About LAYYA
                                </Link>
                            </li>
                            <li>
                                <Link href={route('team')} className="transition-colors hover:text-brand-light">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href={route('contact')} className="transition-colors hover:text-brand-light">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="mailto:layya.youth@gmail.com" className="transition-colors hover:text-brand-light">
                                    layya.youth@gmail.com
                                </a>
                            </li>
                            <li>
                                <span className="text-slate-400">Phone: 0927 779 952</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Luac Akok Yieu Youth Association (LAYYA). All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
