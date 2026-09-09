import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

export default function CommunityStory({ image }) {
    return (
        <section className="bg-white py-20 md:py-28">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
                <FadeIn className="lg:col-span-3">
                    <SectionLabel>Community story</SectionLabel>
                    <h2>
                        Tawus Day builds
                        <br />
                        skills and leadership
                    </h2>
                    <p className="mt-5 text-[16px] leading-relaxed text-brand-muted">
                        Each year, Tawus Day brings girls, mentors, and families together to celebrate culture and the skills
                        learned at Tawus Hub — braiding, decor, wellbeing, and the confidence to lead.
                    </p>
                    <p className="mt-4 text-[16px] leading-relaxed text-brand-muted">
                        Stories like these remind us why LAYYA exists: so young people in Luac Akook Yieu can be seen, trained,
                        and trusted with real responsibility.
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-brand-soft">
                            {image ? <img src={image} alt="" className="h-full w-full object-contain" /> : null}
                        </div>
                        <div>
                            <p className="font-semibold text-brand-ink">Grace Achan Deng</p>
                            <p className="text-sm text-brand-muted">Youth mentor, Tawus Hub</p>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={0.1} className="lg:col-span-2">
                    <figure className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-brand-dark">
                        {image ? <img src={image} alt="" className="photo-fill" /> : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <span className="absolute bottom-5 left-5 rounded-full bg-amber px-3 py-1 text-xs font-semibold text-brand-ink">
                            Featured Story ★
                        </span>
                    </figure>
                </FadeIn>
            </div>
        </section>
    );
}
