export const SSP_PER_USD = 3500;

export function formatUsd(value) {
    return `USD ${Number(value).toLocaleString()}`;
}

export function formatSsp(value) {
    return `SSP ${Number(value).toLocaleString()}`;
}

export function sspFromUsd(usd) {
    return Math.round(Number(usd) * SSP_PER_USD);
}

export function dualMoney(usd) {
    return {
        usd: formatUsd(usd),
        ssp: formatSsp(sspFromUsd(usd)),
    };
}
