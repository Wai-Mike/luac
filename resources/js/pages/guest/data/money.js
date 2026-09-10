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

export function campaignFigures(campaign, raisedByProgram = {}, raisedSspByProgram = {}) {
    const raisedUsd = asMoneyNumber(raisedByProgram[campaign?.title] ?? campaign?.raised);
    const raisedSsp = asMoneyNumber(raisedSspByProgram[campaign?.title] ?? campaign?.raised_ssp);
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
