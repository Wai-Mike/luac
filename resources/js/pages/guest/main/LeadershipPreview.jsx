import { Crown, Megaphone, ShieldCheck } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import LeaderCard from '../components/LeaderCard';

export default function LeadershipPreview() {
    const { executiveMembers, councilMembers } = useSiteContent();
    const chair = executiveMembers.find((m) => m.role === 'Chairman') ?? executiveMembers[0];
    const secretaryGeneral = executiveMembers.find((m) => m.role === 'Secretary General') ?? executiveMembers[1];
    const speaker = councilMembers.find((m) => m.role === 'Speaker') ?? councilMembers[0];

    const officers = [
        chair ? { ...chair, icon: Crown, delay: 0 } : null,
        secretaryGeneral ? { ...secretaryGeneral, icon: ShieldCheck, delay: 0.06 } : null,
        speaker ? { ...speaker, icon: Megaphone, delay: 0.12 } : null,
    ].filter(Boolean);

    return (
        <section className="bg-brand-soft py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2>
                            Top <span className="font-fraunces italic text-amber-dark">leadership</span>
                        </h2>
                        <p className="mt-3 text-brand-muted">
                            Chairman, Secretary General, and Speaker — the three top offices of LAYYA.
                        </p>
                    </div>
                    <GuestButton href={route('team')} variant="outline" className="shrink-0">
                        View organogram →
                    </GuestButton>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {officers.map((officer) => (
                        <FadeIn key={officer.role} delay={officer.delay}>
                            <LeaderCard {...officer} featured />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
