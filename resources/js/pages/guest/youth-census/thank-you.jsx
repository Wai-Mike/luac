import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import { Check } from 'lucide-react';

export default function YouthCensusThankYou() {
    return (
        <GuestLayout title="Thank you">
            <section className="bg-brand-soft pt-32 pb-20 md:pb-28">
                <div className="mx-auto max-w-xl px-4 py-16 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="h-9 w-9" />
                    </div>
                    <h1 className="text-[clamp(2rem,4vw,3rem)]">Thank you.</h1>
                    <p className="mt-4 text-brand-muted">
                        Your information helps LAYYA plan skills, mentorship, and opportunities for Luac Akook Yieu youth.
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
