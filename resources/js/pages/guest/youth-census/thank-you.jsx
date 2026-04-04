import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';

export default function YouthCensusThankYou() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-brand via-slate-50 to-brand-surface">
            <Head title="Thank You - LAYYA Youth Census" />
            <GuestNavbar />

            <main className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand text-brand shadow-lg">
                    <span className="text-2xl">✓</span>
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    Luac Akok Yieu Youth Association
                </p>
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Thank you for registering!</h1>
                <p className="mt-3 text-sm text-slate-600">
                    Your information has been received. Together, we are building a stronger, more empowered generation of
                    youth in Luac Akok Yieu.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href={route('youth-census.overview')}
                        className="inline-flex items-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:shadow-lg hover:brightness-105"
                    >
                        View youth census overview
                    </Link>
                    <Link
                        href={route('home')}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                        Back to home
                    </Link>
                </div>
            </main>

            <GuestFooter />
        </div>
    );
}

