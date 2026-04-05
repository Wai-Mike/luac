const stats = [
    { value: '10+', label: 'Years of youth action' },
    { value: '500+', label: 'Young people reached' },
    { value: '12+', label: 'Programs & initiatives' },
    { value: '1', label: 'Community-first mission' },
];

export default function ImpactStatsSection() {
    return (
        <section className="relative border-y border-white/10 bg-association-band py-10 text-white">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,118,110,0.12),transparent_40%,transparent_60%,rgba(15,118,110,0.08))]" aria-hidden />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {stats.map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="font-association text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.75rem]">{s.value}</p>
                            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-teal-100/90">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
