import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import { Check } from 'lucide-react';

export default function FundraisingThankYou() {
    return (
        <GuestLayout title="Thank you for giving">
            <section className="bg-brand-soft pt-32 pb-20 md:pb-28">
                <div className="mx-auto max-w-xl px-4 py-16 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="h-9 w-9" />
                    </div>
                    <h1 className="text-[clamp(2rem,4vw,3rem)]">Thank you</h1>
                    <p className="mt-4 text-brand-muted">
                        Your donation details have been received. LAYYA will use this gift for the program you chose and
                        follow up if we need to confirm payment.
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
