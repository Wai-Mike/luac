import { Calendar, Heart, Shield, Sparkles, Users, Award } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import useSiteContent from '@/hooks/useSiteContent';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

const items = [
    { label: 'Safe space for girls', icon: Shield },
    { label: 'Hands-on skills labs', icon: Sparkles },
    { label: 'Mentorship circles', icon: Users },
    { label: 'Wellbeing support', icon: Heart },
    { label: 'Showcase events', icon: Calendar },
    { label: 'Peer leadership', icon: Award },
];

export default function TawusHubSpotlight() {
    const { cardImages } = useSiteContent();
    const image = cardImages.tawus || '/images/cover1.jpg';
    const insetImage = cardImages.tawus_inset || '/images/nyalith.jpg';
    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                <FadeIn>
                    <div className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-dark">
                            {image ? <img src={image} alt="" className="photo-fill" /> : null}
                        </div>
                        <div className="absolute -bottom-6 -right-4 w-40 overflow-hidden rounded-3xl border-4 border-white shadow-2xl md:-right-8 md:w-52">
                            <div className="aspect-square bg-brand">
                                {insetImage ? <img src={insetImage} alt="" className="photo-fill photo-fill-cover" /> : null}
                            </div>
                        </div>
                        <div className="absolute -left-2 top-6 rounded-2xl bg-amber px-4 py-3 text-brand-ink shadow-lg md:-left-4">
                            <p className="font-display text-lg font-bold">Tawus Day</p>
                            <p className="text-xs font-medium text-brand-ink/80">Annual cultural celebration</p>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <SectionLabel>Tawus Hub</SectionLabel>
                    <p className="mb-2 text-sm font-semibold text-amber">Featured Program</p>
                    <h2 className="max-w-xl text-4xl xl:text-5xl">
                        A place for
                        <br />
                        girls to grow
                    </h2>
                    <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-brand-muted">
                        Tawus Hub is LAYYA’s girls-centred space for skills, confidence, and community — from decor and braiding to
                        mentorship and celebration.
                    </p>
                    <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {items.map((item) => (
                            <li
                                key={item.label}
                                className="flex items-center gap-3 rounded-2xl border border-brand/10 bg-brand-soft/70 px-3.5 py-3"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                                    <item.icon className="h-4 w-4" />
                                </span>
                                <span className="text-sm font-medium text-brand-ink">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                    <GuestButton href={route('tawus-hub')} className="mt-8">
                        Visit Tawus Hub
                    </GuestButton>
                </FadeIn>
            </div>
        </section>
    );
}
