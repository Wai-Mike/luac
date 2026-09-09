import GuestButton from '@/components/GuestButton';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import { newsEvents } from '../data/siteContent';

export default function NewsTeaserSection() {
    const preview = newsEvents.slice(0, 3);

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="News & events"
                    title="What’s happening"
                    subtitle="Community meetings, trainings, campaigns, and celebrations — stay close to the movement."
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {preview.map((n, i) => (
                        <FadeIn key={n.title} delay={i * 0.06}>
                            <article className="flex h-full flex-col border border-brand/25 bg-white p-6">
                                <p className="text-xs font-semibold uppercase tracking-wide text-brand">{n.type}</p>
                                <h3 className="mt-2">{n.title}</h3>
                                <p className="mt-2 flex-1 text-[16px] leading-relaxed text-brand-ink/80">{n.excerpt}</p>
                                <p className="mt-4 text-sm font-medium text-brand-muted">{n.date}</p>
                            </article>
                        </FadeIn>
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                    <GuestButton href={route('news')} variant="secondary">
                        See all updates
                    </GuestButton>
                </div>
            </div>
        </section>
    );
}
