import { Check } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

const items = [
    'Safe space for girls',
    'Hands-on skills labs',
    'Mentorship circles',
    'Wellbeing support',
    'Showcase events',
    'Peer leadership',
];

export default function TawusHubSpotlight({ image, insetImage }) {
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
                            <p className="text-xs text-white/80">Annual cultural celebration</p>
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
                            <li key={item} className="flex items-center gap-2 text-sm text-brand-ink">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft">
                                    <Check className="h-3.5 w-3.5 text-brand" />
                                </span>
                                {item}
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
