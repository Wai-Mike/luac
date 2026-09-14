import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { BORDER, GREEN, INK, MUTED, RED, TEAL } from '@/lib/admin-theme';

export default function KpiCard({
    icon: Icon,
    accent = TEAL,
    iconBg,
    value,
    label,
    hint,
    delta,
    deltaLabel,
}) {
    const positive = delta == null ? null : Number(delta) >= 0;

    return (
        <article className="flex min-h-[8.25rem] min-w-0 flex-col overflow-hidden bg-white p-4 sm:min-h-[9.5rem] sm:p-5" style={{ border: `1px solid ${BORDER}`, borderRadius: 14 }}>
            <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium" style={{ color: MUTED }}>{label}</p>
                    <p className="font-manrope mt-2 break-words text-[clamp(1.15rem,2.4vw,1.875rem)] font-semibold leading-tight" style={{ color: INK }}>{value}</p>
                </div>
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ background: iconBg || `${accent}18`, color: accent }}
                >
                    {Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} /> : null}
                </div>
            </div>
            <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2 text-[12px] break-words" style={{ color: MUTED }}>
                {delta != null ? (
                    <span className="inline-flex items-center gap-0.5 font-semibold" style={{ color: positive ? GREEN : RED }}>
                        {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        {positive ? '+' : ''}
                        {delta}%
                    </span>
                ) : null}
                {hint ? <span className="min-w-0 break-words">{hint}</span> : null}
                {deltaLabel ? <span className="min-w-0 break-words">{deltaLabel}</span> : null}
            </div>
        </article>
    );
}
