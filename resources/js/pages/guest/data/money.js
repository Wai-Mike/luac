export function asMoneyNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
}

export function formatUsd(value) {
    return `USD ${asMoneyNumber(value).toLocaleString()}`;
}

export function formatSsp(value) {
    return `SSP ${asMoneyNumber(value).toLocaleString()}`;
}

export function campaignTitle(campaign) {
    const title = campaign?.title || '';
    if (title === 'Support Girls Education') {
        return 'Support 12 girls with materials';
    }
    return title;
}

export function campaignFigures(campaign, raisedByProgram = {}, raisedSspByProgram = {}) {
    const title = campaign?.title;
    const display = campaignTitle(campaign);
    const raisedUsd = asMoneyNumber(raisedByProgram[display] ?? raisedByProgram[title] ?? campaign?.raised);
    const raisedSsp = asMoneyNumber(raisedSspByProgram[display] ?? raisedSspByProgram[title] ?? campaign?.raised_ssp);
    const targetUsd = asMoneyNumber(campaign?.target);
    const targetSsp = asMoneyNumber(campaign?.target_ssp);
    const pct =
        targetUsd > 0
            ? Math.min(100, Math.round((raisedUsd / targetUsd) * 100))
            : targetSsp > 0
                ? Math.min(100, Math.round((raisedSsp / targetSsp) * 100))
                : 0;

    return { raisedUsd, raisedSsp, targetUsd, targetSsp, pct };
}
