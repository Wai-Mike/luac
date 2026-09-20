import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import PageHero from '../components/PageHero';
import { Check } from 'lucide-react';

export default function YouthCensusThankYou() {
    return (
        <GuestLayout title="Thank you">
            <PageHero
                label="Youth Census"
                title="Thank you"
                subtitle="Your registration is in. If you shared an email, we sent a confirmation there."
            />
            <section className="bg-brand-soft py-16 md:py-24">
                <div className="mx-auto max-w-xl px-4 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="h-9 w-9" />
                    </div>
                    <p className="text-brand-muted">
                        We will contact you if opportunities arise that match your skills or interests.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <GuestButton href={route('youth-census.register')}>Register another youth</GuestButton>
                        <GuestButton href={route('home')} variant="outline">
                            Back to home
                        </GuestButton>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
