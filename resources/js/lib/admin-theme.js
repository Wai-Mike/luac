export const TEAL = '#073B3A';
export const TEAL_DARK = '#073B3A';
export const TEAL_PALE = '#E6F5F0';
export const TEAL_LIGHT = '#E6F5F0';
export const SURFACE = '#F4F7F6';
export const INK = '#172321';
export const MUTED = '#687976';
export const BORDER = '#DDE7E4';
export const WHITE = '#ffffff';
export const GOLD = '#D5A742';
export const SIDEBAR_MUTED = '#8CB4B0';

export const GREEN = '#178568';
export const RED = '#C94B4B';
export const BLUE = '#3976B8';
export const PURPLE = '#7C68B3';
export const BROWN = '#A66B19';

export const GREEN_SOFT = '#E6F5F0';
export const RED_SOFT = '#FCEAEA';
export const BLUE_SOFT = '#EAF2FB';
export const PURPLE_SOFT = '#F0ECFA';
export const GOLD_SOFT = '#FFF6DE';

export const CAT = [TEAL, GOLD, GREEN, PURPLE, BLUE, BROWN];
export const CAT_LIGHT = [GREEN_SOFT, GOLD_SOFT, TEAL_PALE, PURPLE_SOFT, BLUE_SOFT, '#F8F1E6'];

export const FALLBACK_PAYAMS = ['Belawic', 'Wunlem', 'Mareng'];

export const FIELD_STYLE = {
    border: `1.5px solid ${BORDER}`,
    background: WHITE,
};

export const CARD_STYLE = {
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
};

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

export function firstName(name = '') {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    const titles = new Set(['eng.', 'eng', 'dr.', 'dr', 'hon.', 'hon', 'mr.', 'mr', 'mrs.', 'mrs', 'ms.', 'ms', 'prof.', 'prof']);
    return parts.find((part) => !titles.has(part.toLowerCase().replace(',', ''))) || parts[0] || 'Executive';
}

export function greetingForHour(date = new Date()) {
    const hour = date.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

export function formatBriefingDate(date = new Date()) {
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function compactSsp(value) {
    const amount = Number(value || 0);
    if (Math.abs(amount) >= 1_000_000) {
        return `${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M SSP`;
    }
    if (Math.abs(amount) >= 1_000) {
        return `${(amount / 1_000).toFixed(1).replace(/\.0$/, '')}K SSP`;
    }
    return `${amount.toLocaleString()} SSP`;
}

export function compactUsd(value) {
    const amount = Number(value || 0);
    if (Math.abs(amount) >= 1_000_000) {
        return `$${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    }
    if (Math.abs(amount) >= 1_000) {
        return `$${(amount / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return `$${Math.round(amount).toLocaleString()}`;
}
