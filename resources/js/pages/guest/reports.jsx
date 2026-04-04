import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';

function statusLabel(status) {
    switch (status) {
        case 'upcoming':
            return { text: 'Coming soon', className: 'bg-brand-surface text-brand ring-brand/20' };
        case 'placeholder':
            return { text: 'To be published', className: 'bg-stone-100 text-stone-700 ring-stone-200' };
        default:
            return { text: 'Planned', className: 'bg-brand text-white ring-brand/30' };
    }
}

export default function ReportsPage({ reportGallery = [], reports = [] }) {
    return (
        <div className="min-h-screen bg-stone-50">
            <Head title="Reports & publications — LAYYA" />
            <GuestNavbar />

            <section className="relative flex min-h-[min(52vh,480px)] items-center overflow-hidden">
                <div className="absolute inset-0">
                    {reportGallery[0] ? (
                        <img src={reportGallery[0]} alt="" className="absolute inset-0 h-full w-full object-cover object-center" decoding="async" />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand to-brand-light" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/90 via-emerald-900/85 to-stone-950/90" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Reports &amp; updates</h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-brand">
                        Periodic summaries of LAYYA programs, Tawus Hub activities, youth outreach, and community impact. Downloadable PDFs will appear
                        here when approved for public sharing.
                    </p>
                </div>
            </section>

            {reportGallery.length > 1 && (
                <section className="border-b border-stone-200 bg-white py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                            {reportGallery.slice(1).map((src, i) => (
                                <div key={`${src}-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm ring-1 ring-stone-200">
                                    <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">Planned publications</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-stone-600">
                        We are preparing clear, community-friendly reports. Until files are hosted, you can request information by email or through our
                        contact form.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-1">
                    {reports.map((report, idx) => {
                        const { text, className } = statusLabel(report.status);
                        return (
                            <article
                                key={idx}
                                className="flex flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition hover:shadow-md sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${className}`}>{text}</span>
                                        <span className="text-sm font-medium text-stone-500">{report.period}</span>
                                    </div>
                                    <h3 className="mt-3 text-xl font-bold text-stone-900">{report.title}</h3>
                                    <p className="mt-2 text-stone-600 leading-relaxed">{report.summary}</p>
                                </div>
                                <div className="mt-6 flex shrink-0 sm:mt-0">
                                    <span className="inline-flex items-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-500">
                                        PDF not yet linked
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-8 rounded-2xl border border-teal-200 bg-gradient-to-br from-brand to-brand-light p-8">
                    <h3 className="text-lg font-semibold text-brand">Request a report or data</h3>
                    <p className="mt-2 text-brand/90">
                        Partners, schools, and community leaders can write to us for approved summaries or to discuss collaboration.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={route('contact')}
                            className="inline-flex justify-center rounded-lg bg-brand px-5 py-3 font-medium text-white hover:bg-brand"
                        >
                            Contact LAYYA
                        </Link>
                        <Link
                            href={route('tawus-hub')}
                            className="inline-flex justify-center rounded-lg border border-teal-300 bg-white px-5 py-3 font-medium text-brand hover:bg-brand"
                        >
                            About Tawus Hub
                        </Link>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
