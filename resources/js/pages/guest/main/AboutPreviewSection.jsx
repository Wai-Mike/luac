import { Link } from '@inertiajs/react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import { aboutPreview } from '../data/siteContent';

export default function AboutPreviewSection() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader eyebrow="About LAYYA" title={aboutPreview.title} subtitle={aboutPreview.text} />
                <FadeIn className="flex justify-center">
                    <Link
                        href={route('about')}
                        className="inline-flex min-h-11 items-center rounded-full border border-teal-200 bg-teal-50 px-6 text-sm font-semibold text-teal-800 transition hover:bg-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                        Read our story
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
