export default function BrandLogo({ href = '/', light = true, showWordmark = true }) {
    return (
        <a href={href} className="flex min-w-0 shrink-0 items-center gap-2.5" aria-label="Luac Akook Yieu Youth Association home">
            <img
                src="/images/logo.jpg"
                alt=""
                className="h-11 w-11 shrink-0 rounded-full bg-white object-contain ring-1 ring-white/30"
            />
            {showWordmark ? (
                <span className="min-w-0 leading-tight">
                    <span className={`block text-sm font-semibold ${light ? 'text-white' : 'text-brand-ink'}`}>LAYYA</span>
                    <span className={`block max-w-[10.5rem] text-[9px] leading-snug sm:max-w-none sm:text-[10px] ${light ? 'text-white/70' : 'text-brand-muted'}`}>
                        Luac Akook Yieu Youth Association
                    </span>
                </span>
            ) : null}
        </a>
    );
}
