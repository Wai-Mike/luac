import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';
import { programsDetail } from './data/siteContent';

export default function Programs({ programsHeroImage, programsGallery = [] }) {
    return (
        <GuestLayout title="Programs">
            <PageHero
                label="Programs"
                title="Built for"
                italic="youth impact"
                subtitle="Each pillar includes workshops, mentorship, and community showcases."
                image={programsHeroImage}
            />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
                    {programsDetail.slice(0, 5).map((p, i) => (
                        <FadeIn key={p.title}>
                            <article className="grid items-center gap-10 lg:grid-cols-2">
                                <div className={`relative aspect-video overflow-hidden rounded-3xl bg-brand-dark ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <img
                                        src={programsGallery[i % programsGallery.length] ?? '/images/education.jpg'}
                                        alt=""
                                        className="photo-fill"
                                    />
                                </div>
                                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                                        Program 0{i + 1}
                                    </span>
                                    <h2 className="mt-4">{p.title}</h2>
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
