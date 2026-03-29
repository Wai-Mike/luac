import { Link } from '@inertiajs/react';

export default function GuestFooter() {
    return (
        <footer className="bg-gray-900 py-12 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center">
                            <img src="/images/logo.jpg" alt="Luac Akok Yieu Youth Association" className="mr-3 h-8 w-8 rounded-full" />
                            <h3 className="text-lg font-semibold">Luac Akok Yieu Youth Association</h3>
                        </div>
                        <p className="text-gray-400">
                            Empowering youth in Luac Akok Yieu through leadership, skills development, and community action.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Quick links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href={route('services')} className="hover:text-white">
                                    Programs
                                </Link>
                            </li>
                            <li>
                                <Link href={route('youth-census.register')} className="hover:text-white">
                                    Youth census
                                </Link>
                            </li>
                            <li>
                                <Link href={route('faq')} className="hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href={route('reports')} className="hover:text-white">
                                    Reports & updates
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">About</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href={route('about')} className="hover:text-white">
                                    About LAYYA
                                </Link>
                            </li>
                            <li>
                                <Link href={route('team')} className="hover:text-white">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href={route('contact')} className="hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="mailto:layya.youth@gmail.com" className="hover:text-white">
                                    layya.youth@gmail.com
                                </a>
                            </li>
                            <li>
                                <span className="text-gray-500">Phone: 0927 779 952</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Luac Akok Yieu Youth Association (LAYYA). All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
