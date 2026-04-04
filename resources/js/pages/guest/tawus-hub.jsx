import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';

const skills = [
    {
        title: 'Decor & event styling',
        description: 'Table settings, simple floral ideas, and turning community spaces into welcoming venues for celebrations and learning.',
        icon: '✨',
    },
    {
        title: 'Braiding & hair art',
        description: 'Hands-on practice in braiding and styling so girls can express creativity and explore small-business skills.',
        icon: '💇🏽‍♀️',
    },
    {
        title: 'Manicure',
        description: 'Care of hands and nails, hygiene, and gentle techniques in a supportive peer environment.',
        icon: '💅',
    },
    {
        title: 'Pedicure',
        description: 'Foot care basics and confidence in offering services that neighbours and family appreciate.',
        icon: '🦶',
    },
    {
        title: 'Catering & hosting',
        description: 'Simple food presentation, serving at events, and teamwork in the kitchen where offered.',
        icon: '🍽️',
    },
    {
        title: 'Savings & small business',
        description: 'Conversations on budgeting, group savings, and turning skills into income over time.',
        icon: '📒',
    },
];

export default function TawusHubPage({ galleryImages = [], heroImage = null }) {
    const hasHeroPhoto = Boolean(heroImage);

    return (
        <div className="min-h-screen bg-stone-50">
            <Head title="Tawus Hub — Girls’ skills & creativity — LAYYA" />
            <GuestNavbar />

            <section className="relative flex min-h-[min(72vh,640px)] items-center overflow-hidden">
                <div className="absolute inset-0">
                    {hasHeroPhoto ? (
                        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-center" decoding="async" />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-navy via-brand-dark to-brand-light" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-brand-dark/85 to-brand-light/75" />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="max-w-3xl">
                        <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-foreground backdrop-blur">
                            Tawus Hub · By LAYYA
                        </p>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Supporting & empowering our girls
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
                            Tawus Hub is a safe, joyful space where girls and young women build practical skills—decor, braiding, manicure, pedicure, and
                            more—while growing confidence, friendship, and leadership alongside mentors who believe in them.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href={route('contact')}
                                className="inline-flex justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-navy shadow-lg transition hover:bg-brand-surface"
                            >
                                Partner or volunteer
                            </Link>
                            <Link
                                href={route('services')}
                                className="inline-flex justify-center rounded-full border-2 border-white/70 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                            >
                                All youth programs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-stone-200 bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">What happens at the Hub</h2>
                        <p className="mt-4 text-lg text-stone-600">
                            Activities rotate through the year. Sessions are practical, respectful of culture, and designed so every participant can try
                            something new and take pride in what they learn.
                        </p>
                    </div>
                    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {skills.map((skill) => (
                            <div
                                key={skill.title}
                                className="rounded-2xl border border-stone-100 bg-gradient-to-br from-white to-brand-surface/50 p-8 shadow-sm transition hover:shadow-md"
                            >
                                <div className="mb-4 text-3xl" aria-hidden>
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-bold text-stone-900">{skill.title}</h3>
                                <p className="mt-3 text-stone-600 leading-relaxed">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-900">Moments from the community</h2>
                            <p className="mt-2 max-w-2xl text-stone-600">
                                A rotating selection of photos from our image library—each visit may show a different mix.
                            </p>
                        </div>
                        <Link href={route('reports')} className="text-brand font-semibold hover:text-brand">
                            Reports & updates →
                        </Link>
                    </div>
                    {galleryImages.length > 0 ? (
                        <div className="columns-2 gap-4 sm:columns-3 lg:gap-6">
                            {galleryImages.map((src, i) => (
                                <div
                                    key={`${src}-${i}`}
                                    className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-md ring-1 ring-stone-200/80"
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        className="block w-full object-cover object-center transition duration-500 hover:scale-[1.02]"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-stone-500">Community photos will appear here when added to the site library.</p>
                    )}
                </div>
            </section>

            <section className="bg-gradient-to-br from-brand to-brand-light py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                    <h2 className="text-3xl font-bold sm:text-4xl">Grow the Hub with us</h2>
                    <p className="mt-4 text-lg text-brand">
                        We welcome mentors, supplies, and partners who want girls in Luac Akok Yieu to thrive. Reach out to explore how you can help.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href={route('contact')}
                            className="inline-flex justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand hover:bg-brand-surface"
                        >
                            Contact LAYYA
                        </Link>
                        <Link
                            href={route('reports')}
                            className="inline-flex justify-center rounded-full border-2 border-white/60 px-8 py-3.5 font-semibold text-white hover:bg-white/10"
                        >
                            Read reports
                        </Link>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
