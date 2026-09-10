import { BORDER } from '@/lib/admin-theme';

const DEFAULT_KEYS = ['count', 'participants', 'value', 'total'];

export default function ChartTip({ active, payload, label }) {
    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div className="rounded-xl bg-white px-3 py-2.5 shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
            {label ? <p className="mb-1 text-xs text-brand-muted">{label}</p> : null}
            {payload.map((entry) => {
                const name = entry.name || entry.dataKey;
                const showName = name && !DEFAULT_KEYS.includes(String(name).toLowerCase());
                return (
                    <div key={String(name)} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: entry.color || entry.fill }} />
                        <span className="text-sm font-semibold text-brand-ink">{entry.value}</span>
                        {showName ? <span className="text-xs text-brand-muted">{name}</span> : null}
                    </div>
                );
            })}
        </div>
    );
}
