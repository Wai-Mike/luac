import GuestLayout from '@/layouts/GuestLayout';
import ContactCTA from './components/ContactCTA';
import PageHero from './components/PageHero';

export default function Contact() {
    return (
        <GuestLayout title="Contact">
            <PageHero label="Contact" title="Let’s build" italic="together" subtitle="Programs, partnerships, and press — we will respond as soon as we can." />
            <ContactCTA />
        </GuestLayout>
    );
}
