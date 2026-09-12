import BrandLogo from '@/components/BrandLogo';
import useSiteContent from '@/hooks/useSiteContent';
import { Link } from '@inertiajs/react';

export default function GuestFooter() {
    const { contact } = useSiteContent();
    return (
        <footer className="bg-brand-dark text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
                <div>
                    <div className="mb-4">
                        <BrandLogo href={route('home')} />
                        <p className="mt-3 text-xs text-white/55">Together for a better future.</p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55">
                        Non-political youth association building unity and patriotic participation in Luac community.
                    </p>
                </div>
                <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber">Explore</h4>
                    <ul className="space-y-2 text-sm text-white/55">
                        <li><Link href={route('programs')} className="hover:text-white">Programs</Link></li>
                        <li><Link href={route('youth-census.register')} className="hover:text-white">Youth census</Link></li>
                        <li><Link href={route('gallery')} className="hover:text-white">Gallery</Link></li>
                        <li><Link href={route('videos')} className="hover:text-white">Community videos</Link></li>
                        <li><Link href={route('tawus-hub')} className="hover:text-white">Tawus Hub</Link></li>
                        <li><Link href={route('fundraising')} className="hover:text-white">Fundraising</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber">Organisation</h4>
                    <ul className="space-y-2 text-sm text-white/55">
                        <li><Link href={route('about')} className="hover:text-white">About LAYYA</Link></li>
                        <li><Link href={route('team')} className="hover:text-white">Leadership</Link></li>
                        <li><Link href={route('news')} className="hover:text-white">News</Link></li>
                        <li><Link href={route('contact')} className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber">Contact</h4>
                    <ul className="space-y-2 text-sm text-white/55">
                        <li>
                            <a href="mailto:info@luac-akook-yieu.org" className="hover:text-white">
                                info@luac-akook-yieu.org
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${contact.email || 'layya.youth@gmail.com'}`} className="hover:text-white">
                                {contact.email || 'layya.youth@gmail.com'}
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/211927779952" className="hover:text-white" target="_blank" rel="noreferrer">
                                WhatsApp {contact.phone || '0927 779 952'}
                            </a>
                        </li>
                        <li>Juba, South Sudan</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-5 text-xs text-white/35 sm:flex-row sm:px-6 lg:px-8">
                    <p>© {new Date().getFullYear()} Luac Akook Yieu Youth Association (LAYYA).</p>
                    <p>Juba, South Sudan</p>
                </div>
            </div>
        </footer>
    );
}
