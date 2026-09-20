import BrandLogo from '@/components/BrandLogo';
import useSiteContent from '@/hooks/useSiteContent';
import { Link } from '@inertiajs/react';

function FooterLink({ href, children }) {
    return (
        <li>
            <Link href={href} className="text-white/60 transition hover:text-white">
                {children}
            </Link>
        </li>
    );
}

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
                    <h4 className="mb-4 text-sm font-semibold text-white">Explore</h4>
                    <ul className="space-y-2.5 text-sm">
                        <FooterLink href={route('programs')}>Programs</FooterLink>
                        <FooterLink href={route('youth-census.register')}>Youth census</FooterLink>
                        <FooterLink href={route('gallery')}>Gallery</FooterLink>
                        <FooterLink href={route('videos')}>Community videos</FooterLink>
                        <FooterLink href={route('tawus-hub')}>Tawus Hub</FooterLink>
                        <FooterLink href={route('fundraising')}>Fundraising</FooterLink>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-sm font-semibold text-white">Organisation</h4>
                    <ul className="space-y-2.5 text-sm">
                        <FooterLink href={route('about')}>About LAYYA</FooterLink>
                        <FooterLink href={route('team')}>Leadership</FooterLink>
                        <FooterLink href={route('news')}>News</FooterLink>
                        <FooterLink href={route('contact')}>Contact</FooterLink>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
                    <ul className="space-y-2.5 break-words text-sm text-white/60">
                        <li>
                            <a href="mailto:info@luac-akook-yieu.org" className="break-all hover:text-white">
                                info@luac-akook-yieu.org
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${contact.email || 'layya.youth@gmail.com'}`} className="break-all hover:text-white">
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
