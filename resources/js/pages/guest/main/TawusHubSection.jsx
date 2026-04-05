import { Link } from '@inertiajs/react';

function TawusHubGallery({ images = [] }) {
    const imgs = images.slice(0, 4);
    const n = imgs.length;

    const frame =
        'group relative overflow-hidden rounded-2xl bg-slate-100 shadow-lg ring-1 ring-slate-200/80 transition duration-500 hover:shadow-xl hover:ring-brand/25';

    const imgClass =
        'absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]';

    if (n === 0) {
        return (
            <div
                className="flex aspect-[4/3] min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-brand/5 via-slate-50 to-brand-surface/80 text-center text-sm text-slate-400"
                aria-hidden
            >
                Tawus Hub photos coming soon
            </div>
        );
    }

    if (n === 1) {
        return (
            <div className={`${frame} aspect-[4/5] max-h-[520px] w-full max-w-md mx-auto lg:max-w-none`}>
                <img src={imgs[0]} alt="" className={imgClass} loading="lazy" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-60 transition group-hover:opacity-40" />
            </div>
        );
    }

    if (n === 2) {
        return (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {imgs.map((src, i) => (
                    <div key={`${src}-${i}`} className={`${frame} aspect-[4/5]`}>
                        <img src={src} alt="" className={imgClass} loading="lazy" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </div>
                ))}
            </div>
        );
    }

    /* 3 or 4 images: featured column + stack + optional wide strip */
    return (
        <div className="flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className={`${frame} row-span-2 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]`}>
                    <img src={imgs[0]} alt="" className={imgClass} loading="lazy" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand/10 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/35 to-transparent" />
                </div>
                <div className={`${frame} min-h-[124px] sm:min-h-[148px]`}>
                    <img src={imgs[1]} alt="" className={imgClass} loading="lazy" />
                </div>
                <div className={`${frame} min-h-[124px] sm:min-h-[148px]`}>
                    <img src={imgs[2]} alt="" className={imgClass} loading="lazy" />
                </div>
            </div>
            {n >= 4 && (
                <div className={`${frame} w-full min-h-[112px] sm:min-h-[128px]`}>
                    <img src={imgs[3]} alt="" className={imgClass} loading="lazy" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent" />
                </div>
            )}
        </div>
    );
}

export default function TawusHubSection({ stripImages = [] }) {
    return (
        <section className="border-y border-slate-200/80 bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center lg:mb-16">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand">Featured program</p>
                    <h2 className="font-association text-3xl font-semibold tracking-tight text-association-ink sm:text-4xl md:text-[2.35rem]">Tawus Hub</h2>
                    <div className="mx-auto mt-5 h-px w-16 bg-brand/80" aria-hidden />
                    <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
                        A safe space for girls to learn, create, and lead — with hands-on skills and mentorship.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <p className="leading-relaxed text-slate-600">
                            Tawus Hub supports and empowers girls through hands-on activities: decor, braiding, manicure, pedicure, catering basics, and
                            mentorship—building confidence alongside real skills for life and livelihood.
                        </p>
                        <ul className="mt-8 space-y-4 text-slate-700">
                            <li className="flex gap-3 border-b border-slate-100 pb-4">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                                    ✓
                                </span>
                                <span>Practical beauty and styling skills in a respectful, peer-supported setting</span>
                            </li>
                            <li className="flex gap-3 border-b border-slate-100 pb-4">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                                    ✓
                                </span>
                                <span>Event decor, hosting, and teamwork that translate to community events</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                                    ✓
                                </span>
                                <span>Conversations on savings, small business, and healthy ambition</span>
                            </li>
                        </ul>
                        <div className="mainbutton mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href={route('tawus-hub')}
                                className="inline-flex justify-center rounded-sm bg-brand px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-colors hover:bg-brand-dark"
                            >
                                Explore Tawus Hub
                            </Link>
                            <Link
                                href={route('reports')}
                                className="inline-flex justify-center rounded-sm border border-slate-300 bg-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-association-ink transition-colors hover:bg-slate-50"
                            >
                                Reports &amp; updates
                            </Link>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative lg:pl-2">
                            <div
                                className="pointer-events-none absolute -right-2 -bottom-2 hidden h-32 w-32 rounded-2xl bg-brand/8 blur-2xl sm:block"
                                aria-hidden
                            />
                            <TawusHubGallery images={stripImages} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
