export default function SectionLabel({ children, light = false }) {
    return (
        <div className="mb-3">
            <p
                className={`inline-flex items-center rounded-full bg-brand-dark px-3.5 py-1 text-[12px] font-semibold uppercase tracking-widest text-white ${
                    light ? 'ring-1 ring-white/30' : ''
                }`}
            >
                {children}
            </p>
        </div>
    );
}
