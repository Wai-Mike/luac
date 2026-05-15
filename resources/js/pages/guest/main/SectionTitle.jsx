/** Section heading — clear hierarchy + optional supporting line */
export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="mb-12 text-center sm:mb-14 lg:mb-[52px]">
            <h2 className="font-sans text-3xl font-semibold capitalize leading-tight tracking-tight text-[#131c33] sm:text-[2.25rem]">{title}</h2>
            <div className="mx-auto mt-4 flex w-16 justify-center" aria-hidden>
                <span className="h-1 w-full rounded-full bg-[#3b60c9]" />
            </div>
            {subtitle ? (
                <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-[#3a3b3c]/90 sm:text-lg">{subtitle}</p>
            ) : null}
        </div>
    );
}
