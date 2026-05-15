import FadeIn from './FadeIn';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', light = false }) {
    const alignClass = align === 'left' ? 'text-left' : 'text-center mx-auto max-w-3xl';

    return (
        <FadeIn className={`mb-10 md:mb-14 ${alignClass}`}>
            {eyebrow && (
                <p
                    className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-teal-200' : 'text-teal-600'}`}
                >
                    {eyebrow}
                </p>
            )}
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-slate-900'}`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-slate-200' : 'text-slate-600'}`}>{subtitle}</p>
            )}
        </FadeIn>
    );
}
