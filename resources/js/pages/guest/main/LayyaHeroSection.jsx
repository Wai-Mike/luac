import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { brand, hero } from '../data/siteContent';

export default function LayyaHeroSection({ heroImage }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-teal-50/40">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-200/40 via-transparent to-transparent" />
            <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-teal-400/25 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:py-24 lg:px-8">
                <div className="flex-1">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="text-sm font-bold uppercase tracking-[0.25em] text-teal-700"
                    >
                        {brand.shortName}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
                    >
                        {hero.headline}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.12 }}
                        className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600"
                    >
                        {hero.subtext}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18 }}
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <Link
                            href={route('get-involved')}
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal-600 px-8 text-base font-bold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                        >
                            Get Involved
                        </Link>
                        <Link
                            href={route('fundraising')}
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ffe156] px-8 text-base font-bold text-teal-950 shadow-md transition hover:bg-[#edd245] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe156] focus-visible:ring-offset-2"
                        >
                            Donate Now
                        </Link>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="mt-12 flex-1 lg:mt-0"
                >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-2xl shadow-teal-900/10 ring-1 ring-slate-900/5">
                        {heroImage ? (
                            <img src={heroImage} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-100 to-teal-50 text-slate-400">
                                Image placeholder
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
