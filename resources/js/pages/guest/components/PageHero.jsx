import { Link } from '@inertiajs/react';

const DEFAULT_IMAGE = '/images/hero/cover.jpg';

export default function PageHero({ label, title, italic, subtitle, image = DEFAULT_IMAGE }) {
    const crumb = label || title;

    return (
        <section className="relative isolate overflow-hidden bg-brand-dark pt-16 text-white">
            <div className="relative">
                {image ? (
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-[#061616]" aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-brand-ink/55" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/60 to-brand-ink/25" aria-hidden="true" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <nav className="mb-1.5 flex flex-wrap items-center gap-x-2 text-[11px] font-medium text-white/55" aria-label="Breadcrumb">
                        <Link href={route('home')} className="transition hover:text-white">
                            Home
                        </Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-amber">{crumb}</span>
                    </nav>
                    <h1 className="max-w-3xl text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold leading-tight text-white">
                        {title}
                        {italic ? <span className="italic text-amber"> {italic}</span> : null}
                    </h1>
                    {subtitle ? <p className="mt-1.5 max-w-2xl text-sm leading-snug text-white/70">{subtitle}</p> : null}
                </div>
            </div>
        </section>
    );
}
