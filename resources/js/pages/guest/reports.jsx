import GuestLayout from '@/layouts/GuestLayout';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';

export default function Reports({ reports = [], reportGallery = [] }) {
    return (
        <GuestLayout title="Reports">
            <PageHero
                label="Reports"
                title="What we share"
                italic="with the community"
                subtitle="Public summaries of programs, Tawus Hub, and the youth census — published when they are ready."
                image={reportGallery[0]}
            />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {reports.length === 0 ? (
                        <p className="col-span-full rounded-2xl border border-brand/10 bg-white p-8 text-sm text-brand-muted">
                            Public reports will appear here when the executive publishes them from the admin portal.
                        </p>
                    ) : null}
                    {reports.map((r, i) => (
                        <FadeIn key={r.title} delay={i * 0.06}>
                            <article className="rounded-2xl border border-brand/10 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-amber">{r.period}</p>
                                <h3 className="mt-3">{r.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{r.summary}</p>
                                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand">{r.status}</p>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
