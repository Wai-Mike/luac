export default function SectionLabel({ children, light = false }) {
    return (
        <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-12 bg-amber" />
            <p className={`text-[12px] font-semibold uppercase tracking-widest ${light ? 'text-cream' : 'text-amber'}`}>{children}</p>
        </div>
    );
}
