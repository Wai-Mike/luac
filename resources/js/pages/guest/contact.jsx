import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import GuestLayout from '@/layouts/GuestLayout';
import ContactForm from './components/ContactForm';
import { brand } from './data/siteContent';

export default function Contact({ contact_info = {} }) {
    const email = contact_info.email ?? 'layya.youth@gmail.com';
    const phone = contact_info.phone ?? '+211 XXX XXX XXX';
    const address = contact_info.address ?? 'Luac Akok Yieu, South Sudan';

    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="bg-white pb-20 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Contact</p>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">Let’s build together</h1>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                            Programs, partnerships, and press — reach out and we’ll respond as soon as we can.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-12 lg:grid-cols-2">
                        <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50/60 p-8">
                            <div className="flex gap-4">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                                <div>
                                    <p className="font-semibold text-slate-900">Location</p>
                                    <p className="mt-1 text-slate-600">{address}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                                <div>
                                    <p className="font-semibold text-slate-900">Phone</p>
                                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="mt-1 block text-teal-700 hover:underline">
                                        {phone}
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                                <div>
                                    <p className="font-semibold text-slate-900">Email</p>
                                    <a href={`mailto:${email}`} className="mt-1 block text-teal-700 hover:underline">
                                        {email}
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-2">
                                <Facebook className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                                <div>
                                    <p className="font-semibold text-slate-900">Social</p>
                                    <div className="mt-2 flex gap-3">
                                        <a href="#" className="text-slate-600 hover:text-teal-700" aria-label="Facebook">
                                            <Facebook className="h-6 w-6" />
                                        </a>
                                        <a href="#" className="text-slate-600 hover:text-teal-700" aria-label="LinkedIn">
                                            <Linkedin className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white">
                                <div className="flex aspect-[16/9] items-center justify-center bg-slate-100 text-sm text-slate-500">
                                    Map placeholder
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900">Send a message</h2>
                            <p className="mt-2 text-sm text-slate-600">{brand.fullName}</p>
                            <div className="mt-8">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
