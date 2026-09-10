import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import useSiteContent, { splitLines } from '@/hooks/useSiteContent';

export default function LayyaHeroSection({ heroImage }) {
    const { hero, heroStats } = useSiteContent();
    const headlineLines = splitLines(hero.headline);

    return (
        <section className="bg-brand-dark pt-16">
            <div className="relative">
                {heroImage ? (
                    <img
                        src={heroImage}
                        alt="Luac Akook Yieu Youth Association"
                        className="mx-auto block h-[min(48svh,20rem)] w-full max-w-none object-contain object-center md:h-[calc(100svh-4rem)]"
                    />
                ) : (
                    <div className="h-[50vh] bg-brand-dark" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/25 to-transparent" />
                <div className="absolute right-4 top-4 sm:right-8">
                    <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-xs text-brand-light backdrop-blur-sm">
                        {hero.location || 'Juba · Khorfulus'}
                    </span>
                </div>
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-12 bg-amber" />
                    <p className="text-[12px] font-semibold uppercase tracking-widest text-cream sm:text-[12px]">
                        <span className="hidden sm:inline">Luac Akook Yieu Youth Association</span>
                        <span className="sm:hidden">LAYYA</span>
                    </p>
                </div>
                <h1 className="max-w-5xl font-semibold text-white">
                    {headlineLines.map((line, index) => (
                        <span key={line}>
                            {index > 0 ? <br /> : null}
                            {line}
                        </span>
                    ))}
                </h1>
                <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-white/75 sm:text-[19px] md:text-[21px]">{hero.subtext}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <GuestButton href={route('get-involved')}>
                        Get involved <ArrowRight className="h-4 w-4" />
                    </GuestButton>
                    <GuestButton href={route('programs')} variant="ghost">
                        Explore programs <ChevronRight className="h-4 w-4" />
                    </GuestButton>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
                    {heroStats.map((stat) => (
                        <div key={stat.label} className="bg-[rgba(0,40,40,0.45)] px-3 py-4 backdrop-blur-[8px] sm:px-4 sm:py-5">
                            <p className="font-display text-[22px] font-bold text-white sm:text-[28px] md:text-[32px]">{stat.value}</p>
                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/55 sm:text-[11px]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
            <ChevronDown className="mx-auto mb-6 block h-6 w-6 animate-bounce text-white/50" />
        </section>
    );
}
