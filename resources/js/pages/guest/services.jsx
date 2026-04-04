import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';
import { useMemo } from 'react';

export default function GuestServices({ programsGallery = [], servicesHeroImage = null, programIcons = [] }) {
    const programs = useMemo(() => {
        const base = [
            {
                title: 'Digital Youth Hub',
                description:
                    'A creative online space where young people from Luac Akok Yieu connect, learn digital skills, and showcase their projects and ideas.',
                features: [
                    'Intro to coding and web design',
                    'Basic graphic and content design',
                    'Storytelling and blogging for youth',
                    'Simple digital safety tips',
                    'Showcase wall for youth projects',
                    'Peer-to-peer mentoring circles',
                ],
                color: 'teal',
                users: '1,000+ Youth Engaged',
            },
            {
                title: 'Tawus Girls Creativity Club',
                description:
                    'A safe, vibrant space for girls and young women to learn practical skills like braiding, manicure, catering, and decor while building confidence and leadership.',
                features: [
                    'Braiding and hair styling sessions',
                    'Manicure and basic beauty skills',
                    'Catering and event serving basics',
                    'Event decor and space setup',
                    'Savings and small business basics',
                    'Mentorship from local role models',
                ],
                color: 'teal',
                users: '200+ Girls Participating',
            },
            {
                title: 'Youth Leadership & Mentorship',
                description:
                    'Workshops and mentorship spaces that help young people discover their voice, lead initiatives, and serve their community with pride.',
                features: [
                    'Leadership and public speaking',
                    'Community project design',
                    'Teamwork and conflict resolution',
                    'Youth-to-youth mentorship',
                    'Role model talks and panels',
                    'Practical volunteering experiences',
                ],
                color: 'cyan',
                users: 'Active Since 2024',
            },
            {
                title: 'Sports, Arts & Culture Clubs',
                description:
                    'Fun, youth-led clubs for football, dance, music, and cultural expressions that keep young people active, connected, and proud of their identity.',
                features: [
                    'Football and friendly tournaments',
                    'Cultural dance and music practice',
                    'Poetry, drama, and open-mic nights',
                    'Community clean-up and tree-planting',
                    'Inter-village exchange visits',
                    'Youth talent shows and showcases',
                ],
                color: 'emerald',
                users: 'Multi-Community Reach',
            },
            {
                title: 'Youth Innovation & Ideas Lab',
                description:
                    'A simple “ideas to action” lab where young people test small projects, learn how to plan events, and turn their ideas into real activities.',
                features: [
                    'Idea-building and planning sessions',
                    'Small project mini-grants (where available)',
                    'Basic budgeting and reporting',
                    'Peer feedback and project clinics',
                    'Showcase days for completed projects',
                    'Connection to partners and supporters',
                ],
                color: 'sky',
                users: 'Youth-Led Experiments',
            },
        ];

        return base.map((program, i) => ({
            ...program,
            icon: programIcons.length ? programIcons[i % programIcons.length] : null,
        }));
    }, [programIcons]);

    return (
        <div className="min-h-screen bg-white">
            <Head title="Our Programs - Luac Akok Yieu Youth Association (LAYYA)" />

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {servicesHeroImage ? (
                        <img
                            src={servicesHeroImage}
                            alt="LAYYA youth programs and activities"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand via-emerald-800 to-brand-dark" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/60 via-emerald-600/60 to-brand-light/60"></div>
                </div>
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center rounded-full border-2 border-white/50 bg-white/30 px-8 py-4 text-sm font-bold text-white shadow-2xl backdrop-blur-md">
                            <span className="mr-3 text-2xl"></span>
                            <span className="tracking-wide drop-shadow-lg">Our Programs</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                            <span className="block drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)]">
                                Youth Programs & Spaces
                            </span>
                        </h1>

                        {/* Tagline */}
                        <div className="mb-10">
                            <p className="mb-4 text-2xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] sm:text-3xl lg:text-4xl">
                                Youth spaces for creativity, skills, and leadership.
                            </p>
                            <p className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)] sm:text-2xl">
                                Built with and for the young people of Luac Akok Yieu.
                            </p>
                        </div>

                        {/* Description */}
                        <p className="mx-auto mb-12 max-w-4xl text-lg leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)] sm:text-xl font-medium">
                            From Tawus girls&apos; skills clubs to innovation labs, LAYYA creates real, practical opportunities for youth to grow,
                            connect, and lead positive change in their communities.
                        </p>

                        {/* Program Stats */}
                        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-5">
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">5</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">Key Programs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">2K+</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">Girls Reached</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">1K+</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">App Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">3</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">States</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">€15K</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">Funding</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Programs Section */}
            <div className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-white">
                            <span className="mr-2">🎯</span>
                            Key Programs
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Youth Programs in Action</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Practical, youth-led activities that turn ideas into real change on the ground.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                            >
                                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className="mb-4 flex items-center">
                                        <div className="relative mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl ring-2 ring-teal-200 shadow-md">
                                            {program.icon ? (
                                                <img
                                                    src={program.icon}
                                                    alt={program.title}
                                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-brand to-brand-light" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-gray-900">{program.title}</h3>
                                            <div className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">
                                                {program.users}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-6 text-lg text-gray-600">{program.description}</p>
                                    <ul className="space-y-3">
                                        {program.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                <svg
                                                    className="mr-3 h-5 w-5 flex-shrink-0 text-brand"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {program.title.includes('Tawus') && (
                                        <div className="mt-6">
                                            <Link
                                                href={route('tawus-hub')}
                                                className="inline-flex items-center rounded-full bg-brand-surface px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-surface/80"
                                            >
                                                Visit Tawus Hub page →
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <div
                                        className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-light p-8 group"
                                    >
                                        {program.icon ? (
                                            <img
                                                src={program.icon}
                                                alt={program.title}
                                                className="absolute inset-0 h-full w-full object-cover object-center opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-brand/40 to-brand-light/40" />
                                        )}
                                        <div className="relative z-10 text-center">
                                            <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-2xl ring-4 ring-white shadow-lg">
                                                {program.icon ? (
                                                    <img
                                                        src={program.icon}
                                                        alt={program.title}
                                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-gradient-to-br from-brand to-brand-light" />
                                                )}
                                            </div>
                                            <h4 className="mb-2 text-lg font-semibold text-gray-900">{program.title}</h4>
                                            <p className="text-sm text-gray-600 font-medium">{program.users}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {programsGallery.length > 0 && (
                <div className="bg-gradient-to-b from-white to-stone-50 py-14">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">Faces &amp; moments from our programs</h2>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
                            {programsGallery.map((src, i) => (
                                <div key={`${src}-${i}`} className="relative aspect-[3/4] overflow-hidden rounded-xl shadow ring-1 ring-stone-200/80">
                                    <img
                                        src={src}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Impact & Achievements Section */}
            <div className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-white">
                            <span className="mr-2">🏆</span>
                            Our Impact
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">What LAYYA Youth Are Achieving</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Youth from Luac Akok Yieu and beyond are turning ideas into projects, skills into opportunities, and friendships into powerful
                            community networks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-brand">2023</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">LAYYA Registered</h3>
                            <p className="text-gray-600">Luac Akok Yieu Youth Association officially registered in South Sudan.</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-brand">2,000+</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Girls Reached</h3>
                            <p className="text-gray-600">Through Tawus skills clubs, mentorship circles, and community events.</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-brand">1,000+</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Youth Reached Online</h3>
                            <p className="text-gray-600">Through LAYYA&apos;s digital youth platform and online storytelling spaces.</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-brand">€15,000</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Youth Innovation Support</h3>
                            <p className="text-gray-600">Support and recognition from partners for youth-led digital innovation.</p>
                        </div>
                    </div>

                    {/* Awards Section */}
                    <div className="mt-16 rounded-2xl bg-gradient-to-r from-brand-surface to-brand-light/30 p-8">
                        <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">Awards & Recognition</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                                <div className="mb-3 text-2xl">🥈</div>
                                <h4 className="mb-2 font-semibold text-gray-900">1st Runner-Up</h4>
                                <p className="text-sm text-gray-600">3Zeros Innovate Challenge – Digital Youth Innovation Track (2024)</p>
                            </div>
                            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                                <div className="mb-3 text-2xl">🏆</div>
                                <h4 className="mb-2 font-semibold text-gray-900">National Representative</h4>
                                <p className="text-sm text-gray-600">Youth & Women Hackathon – East Africa (2024)</p>
                            </div>
                            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                                <div className="mb-3 text-2xl">🎯</div>
                                <h4 className="mb-2 font-semibold text-gray-900">Finalist</h4>
                                <p className="text-sm text-gray-600">Youth-Led Digital Innovation Grant by GIZ (2025)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-brand via-brand-soft to-brand-light py-20 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">Be Part of the LAYYA Story</h2>
                    <p className="mb-8 text-xl opacity-90">
                        Join young people who are building clubs, leading activities, and shaping the future of Luac Akok Yieu through creativity,
                        collaboration, and community action.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href={route('contact')}
                            className="transform rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white hover:text-brand"
                        >
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <GuestFooter />
        </div>
    );
}
