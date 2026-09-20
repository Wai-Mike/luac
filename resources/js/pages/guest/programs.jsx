import { BookOpen, Calendar, HeartHandshake, Scale, Sparkles, Users } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import useSiteContent from '@/hooks/useSiteContent';
import CensusSnapshotCard from './components/CensusSnapshotCard';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';

const tagIcons = {
    Leadership: Users,
    Advocacy: Scale,
    Community: HeartHandshake,
    Digital: Sparkles,
    Learning: BookOpen,
};

export function programSlug(title) {
    return String(title || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function ProgramMeta({ program }) {
    const items = [
        program.participants ? `${program.participants} youth` : null,
        program.sessions ? `${program.sessions} sessions` : null,
        program.facilitators ? `${program.facilitators} facilitators` : null,
    ].filter(Boolean);

    if (!items.length) {
        return null;
    }

    return (
        <ul className="mt-4 flex flex-wrap gap-2">
            {items.map((item) => (
                <li key={item} className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                    {item}
                </li>
            ))}
        </ul>
    );
}

function ProgramCard({ program, index, featured = false }) {
    const Icon = tagIcons[program.tag] || Calendar;
    const image = program.image || '/images/education.jpg';

    if (featured) {
        return (
            <article id={programSlug(program.title)} className="scroll-mt-24 overflow-hidden rounded-2xl bg-brand-dark md:grid md:grid-cols-2">
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[22rem]">
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
                </div>
                <div className="flex flex-col justify-center p-6 text-white md:p-10">
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {program.tag || `Program ${index}`}
                    </p>
                    <h2 className="mt-3 text-white">{program.title}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/75">{program.body || program.summary}</p>
                    <ProgramMeta program={program} />
                    <div className="mt-6 flex flex-wrap gap-3">
                        <GuestButton href={route('get-involved')} variant="amber">
                            Get involved
                        </GuestButton>
                        <GuestButton href={route('tawus-hub')} variant="ghost">
                            Visit Tawus Hub
                        </GuestButton>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article id={programSlug(program.title)} className="scroll-mt-24 flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white">
            <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark">
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {program.tag || `Program ${index}`}
                </p>
                <h3 className="mt-2">{program.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{program.body || program.summary}</p>
                <ProgramMeta program={program} />
                <GuestButton href={route('get-involved')} variant="outline" className="mt-5 sm:w-auto">
                    Get involved
                </GuestButton>
            </div>
        </article>
    );
}

export default function Programs({ programsHeroImage }) {
    const { programs } = useSiteContent();
    const heroImage = programsHeroImage || programs.find((program) => program.image)?.image || '/images/hero/cover.jpg';
    const [featured, ...rest] = programs;

    return (
        <GuestLayout title="Programs">
            <PageHero
                label="Programs"
                title="Built for youth impact"
                subtitle="Workshops, mentorship, and community showcases — five pillars led by LAYYA members."
                image={heroImage}
            />

            <section className="border-b border-brand/10 bg-white py-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8">
                    <p className="mr-2 text-sm font-semibold text-brand-ink">{programs.length} pillars</p>
                    {programs.map((program) => (
                        <a
                            key={program.title}
                            href={`#${programSlug(program.title)}`}
                            className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
                        >
                            {program.tag || program.title}
                        </a>
                    ))}
                </div>
            </section>

            <section className="bg-brand-soft py-12 md:py-16">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {featured ? (
                        <FadeIn>
                            <ProgramCard program={featured} index={1} featured />
                        </FadeIn>
                    ) : null}
                    {rest.length ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {rest.map((program, i) => (
                                <FadeIn key={program.title} delay={i * 0.06}>
                                    <ProgramCard program={program} index={i + 2} />
                                </FadeIn>
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>

            <section className="bg-white py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <CensusSnapshotCard />
                </div>
            </section>

            <section className="bg-brand-dark py-10 md:py-14">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>
                        <h2 className="text-white">Take a place in the work</h2>
                        <p className="mt-2 max-w-xl text-sm text-white/70">
                            Register in the youth census, join a program, or support the pillars with a gift.
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <GuestButton href={route('youth-census.register')} variant="amber">
                            Youth census
                        </GuestButton>
                        <GuestButton href={`${route('fundraising')}#donate`} variant="ghost">
                            Donate
                        </GuestButton>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
