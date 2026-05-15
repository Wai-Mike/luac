import { Link } from '@inertiajs/react';
import SectionTitle from './SectionTitle';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5481ff] focus-visible:ring-offset-2';

export default function JobOpportunitySection() {
    const jobs = [
        {
            href: route('youth-census.register'),
            title: 'Youth census — register your voice',
            excerpt: 'Help us map needs and strengths across Luac Akok Yieu so programs and partners can respond with precision.',
            cta: 'Apply now',
            expired: false,
        },
        {
            href: route('tawus-hub'),
            title: 'Tawus Hub — skills for girls & young women',
            excerpt: 'Hands-on training in decor, styling, catering basics, and mentorship in a safe, peer-supported space.',
            cta: 'Apply now',
            expired: false,
        },
        {
            href: route('programs'),
            title: 'Community programs & leadership labs',
            excerpt: 'Workshops and initiatives that build confidence, teamwork, and real-world skills for youth leaders.',
            cta: 'Apply now',
            expired: false,
        },
    ];

    return (
        <section id="job-opportunity" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-[117px]">
            <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Recent jobs" subtitle="Open pathways to learn, lead, and contribute—pick what fits you best." />
                <div className="job-opportunity-wrapper mx-auto mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {jobs.map((job) => (
                        <article
                            key={job.title}
                            className="single-job-opportunity flex flex-col rounded-lg border border-[#dbe5f3] bg-white px-0 pb-0 pt-8 text-center text-sm text-[#3a3b3c] shadow-sm transition motion-safe:duration-200 hover:-translate-y-0.5 hover:border-[#3b60c9]/35 hover:shadow-md"
                        >
                            <div className="job-opportunity-text flex flex-1 flex-col px-6 sm:px-7">
                                <div className="job-oppor-logo mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#ecf1f5] ring-1 ring-[#dbe5f3]">
                                    <span className="font-sans text-lg font-bold text-[#3b60c9]">LAYYA</span>
                                </div>
                                <h3 className="mb-4 min-h-[3.25rem] font-sans text-lg font-bold leading-snug sm:text-[1.05rem]">
                                    <Link href={job.href} className={`text-[#131c33] transition hover:text-[#3b60c9] ${focusRing} rounded-sm`}>
                                        {job.title}
                                    </Link>
                                </h3>
                                <p className="mb-6 flex-1 font-sans text-sm leading-relaxed sm:text-[0.95rem]">{job.excerpt}</p>
                            </div>
                            <Link
                                href={job.href}
                                className={`mt-auto flex min-h-[48px] w-full items-center justify-center font-sans text-base font-bold uppercase text-white transition motion-safe:duration-200 sm:text-[1.05rem] ${
                                    job.expired ? 'cursor-not-allowed bg-[#e66767]' : `bg-[#1dd983] hover:bg-[#161f37] ${focusRing} focus-visible:ring-offset-white`
                                }`}
                            >
                                {job.cta}
                            </Link>
                        </article>
                    ))}
                </div>
                <div className="mt-14 text-center">
                    <Link
                        href={route('programs')}
                        className={`inline-flex min-h-[48px] items-center justify-center bg-[#3b60c9] px-10 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-white transition motion-safe:duration-200 hover:bg-[#161f37] ${focusRing}`}
                    >
                        All programs
                    </Link>
                </div>
            </div>
        </section>
    );
}
