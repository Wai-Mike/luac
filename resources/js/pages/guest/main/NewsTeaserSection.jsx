import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
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
                            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition hover:border-teal-200 hover:bg-white hover:shadow-md">
                                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">{n.type}</p>
                                <h3 className="mt-2 text-lg font-bold text-slate-900">{n.title}</h3>
                                <p className="mt-2 flex-1 text-sm text-slate-600 leading-relaxed">{n.excerpt}</p>
                                <p className="mt-4 text-xs font-medium text-slate-500">{n.date}</p>
                            </article>
                        </FadeIn>
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                    <Link
                        href={route('news')}
                        className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900"
                    >
                        See all updates
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
