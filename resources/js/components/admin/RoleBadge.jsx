const TONES = {
    admin: { bg: '#e6f2f2', text: '#004d4d' },
    chairman: { bg: '#e6f2f2', text: '#004d4d' },
    management: { bg: '#f0ebf8', text: '#7a4ea0' },
    member: { bg: '#fdf3e7', text: '#9a6b24' },
    viewer: { bg: '#fdf3e7', text: '#9a6b24' },
};

export default function RoleBadge({ role = 'member' }) {
    const key = String(role || 'member').toLowerCase();
    const tone = TONES[key] ?? TONES.member;

    return (
        <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize" style={{ background: tone.bg, color: tone.text }}>
            {key}
        </span>
    );
}
