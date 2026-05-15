import { Award, BookOpen, Calendar, Users } from 'lucide-react';

const stats = [
    { icon: Users, value: '500+', label: 'Youth reached' },
    { icon: BookOpen, value: '12+', label: 'Programs' },
    { icon: Calendar, value: '10+', label: 'Years' },
    { icon: Award, value: '1', label: 'Community mission' },
];

export default function FunfactSection() {
    return (
        <section id="funfact-area" className="scroll-mt-24 bg-[#161f37] py-16 text-white sm:py-20 lg:py-20">
            <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-white/10 sm:max-w-none sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:gap-2 lg:divide-x lg:divide-y-0 lg:divide-white/15">
                    {stats.map(({ icon: Icon, value, label }, i) => (
                        <div
                            key={label}
                            className={`single-funfact-wrap flex flex-col items-center gap-4 py-8 sm:flex-row sm:items-center sm:justify-center sm:py-6 sm:pl-0 lg:justify-start lg:gap-5 lg:px-6 ${i === 0 ? 'lg:pl-0' : ''}`}
                        >
                            <div className="shrink-0 rounded-lg bg-white/5 p-3 text-white/90 ring-1 ring-white/10">
                                <Icon className="h-10 w-10" strokeWidth={1.25} aria-hidden />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="m-0 font-sans text-4xl font-light tabular-nums leading-none">{value}</h3>
                                <p className="m-0 mt-2 font-sans text-base text-white/80">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
