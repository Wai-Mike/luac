export default function CommunityPhotoStrip({ images = [] }) {
    if (!images.length) return null;

    return (
        <section className="border-y border-stone-200 bg-stone-100 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-stone-500">Community &amp; programs — snapshot</p>
                <div className="flex gap-3 overflow-x-auto pb-2 sm:gap-4">
                    {images.map((src, i) => (
                        <div
                            key={`${src}-${i}`}
                            className="relative h-36 w-52 flex-shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-stone-200/80 sm:h-44 sm:w-64"
                        >
                            <img
                                src={src}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover object-center"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
