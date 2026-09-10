import GuestLayout from '@/layouts/GuestLayout';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';

const newsPhotos = [
    '/images/youth.jpg',
    '/images/education.jpg',
    '/images/cover.jpg',
    '/images/tawus.jpg',
    '/images/football.jpg',
    '/images/education1.jpg',
];

export default function News() {
    const { newsEvents } = useSiteContent();
    const published = newsEvents.filter((n) => (n.status || 'published') !== 'draft');

    return (
        <GuestLayout title="News">
            <PageHero label="News" title="Stay in" italic="the loop" subtitle="Meetings, trainings, campaigns, and cultural moments." />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {published.map((n, i) => (
                        <FadeIn key={n.title} delay={i * 0.05}>
                            <article className="overflow-hidden rounded-2xl border border-brand/10">
                                <div className="relative h-48 overflow-hidden bg-brand-dark">
                                    <img src={n.image || newsPhotos[i % newsPhotos.length]} alt="" className="photo-fill transition duration-500 hover:scale-105" />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-semibold uppercase tracking-wide text-brand">{n.type}</span>
                                        <span className="text-brand-muted">{n.date}</span>
                                    </div>
                                    <h3 className="mt-3">{n.title}</h3>
                                    <p className="mt-2 text-sm text-brand-muted">{n.excerpt}</p>
                                    <a href={route('news')} className="mt-4 inline-block text-sm font-semibold text-brand">
                                        Read more →
                                    </a>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
