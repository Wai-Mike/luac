import { Mail, MapPin, Phone, Users } from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from './FadeIn';
import SectionLabel from './SectionLabel';

export default function ContactCTA() {
    const { contact } = useSiteContent();
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const rows = [
        { icon: MapPin, label: 'Location', value: contact.address },
        { icon: Phone, label: 'Phone', value: contact.phone },
        { icon: Mail, label: 'Email', value: contact.email },
        { icon: Users, label: 'Hours', value: contact.hours },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    const sent = recentlySuccessful || Boolean(flash.success);

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                <FadeIn>
                    <SectionLabel>Get involved</SectionLabel>
                    <h2>
                        There is a place
                        <br />
                        for you
                    </h2>
                    <p className="mt-4 text-[16px] leading-relaxed text-brand-muted">
                        Membership, volunteering, donations, and partnerships — tell us how you want to walk with LAYYA.
                    </p>
                    <ul className="mt-8 space-y-4">
                        {rows.map((row) => (
                            <li key={row.label} className="flex items-start gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                    <row.icon className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-brand-ink">{row.label}</p>
                                    <p className="text-sm text-brand-muted">{row.value}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </FadeIn>
                <FadeIn delay={0.08}>
                    <div className="rounded-3xl bg-brand-soft p-6 md:p-8">
                        {sent ? (
                            <div className="py-10 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-white">✓</div>
                                <h3 className="font-display text-2xl">Message sent!</h3>
                                <p className="mt-2 text-sm text-brand-muted">
                                    {flash.success || 'LAYYA has received your message and will get back to you.'}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="field-label" htmlFor="contact-name">
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        required
                                        className="field-input"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
                                </div>
                                <div>
                                    <label className="field-label" htmlFor="contact-email">
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        required
                                        type="email"
                                        className="field-input"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
                                </div>
                                <div>
                                    <label className="field-label" htmlFor="contact-subject">
                                        Interest
                                    </label>
                                    <input
                                        id="contact-subject"
                                        className="field-input"
                                        placeholder="Membership, volunteering…"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="field-label" htmlFor="contact-message">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        rows={5}
                                        className="field-input resize-y"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                    />
                                    {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message}</p> : null}
                                </div>
                                <button type="submit" className="btn btn-primary w-full" disabled={processing}>
                                    {processing ? 'Sending…' : 'Send message'}
                                </button>
                            </form>
                        )}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
