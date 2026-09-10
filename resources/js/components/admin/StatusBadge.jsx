const TONES = {
    verified: { bg: '#e8f5e9', text: '#2e7d32', dot: '#4caf50' },
    published: { bg: '#e8f5e9', text: '#2e7d32', dot: '#4caf50' },
    active: { bg: '#e8f5e9', text: '#2e7d32', dot: '#4caf50' },
    approved: { bg: '#e8f5e9', text: '#2e7d32', dot: '#4caf50' },
    pending: { bg: '#fdf3e7', text: '#9a6b24', dot: '#c9b15c' },
    draft: { bg: '#fdf3e7', text: '#9a6b24', dot: '#c9b15c' },
    inactive: { bg: '#f3f4f6', text: '#6b7280', dot: '#9ca3af' },
    flagged: { bg: '#fce8ee', text: '#c62828', dot: '#e53935' },
};

export default function StatusBadge({ status = 'pending', label }) {
    const key = String(status || 'pending').toLowerCase();
    const tone = TONES[key] ?? TONES.pending;

    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
            style={{ background: tone.bg, color: tone.text }}
        >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.dot }} />
            {label || key}
        </span>
    );
}
