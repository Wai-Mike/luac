import { useState } from 'react';
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
                                className="w-full rounded-2xl border border-brand/10 bg-white p-5 text-left"
                            >
                                <p className="font-semibold text-brand-ink">{item.q}</p>
                                {isOpen ? <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.a}</p> : null}
                            </button>
                        );
                    })}
                </div>
            </section>
        </GuestLayout>
    );
}
