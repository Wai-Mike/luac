import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from './FadeIn';
import LeaderCard from './LeaderCard';
import SectionLabel from './SectionLabel';

function Branch() {
    return (
        <div className="flex flex-col items-center">
            <div className="h-8 w-px bg-amber" />
            <div className="h-px w-16 bg-amber md:w-24" />
        </div>
    );
}

export default function Organogram() {
    const { executiveMembers, councilMembers } = useSiteContent();
    const chair = executiveMembers[0];
    const rest = executiveMembers.slice(1);
    const speaker = councilMembers[0];
    const council = councilMembers.slice(1);

    return (
        <div className="space-y-20">
            <div>
                <div className="mb-10 text-center">
                    <SectionLabel>Executive committee</SectionLabel>
                    <h2>17 members, including the Chairman</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-brand-muted">
                        The executive leads LAYYA day to day and represents the youth of Luac community.
                    </p>
                </div>
                <FadeIn>
                    <div className="mx-auto max-w-xs">
                        <LeaderCard {...chair} featured />
                    </div>
                </FadeIn>
                <Branch />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {rest.map((m, i) => (
                        <FadeIn key={`${m.role}-${i}`} delay={i * 0.03}>
                            <LeaderCard {...m} />
                        </FadeIn>
                    ))}
                </div>
            </div>

            <div>
                <div className="mb-10 text-center">
                    <SectionLabel>Youth council</SectionLabel>
                    <h2>Seven members, headed by the Speaker</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-brand-muted">
                        The council supports the executive and speaks for Luac youth.
                    </p>
                </div>
                <FadeIn>
                    <div className="mx-auto max-w-xs">
                        <LeaderCard {...speaker} featured />
                    </div>
                </FadeIn>
                <Branch />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {council.map((m, i) => (
                        <FadeIn key={`${m.role}-${i}`} delay={i * 0.04}>
                            <LeaderCard {...m} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    );
}
