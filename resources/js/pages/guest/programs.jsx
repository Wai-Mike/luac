import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';

export default function Programs({ programsHeroImage }) {
    const { programs } = useSiteContent();
    const heroImage = programsHeroImage || programs.find((program) => program.image)?.image || '/images/education.jpg';

    return (
        <GuestLayout title="Programs">
            <PageHero
                label="Programs"
                title="Built for"
                italic="youth impact"
                subtitle="Each pillar includes workshops, mentorship, and community showcases."
                image={heroImage}
            />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
                    {programs.map((p, i) => (
                        <FadeIn key={p.title}>
                            <article className="grid items-center gap-10 lg:grid-cols-2">
                                <div className={`relative aspect-video overflow-hidden rounded-3xl bg-brand-dark ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <img
                                        src={p.image || '/images/education.jpg'}
                                        alt=""
                                        className="photo-fill"
                                    />
                                </div>
                                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                                    <h2>{p.title}</h2>
                                    <p className="mt-4 text-[16px] leading-relaxed text-brand-muted">{p.body}</p>
                                    <GuestButton href={route('get-involved')} variant="outline" className="mt-6">
                                        Get involved
                                    </GuestButton>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
