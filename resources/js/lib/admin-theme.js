export const TEAL = '#004d4d';
export const TEAL_DARK = '#003838';
export const TEAL_PALE = '#f0f8f8';
export const TEAL_LIGHT = '#e6f2f2';
export const SURFACE = '#f7fafa';
export const INK = '#0c1f1f';
export const MUTED = '#4a6b6b';
export const BORDER = 'rgba(0, 77, 77, 0.12)';
export const WHITE = '#ffffff';

export const CAT = ['#004d4d', '#c9b15c', '#2a7a7a', '#7a4ea0', '#2e7d32', '#1d6b8a'];
export const CAT_LIGHT = ['#e6f2f2', '#fdf3e7', '#e8f4f4', '#f0ebf8', '#e8f5e9', '#e3f0f5'];

export const FALLBACK_PAYAMS = ['Hai Thongpiny', 'Khorfulus', 'Atar', 'Canal', 'Kaldak', 'Nyilwak', 'Pawel'];

export function hexTint(hex) {
    return `${hex}22`;
}

export function initials(name = '') {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'LA';
}
