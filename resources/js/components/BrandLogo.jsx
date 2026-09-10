export default function BrandLogo({ href = '/', light = true, stacked = false, compact = false }) {
    return (
        <a href={href} className="flex min-w-0 shrink-0 items-center gap-2.5">
            <img
                src="/images/logo.jpg"
                alt="Luac Akook Yieu Youth Association"
                className="h-11 w-11 shrink-0 rounded-full bg-white object-contain ring-1 ring-white/30"
            />
            <span className={`min-w-0 leading-tight ${stacked || compact ? 'hidden sm:block' : ''}`}>
                <span className={`block text-sm font-semibold ${light ? 'text-white' : 'text-brand-ink'}`}>LAYYA</span>
                {compact ? null : (
                    <span className={`block text-[10px] leading-snug ${light ? 'text-white/70' : 'text-brand-muted'}`}>
                        Luac Akook Yieu Youth Association
                    </span>
                )}
            </span>
        </a>
    );
}
