import { Link } from '@inertiajs/react';

export default function TawusHubSection({ stripImages = [] }) {
    return (
        <section className="border-y border-gray-200 bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div>
                        <div className="mb-3 inline-flex rounded-full border border-gray-200 bg-brand-surface px-3 py-1 text-sm font-medium text-brand">
                            Tawus Hub
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            A safe space for girls to learn, create, and lead
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-gray-600">
                            Tawus Hub supports and empowers girls through hands-on activities: decor, braiding, manicure, pedicure, catering basics, and
                            mentorship—building confidence alongside real skills for life and livelihood.
                        </p>
                        <ul className="mt-6 space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-brand">✓</span>
                                <span>Practical beauty and styling skills in a respectful, peer-supported setting</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-brand">✓</span>
                                <span>Event decor, hosting, and teamwork that translate to community events</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-brand">✓</span>
                                <span>Conversations on savings, small business, and healthy ambition</span>
                            </li>
                        </ul>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={route('tawus-hub')}
                                className="inline-flex justify-center rounded-md bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-light"
                            >
                                Explore Tawus Hub
                            </Link>
                            <Link
                                href={route('reports')}
                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-800 transition-colors hover:bg-gray-50"
                            >
                                Reports & updates
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {stripImages.slice(0, 4).map((src, i) => (
                            <div
                                key={`${src}-${i}`}
                                className={`relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm ${i === 1 || i === 2 ? 'mt-6 sm:mt-8' : ''}`}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
