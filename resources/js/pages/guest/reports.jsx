import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Reports & publications — LAYYA" />
            <GuestNavbar />

            <section className="bg-gradient-to-br from-teal-800 to-emerald-900 py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                    <h1 className="text-4xl font-extrabold sm:text-5xl">Reports & updates</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
                        Luac Akok Yieu Youth Association (LAYYA) shares periodic updates on programs, youth activities, and community impact. Full
                        PDFs will be linked here as they are published.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900">What you will find here</h2>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
                        <li>Activity summaries and highlights from youth programs</li>
                        <li>Census or survey summaries when published for the community</li>
                        <li>Annual or project reports approved for public sharing</li>
                    </ul>
                    <p className="mt-6 text-gray-600">
                        There are no downloadable reports hosted on this page yet. When documents are ready, we will list them here with title and
                        date.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={route('contact')}
                            className="inline-flex justify-center rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
                        >
                            Request information
                        </Link>
                        <Link
                            href={route('about')}
                            className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-800 hover:bg-gray-50"
                        >
                            About LAYYA
                        </Link>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
