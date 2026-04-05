export default function CommunityPhotoStrip({ images = [] }) {
    if (!images.length) return null;

    return (
        <section className="border-y border-slate-800/20 bg-[#0a1628] py-0">
            <div className="border-b border-white/10 py-8 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-teal-200/90">Community &amp; programs</p>
                <h2 className="mt-2 font-association text-2xl font-semibold text-white sm:text-3xl">Snapshot gallery</h2>
            </div>
            <div className="overflow-x-auto py-6">
                <div className="flex min-w-min gap-0">
                    {images.map((src, i) => (
                        <div key={`${src}-${i}`} className="relative h-48 w-[min(100vw,320px)] flex-shrink-0 sm:h-56 sm:w-80">
                            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 to-transparent" aria-hidden />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
