import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import LeaderCard from '../components/LeaderCard';
import SectionLabel from '../components/SectionLabel';

export default function LeadershipPreview() {
    const { executiveMembers, councilMembers } = useSiteContent();
    const chair = executiveMembers.find((m) => m.role === 'Chairman') ?? executiveMembers[0];
    const secretaryGeneral = executiveMembers.find((m) => m.role === 'Secretary General') ?? executiveMembers[1];
    const speaker = councilMembers.find((m) => m.role === 'Speaker') ?? councilMembers[0];

    return (
        <section className="bg-brand-soft py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Leadership</SectionLabel>
                        <h2>
                            Top leadership
                        </h2>
                        <p className="mt-3 max-w-xl text-brand-muted">
                            Chairman, Secretary General, and Speaker — the three top offices of LAYYA.
                        </p>
                    </div>
                    <GuestButton href={route('team')} variant="outline">
                        View organogram →
                    </GuestButton>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {chair ? (
                        <FadeIn>
                            <LeaderCard {...chair} featured />
                        </FadeIn>
                    ) : null}
                    {secretaryGeneral ? (
                        <FadeIn delay={0.06}>
                            <LeaderCard {...secretaryGeneral} featured />
                        </FadeIn>
                    ) : null}
                    {speaker ? (
                        <FadeIn delay={0.1}>
                            <LeaderCard {...speaker} featured />
                        </FadeIn>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
