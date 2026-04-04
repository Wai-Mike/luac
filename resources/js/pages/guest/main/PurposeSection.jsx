export default function PurposeSection() {
    return (
        <section className="bg-brand-surface py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center lg:px-12">
                    <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand">
                        Our purpose & mission
                    </div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Empowering communities through
                        <span className="block text-brand">youth action & creativity</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        We believe that strong youth leadership, culture, and skills are key to equity, dignity, and sustainable development. Our mission
                        is to connect young people to opportunities, lifelong skills, and platforms where their voices shape real change.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-white">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Our mission</h3>
                        </div>
                        <p className="mb-6 leading-relaxed text-gray-600">
                            To empower young people and underserved communities with inclusive, youth-led programs—spanning leadership, arts, technology,
                            and livelihoods—through awareness, innovation, and collaboration.
                        </p>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Expand access to skills-building, mentorship, and youth leadership opportunities.
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Build capacity of youth champions, peer mentors, and community organizers.
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Promote data-driven youth advocacy and community-led decision-making.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-white">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Our vision</h3>
                        </div>
                        <p className="mb-6 leading-relaxed text-gray-600">
                            To lead in digital and community innovation for equitable access to youth empowerment spaces, skills, and opportunities across
                            South Sudan and East Africa.
                        </p>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Foster youth-led innovation in community development, arts, and social change.
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Strengthen partnerships with government, civil society, and donors.
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Create sustainable, scalable youth programs that can grow with communities.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
