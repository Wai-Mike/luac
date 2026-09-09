import GuestButton from '@/components/GuestButton';
import { dualMoney } from '../data/money';
import FadeIn from './FadeIn';

export default function CampaignCard({ title, description, target, raised, targetLabel = 'Goal', delay = 0 }) {
    const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;

    return (
        <FadeIn delay={delay}>
            <div className="flex h-full flex-col border border-brand/25 bg-white p-6">
                <h3>{title}</h3>
                <p className="mt-2 flex-1 text-[16px] leading-relaxed text-brand-ink/80">{description}</p>
                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm text-brand-muted">
                        <span>{targetLabel}</span>
                        <span className="text-right font-medium text-brand-ink">
                            <span className="block">{dualMoney(raised).usd} / {dualMoney(target).usd}</span>
                            <span className="block text-xs font-normal text-brand-muted">
                                {dualMoney(raised).ssp} / {dualMoney(target).ssp}
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
