import FadeIn from './FadeIn';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', light = false }) {
    const alignClass = align === 'left' ? 'text-left' : 'mx-auto max-w-3xl text-center';

    return (
        <FadeIn className={`mb-10 md:mb-14 ${alignClass}`}>
            {eyebrow && (
                <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-white' : 'text-brand'}`}>
                    {eyebrow}
                </p>
            )}
            <h2 className={light ? 'text-white' : 'text-brand-ink'}>{title}</h2>
            {subtitle && <p className={`mt-4 text-[16px] leading-relaxed ${light ? 'text-white/90' : 'text-brand-ink/80'}`}>{subtitle}</p>}
        </FadeIn>
    );
}
