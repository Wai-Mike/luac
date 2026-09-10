import GuestButton from '@/components/GuestButton';
import { campaignFigures, formatSsp, formatUsd } from '../data/money';
import FadeIn from './FadeIn';

export default function CampaignCard({ title, description, target, target_ssp, raised, raised_ssp, targetLabel = 'Goal', delay = 0 }) {
    const { raisedUsd, raisedSsp, targetUsd, targetSsp, pct } = campaignFigures(
        { title, target, target_ssp, raised, raised_ssp },
        {},
        {},
    );

    return (
        <FadeIn delay={delay}>
            <div className="flex h-full flex-col border border-brand/25 bg-white p-6">
                <h3>{title}</h3>
                <p className="mt-2 flex-1 text-[16px] leading-relaxed text-brand-ink/80">{description}</p>
                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm text-brand-muted">
                        <span>{targetLabel}</span>
                        <span className="text-right font-medium text-brand-ink">
                            <span className="block">{formatUsd(raisedUsd)} / {formatUsd(targetUsd)}</span>
                            <span className="block text-xs font-normal text-brand-muted">
                                {formatSsp(raisedSsp)} / {formatSsp(targetSsp)}
                            </span>
                        </span>
                    </div>
                    <div className="h-2 overflow-hidden bg-brand-soft">
                        <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                    </div>
                </div>
                <GuestButton href={`${route('fundraising')}?program=${encodeURIComponent(title)}#donate`} className="mt-5 w-full">
                    Donate
                </GuestButton>
            </div>
        </FadeIn>
    );
}
