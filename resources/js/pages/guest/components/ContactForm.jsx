import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm({ interestOptions = [], submitLabel = 'Send message' }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState(interestOptions[0] ?? '');
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.info('Contact form', { name, email, phone, interest, message });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="gf-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Full name
                    </label>
                    <input
                        id="gf-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gf-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email
                    </label>
                    <input
                        id="gf-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                        required
                    />
                </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="gf-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Phone
                    </label>
                    <input
                        id="gf-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                    />
                </div>
                {interestOptions.length > 0 && (
                    <div>
                        <label htmlFor="gf-interest" className="mb-1.5 block text-sm font-medium text-slate-700">
                            Interest area
                        </label>
                        <select
                            id="gf-interest"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
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
                <label htmlFor="gf-message" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message
                </label>
                <textarea
                    id="gf-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                    required
                />
            </div>
            <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-base font-semibold text-white shadow-md transition hover:bg-teal-700 sm:w-auto"
            >
                <Send className="h-4 w-4" />
                {submitLabel}
            </button>
        </form>
    );
}
