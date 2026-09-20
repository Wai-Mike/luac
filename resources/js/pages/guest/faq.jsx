import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import GuestLayout from '@/layouts/GuestLayout';
import useSiteContent from '@/hooks/useSiteContent';
import PageHero from './components/PageHero';

export default function Faq() {
    const { faqs } = useSiteContent();
    const [open, setOpen] = useState(0);

    return (
        <GuestLayout title="FAQ">
            <PageHero label="FAQ" title="Questions" italic="we hear often" />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-3xl space-y-3 px-4 sm:px-6">
                    {faqs.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <button
                                key={item.q}
                                type="button"
                                onClick={() => setOpen(isOpen ? -1 : i)}
                                className={`w-full rounded-2xl border bg-white p-5 text-left transition-colors ${
                                    isOpen ? 'border-brand/30 shadow-[0_8px_24px_-16px_rgba(0,77,77,0.35)]' : 'border-brand/10'
                                }`}
                            >
                                <span className="flex items-center justify-between gap-4">
                                    <p className="font-semibold text-brand-ink">{item.q}</p>
                                    <span
                                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                                            isOpen ? 'bg-amber text-brand-ink' : 'bg-brand-soft text-brand'
                                        }`}
                                    >
                                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                                    </span>
                                </span>
                                {isOpen ? <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.a}</p> : null}
                            </button>
                        );
                    })}
                </div>
            </section>
        </GuestLayout>
    );
}
