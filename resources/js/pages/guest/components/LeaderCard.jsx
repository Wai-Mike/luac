export default function LeaderCard({ name, role, image, featured = false }) {
    return (
        <article className={`overflow-hidden rounded-2xl bg-white text-center shadow-sm ${featured ? 'border-2 border-amber' : 'border border-brand/10'}`}>
            <div className="relative mx-auto mt-5 h-28 w-28 overflow-hidden rounded-full bg-brand-dark ring-4 ring-brand-soft">
                {image ? <img src={image} alt={name} className="photo-fill photo-fill-face" /> : null}
            </div>
            <div className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-amber">{role}</p>
                <p className="mt-1 font-display text-lg leading-snug text-brand-ink">{name}</p>
            </div>
        </article>
    );
}
