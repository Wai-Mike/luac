import FadeIn from './FadeIn';
import GuestButton from '@/components/GuestButton';

export default function CTASection({
    title,
    text,
    primaryHref,
    primaryLabel,
    secondaryHref,
    secondaryLabel,
    tertiaryHref,
    tertiaryLabel,
}) {
    return (
        <section className="bg-brand py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                <FadeIn>
                    <h2 className="text-white">{title}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-white/90">{text}</p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                        {primaryHref && (
                            <GuestButton href={primaryHref} variant="inverse">
                                {primaryLabel}
                            </GuestButton>
                        )}
                        {secondaryHref && (
                            <GuestButton href={secondaryHref} variant="inverse">
                                {secondaryLabel}
                            </GuestButton>
                        )}
                        {tertiaryHref && (
                            <GuestButton href={tertiaryHref} variant="inverse">
                                {tertiaryLabel}
                            </GuestButton>
                        )}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
