import {
    Gift,
    GraduationCap,
    Handshake,
    Heart,
    Sparkles,
    Users,
} from 'lucide-react';
import GuestLayout from '@/layouts/GuestLayout';
import ContactForm from './components/ContactForm';
import SectionHeader from './components/SectionHeader';
import FadeIn from './components/FadeIn';
import { getInvolvedOptions, interestAreas } from './data/siteContent';

const iconMap = {
    Users,
    Heart,
    Gift,
    Handshake,
    GraduationCap,
    Sparkles,
};

export default function GetInvolved() {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-gradient-to-b from-teal-50/50 to-white pb-20 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Get involved"
                        title="There’s a place for you"
                        subtitle="Pick a path — we’ll follow up with next steps and ways to plug into programs."
                    />

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {getInvolvedOptions.map((opt, i) => {
                            const Icon = iconMap[opt.icon] ?? Users;
                            return (
                                <FadeIn key={opt.title} delay={i * 0.05}>
                                    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 text-white shadow">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-bold text-slate-900">{opt.title}</h3>
                                        <p className="mt-2 flex-1 text-slate-600 leading-relaxed">{opt.description}</p>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>

                    <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-2xl font-bold text-slate-900">Tell us how you’d like to help</h2>
                        <p className="mt-2 text-slate-600">We’ll route your message to the right lead — membership, volunteering, or partnerships.</p>
                        <div className="mt-8 max-w-3xl">
                            <ContactForm interestOptions={interestAreas} submitLabel="Submit interest" />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
