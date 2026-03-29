import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Link } from '@inertiajs/react';

export default function AboutPage() {
    return (
        <div>
            <GuestNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-emerald-600 to-amber-500 py-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-green-600/20 to-green-700/20"></div>
                <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5"></div>
                <div className="absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-white/5"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center rounded-full bg-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md shadow-lg ring-2 ring-white/20">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            About LAYYA
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-6 text-4xl font-extrabold text-white drop-shadow-2xl sm:text-5xl lg:text-7xl leading-tight">
                            <span className="block mb-2">About Luac Akok Yieu</span>
                            <span className="block bg-gradient-to-r from-white via-teal-50 to-amber-100 bg-clip-text text-transparent drop-shadow-lg">
                                Youth Association (LAYYA)
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white sm:text-xl lg:text-2xl font-medium drop-shadow-lg">
                            Empowering youth in Luac Akok Yieu and beyond through leadership, skills-building, creativity, and community action. We connect
                            young people to opportunities, mentors, and safe spaces where their ideas and talents can grow.
                        </p>

                        {/* Call to Action */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="#our-mission"
                                className="group relative overflow-hidden rounded-full bg-white px-10 py-5 text-lg font-bold text-teal-800 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-xl"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Our Mission
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            </a>
                            <a
                                href="#our-team"
                                className="group rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-110 shadow-xl"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Meet Our Team
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section id="our-mission" className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
                            <span className="mr-2">🎯</span>
                            Our Mission
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Empowering Communities Through Youth Leadership</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            At LAYYA, we&apos;re building youth-led spaces where creativity, culture, learning, and service come together. Through clubs,
                            trainings, and community projects, we help young people discover their strengths and lead change in their villages and towns.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Our Vision</h3>
                            <p className="mb-6 text-lg text-gray-600">
                                We envision a South Sudan where every young person has access to safe spaces, mentors, and practical opportunities to
                                learn, create, and lead—regardless of where they were born or their background.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-teal-500"></div>
                                    <p className="text-gray-600">Youth-friendly spaces where young people feel seen, heard, and supported</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <p className="text-gray-600">Communities that trust and champion youth voices in local decision-making</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-amber-500"></div>
                                    <p className="text-gray-600">Young women and men leading projects in culture, peacebuilding, business, and innovation</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50 p-8">
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Our Mission</h3>
                            <p className="mb-6 text-lg text-gray-600">
                                We support young people to design and lead activities that matter to them—from Tawus skills clubs to sports, arts, digital
                                labs, and community service. Our role is to guide, connect, and walk alongside youth as they turn small ideas into visible
                                change.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
                                        <svg className="h-5 w-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Community Engagement</h4>
                                        <p className="text-sm text-gray-600">
                                            Building strong, supportive networks that champion youth leadership, dialogue, and peaceful coexistence.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                                        <svg className="h-5 w-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Digital Innovation</h4>
                                        <p className="text-sm text-gray-600">
                                            Using simple digital tools to tell stories, share opportunities, and keep youth connected to what is happening.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                                        <svg className="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Learning & Reflection</h4>
                                        <p className="text-sm text-gray-600">
                                            Listening to youth, learning from every activity, and improving our programs together.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section id="our-team" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
                            <span className="mr-2">👥</span>
                            Our Team
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Meet Our Leadership Team</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            A diverse team of organizers, technologists, and community builders working side by side with young people.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-green-300 hover:shadow-lg sm:p-8">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-50 to-emerald-100 ring-2 ring-teal-200">
                                    <img
                                        src="/images/teams/agnes-juan.jpeg"
                                        alt="Dr. Nyadak Suzan"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Nyadak Suzan</h3>
                                <p className="mb-4 text-sm font-semibold text-teal-700">Youth Programs Lead</p>
                                <p className="text-sm text-gray-600">
                                    A passionate youth organizer with years of experience in mentoring, facilitation, and program design. Nyadak supports
                                    young people to turn community challenges into practical projects and youth-led solutions.
                                </p>
                            </div>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-green-300 hover:shadow-lg sm:p-8">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-50 to-emerald-100 ring-2 ring-teal-200">
                                    <img
                                        src="/images/teams/wai-micheal.jpg"
                                        alt="Eng. Wai Micheal"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Eng. Wai Michael</h3>
                                <p className="mb-4 text-sm font-semibold text-teal-700">Head of Digital & Innovation</p>
                                <p className="text-sm text-gray-600">
                                    A skilled full-stack engineer passionate about using technology to amplify youth voices. Eng. Michael leads the
                                    development of LAYYA&apos;s digital platforms, connecting young people to stories, opportunities, and each other.
                                </p>
                            </div>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-green-300 hover:shadow-lg sm:p-8">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-50 to-emerald-100 ring-2 ring-teal-200">
                                    <img
                                        src="/images/teams/anok.jpeg"
                                        alt="Mrs. Anok George Athor"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Mrs. Anok George Athor</h3>
                                <p className="mb-4 text-sm font-semibold text-teal-700">Founder & Executive Director</p>
                                <p className="text-sm text-gray-600">
                                    An innovator and entrepreneur with deep roots in Luac Akok Yieu. Anok leads LAYYA&apos;s vision, building partnerships
                                    and creating spaces where youth can dream bigger, organize together, and lead change in their communities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Impact Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-teal-50 px-4 py-2 text-sm font-large text-teal-800">
                            <span className="mr-2">🎯</span>
                            Our Impact
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Making a Measurable Difference</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Since our inception, LAYYA has created spaces for youth clubs, trainings, and community projects across South Sudan. Our impact
                            is seen in the stories of young people who are now leading events, supporting their peers, and shaping the future of their
                            communities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-teal-700 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">1,000+</div>
                            <div className="text-sm text-gray-600 sm:text-base">Youth Reached</div>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-emerald-700 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">85%</div>
                            <div className="text-sm text-gray-600 sm:text-base">Program Success Rate</div>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-amber-700 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">10+</div>
                            <div className="text-sm text-gray-600 sm:text-base">Research Publications</div>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-teal-700 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">5</div>
                            <div className="text-sm text-gray-600 sm:text-base">Partner Organizations</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-500 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl drop-shadow-lg">Join Us in Growing the LAYYA Movement</h2>
                        <p className="mb-8 text-lg text-white/90 sm:text-xl">
                            Whether you are a young person, parent, community leader, or partner, there is a place for you in the LAYYA story. Together,
                            we can open more spaces, support more youth, and keep Luac Akok Yieu moving forward.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-teal-800 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                Get Involved
                            </Link>
                            <Link
                                href={route('reports')}
                                className="inline-flex items-center rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-105"
                            >
                                Reports & updates
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
