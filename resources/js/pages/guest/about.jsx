import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Link } from '@inertiajs/react';

const TEAM = [
    {
        name: 'Nyadak Suzan',
        role: 'Youth Programs Lead',
        img: '/images/teams/agnes-juan.jpeg',
        alt: 'Nyadak Suzan',
        bio: 'A passionate youth organizer with years of experience in mentoring, facilitation, and program design. Nyadak supports young people to turn community challenges into practical projects and youth-led solutions.',
    },
    {
        name: 'Eng. Wai Michael',
        role: 'Head of Digital & Innovation',
        img: '/images/teams/wai-micheal.jpg',
        alt: 'Eng. Wai Michael',
        bio: "A skilled full-stack engineer passionate about using technology to amplify youth voices. Eng. Michael leads the development of LAYYA's digital platforms, connecting young people to stories, opportunities, and each other.",
    },
    {
        name: 'Mrs. Anok George Athor',
        role: 'Founder & Executive Director',
        img: '/images/teams/anok.jpeg',
        alt: 'Mrs. Anok George Athor',
        bio: "A community leader and entrepreneur with deep roots in Luac Akok Yieu. Anok leads LAYYA's vision, building partnerships and creating spaces where youth can dream bigger, organize together, and lead change in their communities.",
    },
];

const IMPACT_STATS = [
    { value: '1,000+', label: 'Youth reached' },
    { value: '85%', label: 'Program success rate' },
    { value: '10+', label: 'Research publications' },
    { value: '5', label: 'Partner organizations' },
];

const MISSION_PILLARS = [
    {
        title: 'Community engagement',
        body: 'Building strong, supportive networks that champion youth leadership, dialogue, and peaceful coexistence.',
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
        ),
    },
    {
        title: 'Digital innovation',
        body: 'Using simple digital tools to tell stories, share opportunities, and keep youth connected to what is happening.',
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
        ),
    },
    {
        title: 'Learning & reflection',
        body: 'Listening to youth, learning from every activity, and improving our programs together.',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
];

/**
 * About page — civic / “Association” nonprofit layout (serif display, navy–teal, modular sections).
 */
export default function AboutPage({ aboutGallery = [] }) {
    return (
        <div className="min-w-0 bg-association-canvas">
            <GuestNavbar variant="association" />

            {/* Hero — left-aligned civic band */}
            <section className="relative flex min-h-[min(52vh,560px)] items-center overflow-hidden py-16 sm:py-20">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a6e]/95 via-[#0f766e]/85 to-[#0e7490]/75" aria-hidden />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                    aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_30%,rgba(255,255,255,0.07),transparent)]" aria-hidden />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-teal-100/95">About the association</p>
                    <div className="mb-5 h-1 w-16 rounded-full bg-brand-light sm:w-20" aria-hidden />
                    <h1 className="max-w-3xl font-association text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]">
                        Luac Akok Yieu Youth Association (LAYYA)
                    </h1>
                    <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-teal-50 sm:text-lg">
                        Empowering youth through leadership, skills-building, creativity, and community action — connecting young people to mentors, opportunities, and safe spaces where their ideas can grow.
                    </p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                        <a
                            href="#our-mission"
                            className="inline-flex items-center justify-center border-2 border-white/90 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-brand-surface"
                        >
                            Our mission
                        </a>
                        <a
                            href="#our-team"
                            className="inline-flex items-center justify-center bg-brand px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-black/10 transition-colors hover:bg-brand-dark"
                        >
                            Leadership team
                        </a>
                    </div>
                </div>
            </section>

            {/* Mission intro + vision / pillars */}
            <section id="our-mission" className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Mission &amp; vision</p>
                        <h2 className="mt-3 font-association text-3xl font-bold text-association-ink sm:text-4xl">Empowering communities through youth leadership</h2>
                        <div className="mx-auto mt-5 h-px w-12 bg-brand" />
                        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                            At LAYYA, we&apos;re building youth-led spaces where creativity, culture, learning, and service come together. Through clubs, trainings, and community projects, we help young people discover their strengths and lead change.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
                        <div className="border-l-4 border-brand bg-slate-50/90 p-8 sm:p-10">
                            <h3 className="font-association text-2xl font-bold text-association-ink">Our vision</h3>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                                We envision a South Sudan where every young person has access to safe spaces, mentors, and practical opportunities to learn, create, and lead—regardless of background.
                            </p>
                            <ul className="mt-6 space-y-3 text-sm text-slate-700">
                                <li className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                    Youth-friendly spaces where young people feel seen, heard, and supported
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                    Communities that trust and champion youth voices in local decision-making
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light" />
                                    Young women and men leading in culture, peacebuilding, business, and innovation
                                </li>
                            </ul>
                        </div>

                        <div className="border border-slate-200 bg-association-canvas/60 p-8 sm:p-10">
                            <h3 className="font-association text-2xl font-bold text-association-ink">What we do</h3>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                                We support young people to design and lead activities that matter—from Tawus skills clubs to sports, arts, digital labs, and community service. We guide, connect, and walk alongside youth as ideas become visible change.
                            </p>
                            <div className="mt-8 space-y-6">
                                {MISSION_PILLARS.map(({ title, body, icon }) => (
                                    <div key={title} className="flex gap-4 border-b border-slate-200/80 pb-6 last:border-0 last:pb-0">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-white text-brand">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {icon}
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-association-ink">{title}</h4>
                                            <p className="mt-1 text-sm text-slate-600">{body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {aboutGallery.length > 0 && (
                <section className="border-y border-slate-800/50 bg-[#1e293b] py-14 text-white sm:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-300/90">Gallery</p>
                                <h2 className="mt-2 font-association text-2xl font-bold sm:text-3xl">Youth, girls &amp; community</h2>
                            </div>
                            <p className="max-w-lg text-sm text-slate-300">
                                Moments from Tawus Hub, education, sports, and everyday life in Luac Akok Yieu.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
                            {aboutGallery.map((src, i) => (
                                <div
                                    key={`${src}-${i}`}
                                    className="group relative aspect-square overflow-hidden rounded-sm ring-1 ring-white/10"
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 transition group-hover:opacity-50" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 text-center sm:text-left">
                            <Link
                                href={route('tawus-hub')}
                                className="text-xs font-bold uppercase tracking-[0.15em] text-teal-200 underline-offset-4 transition hover:text-white hover:underline"
                            >
                                Learn about Tawus Hub →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section id="our-team" className="border-t border-slate-200 bg-association-canvas py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">People</p>
                        <h2 className="mt-3 font-association text-3xl font-bold text-association-ink sm:text-4xl">Leadership team</h2>
                        <div className="mx-auto mt-5 h-px w-12 bg-brand" />
                        <p className="mt-6 text-base text-slate-600 sm:text-lg">
                            Organizers, technologists, and community builders working alongside young people.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {TEAM.map(({ name, role, img, alt, bio }) => (
                            <article
                                key={name}
                                className="border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md"
                            >
                                <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full ring-2 ring-brand/20">
                                    <img src={img} alt={alt} className="h-full w-full object-cover object-center" />
                                </div>
                                <h3 className="font-association text-xl font-bold text-association-ink">{name}</h3>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">{role}</p>
                                <p className="mt-4 text-left text-sm leading-relaxed text-slate-600">{bio}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact — full-width civic stats band */}
            <section className="relative border-y border-white/10 bg-gradient-to-r from-[#0c4a6e] via-association-band to-[#0e7490] py-14 text-white sm:py-16">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                    aria-hidden
                />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-200/90">Impact</p>
                        <h2 className="mt-2 font-association text-2xl font-bold sm:text-3xl">Making a measurable difference</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm text-teal-100/90">
                            Youth clubs, trainings, and community projects across South Sudan — young people leading events and supporting peers.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
                        {IMPACT_STATS.map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <p className="font-association text-3xl font-bold tracking-tight text-white sm:text-4xl">{value}</p>
                                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-100/85">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-navy py-14 sm:py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="font-association text-2xl font-bold text-white sm:text-3xl">Join the LAYYA movement</h2>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                        Whether you are a young person, parent, community leader, or partner — there is a place for you. Together we can open more spaces and support more youth.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href={route('contact')}
                            className="inline-flex min-w-[200px] items-center justify-center border-2 border-white/90 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-800 transition hover:bg-brand-surface"
                        >
                            Get involved
                        </Link>
                        <Link
                            href={route('reports')}
                            className="inline-flex min-w-[200px] items-center justify-center border border-white/30 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white/10"
                        >
                            Reports &amp; updates
                        </Link>
                    </div>
                </div>
            </section>

            <GuestFooter variant="association" />
        </div>
    );
}
