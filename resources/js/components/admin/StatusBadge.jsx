import { GREEN, GREEN_SOFT, GOLD, GOLD_SOFT, MUTED, RED, RED_SOFT, SURFACE } from '@/lib/admin-theme';

const TONES = {
    verified: { bg: GREEN_SOFT, text: GREEN, dot: GREEN },
    published: { bg: GREEN_SOFT, text: GREEN, dot: GREEN },
    active: { bg: GREEN_SOFT, text: GREEN, dot: GREEN },
    approved: { bg: GREEN_SOFT, text: GREEN, dot: GREEN },
    reconciled: { bg: GREEN_SOFT, text: GREEN, dot: GREEN },
    pending: { bg: GOLD_SOFT, text: '#A66B19', dot: GOLD },
    draft: { bg: GOLD_SOFT, text: '#A66B19', dot: GOLD },
    inactive: { bg: SURFACE, text: MUTED, dot: MUTED },
    flagged: { bg: RED_SOFT, text: RED, dot: RED },
    rejected: { bg: RED_SOFT, text: RED, dot: RED },
};

export default function StatusBadge({ status = 'pending', label }) {
    const key = String(status || 'pending').toLowerCase();
    const tone = TONES[key] ?? TONES.pending;

    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
            style={{ background: tone.bg, color: tone.text }}
        >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.dot }} />
            {label || key}
        </span>
    );
}
