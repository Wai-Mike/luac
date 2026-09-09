import { useState } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import PageHero from './components/PageHero';

const faqs = [
    {
        q: 'Who can join LAYYA?',
        a: 'Luac youth aged 18–45 may apply. Women have the right to take part in all leadership. LAYYA is a non-political association.',
    },
    {
        q: 'What is the Youth Census?',
        a: 'A short registration that helps us understand skills, interests, and barriers so we can design better programs. Individual records stay with authorized staff.',
    },
    {
        q: 'What is Tawus Hub?',
        a: 'A girls-centred space for vocational skills, mentorship, wellbeing, and Tawus Day — our annual cultural celebration.',
    },
    {
        q: 'How can I donate?',
        a: 'Visit the Fundraising page, choose a program, and fill in your name, phone, amount in South Sudanese pounds or US dollars, and how you are paying.',
    },
    {
        q: 'How do I volunteer or partner?',
        a: 'Use the contact form and select Volunteering or Partnership. We will follow up with next steps.',
    },
];

export default function Faq() {
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
