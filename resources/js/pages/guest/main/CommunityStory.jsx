import useSiteContent, { splitLines } from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

export default function CommunityStory() {
    const { communityStory } = useSiteContent();
    const titleLines = splitLines(communityStory.title);
    const paragraphs = String(communityStory.body || '')
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
    const image = communityStory.image || '/images/nyalith.jpg';
    const name = communityStory.name || 'Community mentor';

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
                <FadeIn className="lg:col-span-3">
                    <SectionLabel>Community story</SectionLabel>
                    <h2>
                        {titleLines.map((line, index) => (
                            <span key={line}>
                                {index > 0 ? <br /> : null}
                                {line}
                            </span>
                        ))}
                    </h2>
                    {paragraphs.map((paragraph, index) => (
                        <p key={paragraph.slice(0, 40)} className={`${index === 0 ? 'mt-5' : 'mt-4'} text-[16px] leading-relaxed text-brand-muted`}>
                            {paragraph}
                        </p>
                    ))}
                    {communityStory.quote ? (
                        <blockquote className="mt-6 border-l-4 border-amber pl-4 text-[16px] leading-relaxed text-brand-ink">
                            “{communityStory.quote}”
                            {communityStory.quote_attribution ? (
                                <footer className="mt-2 text-sm font-semibold text-brand-muted">— {communityStory.quote_attribution}</footer>
                            ) : null}
                        </blockquote>
                    ) : null}
                    <div className="mt-8 flex items-center gap-3">
                        <div className="h-14 w-14 overflow-hidden rounded-full bg-brand-soft">
                            <img src={image} alt={name} className="h-full w-full object-cover object-top" />
                        </div>
                        <div>
                            <p className="font-semibold text-brand-ink">{name}</p>
                            {communityStory.role ? <p className="text-sm text-brand-muted">{communityStory.role}</p> : null}
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={0.1} className="lg:col-span-2">
                    <figure className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-brand-dark">
                        <img src={image} alt={name} className="h-full w-full object-cover object-top" />
                    </figure>
                </FadeIn>
            </div>
        </section>
    );
}
