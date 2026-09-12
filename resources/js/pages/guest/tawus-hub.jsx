import { Check } from 'lucide-react';
import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import FadeIn from './components/FadeIn';
import PageHero from './components/PageHero';
import SectionLabel from './components/SectionLabel';
import useSiteContent from '@/hooks/useSiteContent';

export default function TawusHub({ heroImage }) {
    const { tawusHub, cardImages } = useSiteContent();
    const skills = tawusHub.skills?.length ? tawusHub.skills : ['Decor & event styling', 'Braiding & beauty', 'Manicure & pedicure', 'Mentorship circles', 'Wellbeing support', 'Peer leadership'];
    const featuredImage = cardImages.tawus || '/images/cover1.jpg';
    const insetImage = cardImages.tawus_inset || '/images/nyalith.jpg';
    const galleryImages = (cardImages.tawus_gallery?.length ? cardImages.tawus_gallery : [featuredImage, insetImage]).slice(0, 6);
    return (
        <GuestLayout title="Tawus Hub">
            <PageHero
                label="Tawus Hub"
                title="A place for"
                italic="girls to grow"
                subtitle={tawusHub.subtitle || 'LAYYA’s girls-centred space for skills, confidence, and community — from crafts and beauty labs to mentorship and Tawus Day.'}
                image={heroImage}
            />
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <FadeIn>
                        <div className="relative">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-dark">
                                {featuredImage ? (
                                    <img src={featuredImage} alt="" className="photo-fill" />
                                ) : null}
                            </div>
                            <div className="absolute -bottom-6 -right-4 w-40 overflow-hidden rounded-3xl border-4 border-white shadow-2xl md:-right-8 md:w-52">
                                <div className="relative aspect-square bg-brand">
                                    {insetImage ? (
                                        <img src={insetImage} alt="" className="photo-fill" />
                                    ) : null}
                                </div>
                            </div>
                            <div className="absolute -left-2 top-6 rounded-2xl bg-amber px-4 py-3 text-brand-ink shadow-lg md:-left-4">
                                <p className="font-display text-lg font-bold">Tawus Day</p>
                                <p className="text-xs font-medium text-brand-ink/80">Annual cultural celebration</p>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <SectionLabel>Featured Program</SectionLabel>
                        <p className="mb-2 text-sm font-semibold text-amber">Tawus Hub</p>
                        <h2>
                            Skills, sisterhood
                            <br />
                            and celebration
                        </h2>
                        <p className="mt-5 text-[16px] leading-relaxed text-brand-muted">
                            {tawusHub.body || 'Tawus Hub is a trusted room for girls in Luac Akook Yieu — a place to learn a trade, practise leadership, and be seen.'}
                        </p>
                        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {skills.map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-brand-ink">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft">
                                        <Check className="h-3.5 w-3.5 text-brand" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <GuestButton href={route('youth-census.register')} className="mt-8">
                            Register a youth
                        </GuestButton>
                    </FadeIn>
                </div>
            </section>
            <section className="bg-brand-soft py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
                    {galleryImages.slice(0, 6).map((src, i) => (
                        <FadeIn key={`${src}-${i}`} delay={i * 0.05}>
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-dark">
                                <img src={src} alt="" className="photo-fill" />
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
