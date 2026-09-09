import GuestLayout from '@/layouts/GuestLayout';
import ContactCTA from './components/ContactCTA';
import PageHero from './components/PageHero';

export default function GetInvolved() {
    return (
        <GuestLayout title="Get involved">
            <PageHero label="Get involved" title="There is a place" italic="for you" />
            <ContactCTA />
        </GuestLayout>
    );
}
