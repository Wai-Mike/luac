export default function BrandLogo({ href = '/', light = true, stacked = false }) {
    return (
        <a href={href} className="flex min-w-0 items-center gap-2.5">
            <img
                src="/images/logo.jpg"
                alt="Luac Akook Yieu Youth Association"
                className="h-12 w-12 shrink-0 rounded-full bg-white object-contain ring-1 ring-white/30"
            />
            <span className={`min-w-0 leading-tight ${stacked ? 'hidden sm:block' : ''}`}>
                <span className={`block text-sm font-semibold ${light ? 'text-white' : 'text-brand-ink'}`}>LAYYA</span>
                <span className={`block text-[10px] leading-snug ${light ? 'text-white/70' : 'text-brand-muted'}`}>
                    Luac Akook Yieu Youth Association
                </span>
            </span>
        </a>
    );
}
