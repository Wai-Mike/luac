import { Link, usePage } from '@inertiajs/react';

export default function HeroSection() {
    const { heroImage } = usePage().props;
    const hasPhoto = Boolean(heroImage);

    return (
        <section className="relative flex min-h-[min(88vh,820px)] flex-col justify-center overflow-hidden py-20 sm:py-28">
            {hasPhoto ? (
                <>
                    <img
                        src={heroImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        decoding="async"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/88 via-[#0f172a]/75 to-[#0f766e]/45" aria-hidden />
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#134e4a] to-brand" aria-hidden />
            )}

            {/* Civic theme: subtle grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                }}
                aria-hidden
            />

            <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-teal-100/95 sm:text-xs">Luac Akok Yieu Youth Association</p>
                <h1 className="font-association text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.35rem]">
                    Youth leadership &amp; creativity
                </h1>
                <p className="mx-auto mt-5 max-w-2xl font-sans text-lg font-medium text-slate-200/95 sm:text-xl">
                    Together for a better future — building skills, confidence, and real change for young people and the community.
                </p>

                <div className="mainbutton mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                    <Link
                        href={route('services')}
                        className="inline-flex min-w-[200px] items-center justify-center rounded-sm bg-brand px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-md transition-colors hover:bg-brand-dark"
                    >
                        Explore programs
                    </Link>
                    <Link
                        href={route('tawus-hub')}
                        className="inline-flex min-w-[200px] items-center justify-center rounded-sm border-2 border-white/90 bg-transparent px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                    >
                        Tawus Hub for girls
                    </Link>
                </div>
            </div>
        </section>
    );
}
