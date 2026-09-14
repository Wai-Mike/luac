import GuestButton from '@/components/GuestButton';
import FadeIn from './FadeIn';

const SAMPLE_TOTAL = 240;

const PAYAMS = [
    { name: 'Belawic', count: 98, share: 41, bar: 'bg-amber' },
    { name: 'Wunlem', count: 76, share: 32, bar: 'bg-[#f3ece0]' },
    { name: 'Mareng', count: 66, share: 27, bar: 'bg-white/25' },
];

const PROFESSIONS = [
    { name: 'Engineering & technical fields', share: 14 },
    { name: 'Civil & structural engineering', share: 12 },
    { name: 'Telecommunications & IT', share: 13 },
    { name: 'Social workers', share: 8 },
    { name: 'Healthcare & medicine', note: 'Clinical specialists & surgeons', share: 12 },
    { name: 'Public health experts', share: 9 },
    { name: 'Pharmacists & biomedical technologists', share: 8 },
    { name: 'Business & commerce', share: 10 },
    { name: 'Financial services & banking', share: 8 },
    { name: 'Real estate & hospitality', share: 6 },
];

function ProfessionRow({ name, note, share }) {
    return (
        <div>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-[11px]">
                <span>
                    <span className="font-semibold text-[#f3ece0]">{name}</span>
                    {note ? <span className="block text-[10px] font-normal text-[#f3ece0]/55">{note}</span> : null}
                </span>
                <span className="shrink-0 tabular-nums text-[#f3ece0]/70">{share}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-amber" style={{ width: `${share}%` }} />
            </div>
        </div>
    );
}

export default function CensusSnapshotCard({ delay = 0 }) {
    return (
        <FadeIn delay={delay}>
            <article id="census-snapshot" className="overflow-hidden rounded-2xl bg-brand-dark p-5 md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h3 className="font-fraunces text-2xl text-[#f3ece0] md:text-3xl">Join the youth census</h3>
                        <p className="mt-1.5 max-w-xl font-sans text-sm leading-relaxed text-[#f3ece0]/80">
                            A sample snapshot of Luac youth across the three payams — Belawic, Wunlem, and Mareng — and the work they do.
                        </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#f3ece0]/80">
                        {SAMPLE_TOTAL} youth
                    </span>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/55">Youth by payam</p>
                        <div className="flex h-3 overflow-hidden rounded-full bg-white/10" role="img" aria-label="Share of sample youth by payam">
                            {PAYAMS.map((payam) => (
                                <div
                                    key={payam.name}
                                    className={`${payam.bar} h-full first:rounded-l-full last:rounded-r-full`}
                                    style={{ width: `${payam.share}%` }}
                                    title={`${payam.name}: ${payam.count} youth (${payam.share}%)`}
                                />
                            ))}
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                            {PAYAMS.map((payam) => (
                                <div key={payam.name} className="min-w-0">
                                    <p className="font-fraunces text-2xl tabular-nums text-[#f3ece0] sm:text-3xl md:text-4xl">{payam.count}</p>
                                    <p className="mt-1 font-sans text-xs font-semibold text-[#f3ece0] sm:text-sm">{payam.name}</p>
                                    <p className="text-[11px] text-[#f3ece0]/65">{payam.share}% of sample</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/55">Professions of Luac youth</p>
                        <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                            {PROFESSIONS.map((job) => (
                                <ProfessionRow key={job.name} {...job} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-start gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-sans text-xs leading-relaxed text-[#f3ece0]/60">
                        Illustrative figures for the public site — not a published census count.
                    </p>
                    <GuestButton href={route('youth-census.register')} variant="amber" className="w-full justify-center sm:w-auto sm:min-w-44">
                        Register now
                    </GuestButton>
                </div>
            </article>
        </FadeIn>
    );
}
