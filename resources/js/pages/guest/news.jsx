import GuestLayout from '@/layouts/GuestLayout';
import SectionHeader from './components/SectionHeader';
import FadeIn from './components/FadeIn';
import { newsEvents } from './data/siteContent';

export default function News() {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-white pb-20 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="News & events"
                        title="Stay in the loop"
                        subtitle="Community meetings, trainings, fundraising milestones, campaigns, and cultural moments."
                    />
                    <div className="grid gap-8 md:grid-cols-2">
                        {newsEvents.map((n, i) => (
                            <FadeIn key={n.title} delay={i * 0.05}>
                                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-8 transition hover:border-teal-200 hover:bg-white hover:shadow-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-800">
                                            {n.type}
                                        </span>
                                        <span className="text-sm text-slate-500">{n.date}</span>
                                    </div>
                                    <h2 className="mt-4 text-2xl font-bold text-slate-900">{n.title}</h2>
                                    <p className="mt-3 flex-1 text-slate-600 leading-relaxed">{n.excerpt}</p>
                                </article>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
