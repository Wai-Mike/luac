export default function LeaderCard({ name, role, image, featured = false, icon: Icon }) {
    if (featured) {
        return (
            <article className="group relative overflow-hidden rounded-2xl bg-brand-dark text-center">
                <div className="relative aspect-[3/4] overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-brand" aria-hidden="true" />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/25 to-transparent" aria-hidden="true" />
                    <span className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-amber px-3 py-1 text-[11px] font-semibold text-brand-ink">
                        {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                        {role}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-lg font-semibold leading-snug text-[#f3ece0] sm:text-xl">{name}</p>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="overflow-hidden rounded-2xl border border-brand/10 bg-white">
            <div className="relative aspect-[4/5] bg-brand-dark">
                {image ? (
                    <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover object-top" />
                ) : null}
            </div>
            <div className="p-3.5">
                <p className="text-xs font-semibold text-brand">{role}</p>
                <p className="mt-0.5 font-semibold leading-snug text-brand-ink">{name}</p>
            </div>
        </article>
    );
}
