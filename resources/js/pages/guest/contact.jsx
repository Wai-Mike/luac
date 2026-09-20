import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import useSiteContent from '@/hooks/useSiteContent';
import ContactForm from './components/ContactForm';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';

const INTERESTS = ['Membership', 'Volunteering', 'Partnership', 'Press', 'Donation', 'Other'];

export default function Contact() {
    const { contact } = useSiteContent();
    const phone = contact.phone || '0927 779 952';
    const address = contact.address || 'Juba, South Sudan';
    const email = 'info@luac-akook-yieu.org';
    const altEmail = contact.email && contact.email !== email ? contact.email : null;
    const whatsappHref = 'https://wa.me/211927779952';

    const methods = [
        { icon: Phone, label: 'Phone', value: phone, href: 'tel:+211927779952' },
        { icon: WhatsAppIcon, label: 'WhatsApp', value: phone, href: whatsappHref, external: true },
        { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
        { icon: MapPin, label: 'Location', value: address },
    ];

    return (
        <GuestLayout title="Contact">
            <PageHero
                label="Contact"
                title="Let’s build together"
                subtitle="Programs, partnerships, and press — we will respond within 24 hours."
            />

            <section className="border-b border-brand/10 bg-white py-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8">
                    <a href="#message" className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white">
                        Send a message
                    </a>
                    <a href="#details" className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white">
                        Contact details
                    </a>
                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
                    >
                        WhatsApp
                    </a>
                </div>
            </section>

            <section id="details" className="scroll-mt-24 bg-brand-soft py-10 md:py-12">
                <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                    {methods.map((method) => {
                        const inner = (
                            <>
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand">
                                    <method.icon className="h-4 w-4" />
                                </span>
                                <p className="mt-3 text-xs font-semibold text-brand">{method.label}</p>
                                <p className="mt-1 break-all text-sm font-semibold text-brand-ink">{method.value}</p>
                            </>
                        );

                        if (method.href) {
                            return (
                                <a
                                    key={method.label}
                                    href={method.href}
                                    className="rounded-2xl bg-white p-5 transition hover:-translate-y-0.5"
                                    {...(method.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                >
                                    {inner}
                                </a>
                            );
                        }

                        return (
                            <div key={method.label} className="rounded-2xl bg-white p-5">
                                {inner}
                            </div>
                        );
                    })}
                </div>
            </section>

            <section id="message" className="scroll-mt-24 bg-white py-12 md:py-16">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-14 lg:px-8">
                    <FadeIn className="lg:col-span-3">
                        <h2>Send a message</h2>
                        <p className="mt-2 mb-6 max-w-xl text-sm text-brand-muted">
                            Tell us how you want to walk with LAYYA. Membership, volunteering, donations, and partnerships all start here.
                        </p>
                        <ContactForm interestOptions={INTERESTS} />
                    </FadeIn>
                    <FadeIn delay={0.08} className="lg:col-span-2">
                        <div className="rounded-2xl bg-brand-dark p-6 text-white md:p-8">
                            <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber">
                                <Clock className="h-4 w-4" aria-hidden="true" />
                                Response time
                            </p>
                            <p className="mt-3 text-lg font-semibold">{contact.hours || 'We will respond within 24 hours'}</p>
                            <p className="mt-3 text-sm text-white/65">
                                {address}. Alternate email {altEmail ? `${altEmail}.` : 'layya.youth@gmail.com.'}
                            </p>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber px-5 text-sm font-semibold text-brand-ink hover:bg-white"
                            >
                                <WhatsAppIcon className="h-4 w-4" />
                                WhatsApp {phone}
                            </a>
                            <GuestButton href={route('faq')} variant="ghost" className="mt-3 w-full">
                                Read FAQs
                            </GuestButton>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section className="bg-brand-dark py-10 md:py-14">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>
                        <h2 className="text-white">Prefer to join the work first?</h2>
                        <p className="mt-2 max-w-xl text-sm text-white/70">Register in the youth census or support a program with a gift.</p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <GuestButton href={route('youth-census.register')} variant="amber">
                            Youth census
                        </GuestButton>
                        <GuestButton href={route('get-involved')} variant="ghost">
                            Get involved
                        </GuestButton>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
