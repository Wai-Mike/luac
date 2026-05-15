import { GraduationCap, HeartHandshake, School, Users } from 'lucide-react';
import SectionTitle from './SectionTitle';

const items = [
    {
        icon: GraduationCap,
        title: 'Scholarship',
        text: 'Support pathways to learning—skills workshops, peer tutoring, and resources that help young people stay in school and grow.',
    },
    {
        icon: Users,
        title: 'Help current students',
        text: 'Mentorship and youth census outreach so the next generation can find programs, voice needs, and connect with opportunity.',
    },
    {
        icon: School,
        title: 'Help our community',
        text: 'Partnerships with civil society and local leaders to align youth initiatives with real community priorities.',
    },
    {
        icon: HeartHandshake,
        title: 'Build our community',
        text: 'Events like Tawus Day and Tawus Hub gatherings that celebrate culture, skills, and unity in Luac Akok Yieu and beyond.',
    },
];

export default function ResponsibilitySection() {
    return (
        <section id="responsibility-area" className="scroll-mt-24 bg-[#ecf1f5] py-16 sm:py-20 lg:py-[117px]">
            <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Our responsibility" subtitle="Four ways we stay accountable to young people and the communities we serve." />
                <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:gap-8 sm:text-left lg:grid-cols-4">
                    {items.map(({ icon: Icon, title, text }) => (
                        <article
                            key={title}
                            className="group flex flex-col rounded-xl border border-transparent bg-white/70 p-6 shadow-sm transition motion-safe:duration-200 hover:-translate-y-0.5 hover:border-[#dbe5f3] hover:bg-white hover:shadow-md"
                        >
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ecf1f5] text-[#3b60c9] ring-1 ring-[#dbe5f3] transition group-hover:bg-[#3b60c9] group-hover:text-white group-hover:ring-0 sm:mx-0">
                                <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                            </div>
                            <h4 className="mb-2 font-sans text-lg font-bold text-[#131c33] transition group-hover:text-[#3b60c9] sm:text-xl">{title}</h4>
                            <p className="m-0 flex-1 font-sans text-sm leading-relaxed text-[#3a3b3c] sm:text-base">{text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
