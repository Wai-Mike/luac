import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import PageHero from './components/PageHero';
import { Check } from 'lucide-react';

export default function FundraisingThankYou() {
    return (
        <GuestLayout title="Thank you for giving">
            <PageHero
                label="Fundraising"
                title="Thank you"
                subtitle="Your donation details have been received."
            />
            <section className="bg-brand-soft py-16 md:py-24">
                <div className="mx-auto max-w-xl px-4 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="h-9 w-9" />
                    </div>
                    <p className="text-brand-muted">
                        LAYYA will use this gift for the program you chose and follow up if we need to confirm payment.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <GuestButton href={`${route('fundraising')}#donate`}>Give again</GuestButton>
                        <GuestButton href={route('home')} variant="outline">
                            Back to home
                        </GuestButton>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
