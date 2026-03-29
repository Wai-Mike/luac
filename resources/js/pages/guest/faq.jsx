import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function GuestFAQ() {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (index) => {
        const next = new Set(openItems);
        if (next.has(index)) {
            next.delete(index);
        } else {
            next.add(index);
        }
        setOpenItems(next);
    };

    const faqCategories = [
        {
            title: 'About LAYYA',
            icon: '❓',
            items: [
                {
                    question: 'What is Luac Akok Yieu Youth Association (LAYYA)?',
                    answer:
                        'LAYYA is a youth-led association serving Luac Akok Yieu and surrounding communities. We focus on leadership, education, skills, sports and culture, and civic engagement so young people can grow, connect, and contribute.',
                },
                {
                    question: 'Who is this website for?',
                    answer:
                        'Members, volunteers, partners, and anyone who wants to learn about our programs, register for the youth census, or stay in touch. Creating an account lets you use the member area and keep your profile up to date.',
                },
                {
                    question: 'How do I get involved?',
                    answer:
                        'Explore our programs on the Services page, register for the youth census if it applies to you, or contact us through the Contact page. Follow our announcements for events and volunteering.',
                },
            ],
        },
        {
            title: 'Account & youth census',
            icon: '📋',
            items: [
                {
                    question: 'How do I create an account?',
                    answer:
                        'Use Register to sign up with your email. You will need to verify your email before using the full member dashboard.',
                },
                {
                    question: 'What is the youth census?',
                    answer:
                        'It is a registration form for youth in our network so we can understand needs, plan programs, and stay in contact. You can find it under Youth Census in the main menu.',
                },
                {
                    question: 'Who can I contact for help?',
                    answer:
                        'Email layya.youth@gmail.com or use the Contact page. We aim to respond as soon as we can.',
                },
            ],
        },
        {
            title: 'Privacy',
            icon: '🔒',
            items: [
                {
                    question: 'How is my information used?',
                    answer:
                        'We use account and form data to run programs, communicate with you, and improve our services. We do not sell your data. For details, refer to any privacy notice we publish on this site.',
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="FAQ — LAYYA" />
            <GuestNavbar />

            <div className="relative bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 py-16">
                <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Frequently asked questions</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
                        Quick answers about Luac Akok Yieu Youth Association (LAYYA) and this website.
                    </p>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {faqCategories.map((category, categoryIndex) => (
                        <div key={category.title} className="mb-12">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="text-3xl">{category.icon}</span>
                                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                            </div>
                            <div className="space-y-3">
                                {category.items.map((item, itemIndex) => {
                                    const globalIndex = `${categoryIndex}-${itemIndex}`;
                                    const isOpen = openItems.has(globalIndex);
                                    return (
                                        <div key={item.question} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                            <button
                                                type="button"
                                                onClick={() => toggleItem(globalIndex)}
                                                className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
                                            >
                                                <span className="pr-4 font-medium text-gray-900">{item.question}</span>
                                                <svg
                                                    className={`h-5 w-5 shrink-0 text-teal-600 transition ${isOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {isOpen && (
                                                <div className="border-t border-gray-100 px-5 py-4 text-gray-700">
                                                    <p className="leading-relaxed">{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-teal-900 py-12">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-2xl font-bold text-white">Still have a question?</h2>
                    <p className="mt-2 text-teal-100">We are happy to hear from you.</p>
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href="mailto:layya.youth@gmail.com"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-teal-900 shadow hover:bg-teal-50"
                        >
                            Email layya.youth@gmail.com
                        </a>
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
                        >
                            Contact form
                        </Link>
                    </div>
                </div>
            </div>

            <GuestFooter />
        </div>
    );
}
