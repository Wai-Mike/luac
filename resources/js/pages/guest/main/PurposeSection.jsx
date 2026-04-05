export default function PurposeSection() {
    return (
        <section className="relative py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mb-14 text-center lg:mb-16">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand">Our purpose &amp; mission</p>
                    <h2 className="font-association text-3xl font-semibold tracking-tight text-association-ink sm:text-4xl md:text-[2.35rem]">
                        Empowering communities through youth action &amp; creativity
                    </h2>
                    <div className="mx-auto mt-6 h-px w-16 bg-brand/80" aria-hidden />
                    <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                        We believe that strong youth leadership, culture, and skills are key to equity, dignity, and sustainable development. Our mission is
                        to connect young people to opportunities, lifelong skills, and platforms where their voices shape real change.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                    <article className="border-l-4 border-brand bg-white p-8 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] sm:p-10">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white ring-4 ring-brand/15">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-association text-xl font-semibold text-association-ink">Our mission</h3>
                        </div>
                        <p className="mb-6 leading-relaxed text-slate-600">
                            To empower young people and underserved communities with inclusive, youth-led programs—spanning leadership, arts, technology, and
                            livelihoods—through awareness, innovation, and collaboration.
                        </p>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex gap-3 border-t border-slate-100 pt-3 first:border-0 first:pt-0">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Expand access to skills-building, mentorship, and youth leadership opportunities.
                            </li>
                            <li className="flex gap-3 border-t border-slate-100 pt-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Build capacity of youth champions, peer mentors, and community organizers.
                            </li>
                            <li className="flex gap-3 border-t border-slate-100 pt-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                Promote data-driven youth advocacy and community-led decision-making.
                            </li>
                        </ul>
                    </article>

                    <article className="border-l-4 border-association-band bg-white p-8 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] sm:p-10">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-association-band text-white ring-4 ring-sky-900/10">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-association text-xl font-semibold text-association-ink">Our vision</h3>
                        </div>
                        <p className="mb-6 leading-relaxed text-slate-600">
                            To lead in digital and community innovation for equitable access to youth empowerment spaces, skills, and opportunities across
                            South Sudan and East Africa.
                        </p>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex gap-3 border-t border-slate-100 pt-3 first:border-0 first:pt-0">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-association-band" />
                                Foster youth-led innovation in community development, arts, and social change.
                            </li>
                            <li className="flex gap-3 border-t border-slate-100 pt-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-association-band" />
                                Strengthen partnerships with government, civil society, and donors.
                            </li>
                            <li className="flex gap-3 border-t border-slate-100 pt-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-association-band" />
                                Create sustainable, scalable youth programs that can grow with communities.
                            </li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}
