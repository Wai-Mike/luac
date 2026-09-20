export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="mb-12 text-center sm:mb-14 lg:mb-[52px]">
            <h2 className="text-brand-ink">{title}</h2>
            {subtitle ? (
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">{subtitle}</p>
            ) : null}
        </div>
    );
}
