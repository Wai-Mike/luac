import GuestLayout from '@/layouts/GuestLayout';
import TeamCard from './components/TeamCard';
import SectionHeader from './components/SectionHeader';
import { teamMembers } from './data/siteContent';

export default function Team({ teamGallery = [] }) {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-white pb-20 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Leadership"
                        title="Meet the team"
                        subtitle="Guided by youth organizers and community-rooted leaders committed to lasting impact."
                    />
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((m, i) => (
                            <TeamCard
                                key={m.name}
                                name={m.name}
                                role={m.role}
                                bio={m.bio}
                                image={teamGallery[i] ?? m.image}
                                delay={i * 0.08}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
