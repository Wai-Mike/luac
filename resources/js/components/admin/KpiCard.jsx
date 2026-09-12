import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { BORDER, hexTint, TEAL } from '@/lib/admin-theme';

export default function KpiCard({ icon: Icon, accent = TEAL, value, label, hint, delta }) {
    const positive = delta == null ? null : Number(delta) >= 0;

    return (
        <div className="min-w-0 rounded-2xl bg-white p-4 sm:p-5" style={{ border: `1px solid ${BORDER}` }}>
            <div className="flex items-start justify-between gap-3">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: hexTint(accent), color: accent }}
                >
                    {Icon ? <Icon className="h-[17px] w-[17px]" /> : null}
                </div>
                {delta != null ? (
                    <span
                        className="inline-flex items-center gap-0.5 text-xs font-semibold"
                        style={{ color: positive ? '#2e7d32' : '#c62828' }}
                    >
                        {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        {positive ? '+' : ''}
                        {delta}%
                    </span>
                ) : null}
            </div>
            <p className="mt-3 truncate font-fraunces text-2xl font-bold text-brand-ink">{value}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-brand-muted">{label}</p>
            {hint ? <p className="mt-1 text-xs text-brand-muted">{hint}</p> : null}
        </div>
    );
}
