import { useForm, usePage } from '@inertiajs/react';
import { Send } from 'lucide-react';

export default function ContactForm({ interestOptions = [], submitLabel = 'Send message' }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: interestOptions[0] ?? '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset('name', 'email', 'phone', 'message'),
        });
    }

    if (recentlySuccessful || flash.success) {
        return (
            <div className="rounded-2xl bg-brand-soft p-6 text-center">
                <p className="font-semibold text-brand-ink">Message sent</p>
                <p className="mt-2 text-sm text-brand-muted">{flash.success || 'LAYYA has received your message.'}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="gf-name" className="mb-1.5 block text-sm font-medium text-brand-ink">
                        Full name
                    </label>
                    <input
                        id="gf-name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border border-brand/30 bg-white px-4 py-3 text-[16px] text-brand-ink outline-none focus:border-brand"
                        required
                    />
                    {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
                </div>
                <div>
                    <label htmlFor="gf-email" className="mb-1.5 block text-sm font-medium text-brand-ink">
                        Email
                    </label>
                    <input
                        id="gf-email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full border border-brand/30 bg-white px-4 py-3 text-[16px] text-brand-ink outline-none focus:border-brand"
                        required
                    />
                    {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
                </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="gf-phone" className="mb-1.5 block text-sm font-medium text-brand-ink">
                        Phone
                    </label>
                    <input
                        id="gf-phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full border border-brand/30 bg-white px-4 py-3 text-[16px] text-brand-ink outline-none focus:border-brand"
                    />
                </div>
                {interestOptions.length > 0 && (
                    <div>
                        <label htmlFor="gf-interest" className="mb-1.5 block text-sm font-medium text-brand-ink">
                            Interest area
                        </label>
                        <select
                            id="gf-interest"
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                            className="w-full border border-brand/30 bg-white px-4 py-3 text-[16px] text-brand-ink outline-none focus:border-brand"
                        >
                            {interestOptions.map((o) => (
                                <option key={o} value={o}>
                                    {o}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="gf-message" className="mb-1.5 block text-sm font-medium text-brand-ink">
                    Message
                </label>
                <textarea
                    id="gf-message"
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="w-full resize-y border border-brand/30 bg-white px-4 py-3 text-[16px] text-brand-ink outline-none focus:border-brand"
                    required
                />
                {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message}</p> : null}
            </div>
            <button type="submit" className="btn btn-primary w-full gap-2 sm:w-auto" disabled={processing}>
                <Send className="h-4 w-4" />
                {processing ? 'Sending…' : submitLabel}
            </button>
        </form>
    );
}
