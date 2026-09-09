import GuestLayout from '@/layouts/GuestLayout';
import Organogram from './components/Organogram';
import PageHero from './components/PageHero';

export default function Team() {
    return (
        <GuestLayout title="Leadership">
            <PageHero
                label="Leadership"
                title="How LAYYA"
                italic="is structured"
                subtitle="LAYYA is led by 17 executive members, including the Chairman, and a council of seven members headed by the Speaker."
                image="/images/cover1.jpg"
            />
            <section className="bg-brand-soft py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Organogram />
                </div>
            </section>
        </GuestLayout>
    );
}
