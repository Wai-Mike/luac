import { Link, usePage } from '@inertiajs/react';

export default function HeroSection() {
    const { heroImage } = usePage().props;
    const hasPhoto = Boolean(heroImage);

    return (
        <section className="relative flex min-h-[min(78vh,720px)] items-center overflow-hidden py-16 sm:py-24">
            {hasPhoto ? (
                <>
                    <img
                        src={heroImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        decoding="async"
                        fetchPriority="high"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-brand/65 to-teal-500/35"
                        aria-hidden
                    />
                </>
            ) : (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-800 via-brand to-teal-500"
                    aria-hidden
                />
            )}

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Youth leadership & creativity
                        <span className="mt-2 block text-2xl font-semibold text-brand-foreground sm:text-3xl lg:text-4xl">
                            across Luac Akok Yieu
                        </span>
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-slate-100 sm:text-xl">
                        Together for a better future — building skills, confidence, and real change for young people and the community.
                    </p>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                            href={route('services')}
                            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
                        >
                            Explore programs
                        </Link>
                        <Link
                            href={route('tawus-hub')}
                            className="inline-flex items-center justify-center rounded-md border-2 border-white/80 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            Tawus Hub for girls
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
