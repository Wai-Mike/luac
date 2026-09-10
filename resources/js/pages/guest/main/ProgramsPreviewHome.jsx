import { HeartHandshake, Lightbulb, Sparkles, Users, Wallet, Palette } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

const icons = [Users, HeartHandshake, Sparkles, Lightbulb, Wallet, Palette];

export default function ProgramsPreviewHome({ images = [] }) {
    const { programs } = useSiteContent();
    return (
        <section className="bg-brand-soft py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Programs</SectionLabel>
                        <h2>
                            Where youth
                            <br />
                            lead the work
                        </h2>
                    </div>
                    <GuestButton href={route('programs')} variant="outline">
                        View all programs →
                    </GuestButton>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {programs.slice(0, 5).map((p, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <FadeIn key={p.title} delay={i * 0.08}>
                                <a href={route('programs')} className="group relative block h-72 overflow-hidden rounded-3xl bg-brand-dark">
                                    {images[i] ? (
                                        <img
                                            src={images[i]}
                                            alt=""
                                            className="photo-fill opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,30,30,0.9)] to-transparent to-55%" />
                                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                        <Icon className="h-3.5 w-3.5" /> {p.title.split(' ')[0]}
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-6">
                                        <h3 className="font-display text-xl text-white">{p.title}</h3>
                                        <p className="mt-2 text-sm text-white/70">{p.summary || p.body}</p>
                                        <p className="mt-3 text-sm font-semibold text-brand-light">Learn more →</p>
                                    </div>
                                </a>
                            </FadeIn>
                        );
                    })}
                    <FadeIn delay={0.4}>
                        <a href={route('youth-census.register')} className="flex h-72 flex-col justify-between rounded-3xl bg-brand p-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                                <Users className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl text-white">Join the youth census</h3>
                                <p className="mt-2 text-sm text-white/70">Help us map skills, needs, and opportunities across Luac Akook Yieu.</p>
                                <p className="mt-4 font-semibold text-amber">Register now →</p>
                            </div>
                        </a>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
