import { Link } from '@inertiajs/react';

export default function DepartmentQuickAction({ href, label, icon: Icon, comingSoon }) {
    const base =
        'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(29,84,114)] focus-visible:ring-offset-2';

    if (!href || comingSoon) {
        return (
            <span
                title={comingSoon ? 'Coming soon' : undefined}
                className={`${base} cursor-not-allowed border-dashed border-slate-300 bg-white/70 text-slate-500`}
            >
                {Icon ? <Icon className="h-4 w-4 shrink-0 text-[rgb(29,84,114)]/70" /> : null}
                {label}
                {comingSoon ? <span className="text-[10px] font-semibold uppercase text-amber-600">Soon</span> : null}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className={`${base} border-slate-200 bg-white text-slate-800 hover:border-[rgb(29,84,114)]/40 hover:bg-[rgb(29,84,114)]/[0.04]`}
        >
            {Icon ? <Icon className="h-4 w-4 shrink-0 text-[rgb(29,84,114)]" /> : null}
            {label}
        </Link>
    );
}
