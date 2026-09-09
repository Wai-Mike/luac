import FadeIn from './FadeIn';

export default function TeamCard({ name, role, bio, image, delay = 0 }) {
    return (
        <FadeIn delay={delay}>
            <article className="flex h-full flex-col overflow-hidden border border-brand/25 bg-white">
                <div className="relative h-72 overflow-hidden bg-brand-soft sm:h-80">
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-contain object-center" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <h3>{name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">{role}</p>
                    <p className="mt-4 text-[16px] leading-relaxed text-brand-ink/80">{bio}</p>
                </div>
            </article>
        </FadeIn>
    );
}
