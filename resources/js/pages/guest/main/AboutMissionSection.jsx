import { Link, usePage } from '@inertiajs/react';

export default function AboutMissionSection() {
    const { heroImage } = usePage().props;
    const sideImg = heroImage || null;

    return (
        <section id="about-area" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-[117px]">
            <div className="relative z-[1]">
                <div
                    className="pointer-events-none absolute left-0 top-1/2 z-[2] hidden h-[85%] w-[39%] -translate-y-1/2 rounded-r-sm bg-cover bg-center shadow-lg lg:block"
                    style={
                        sideImg
                            ? { backgroundImage: `url(${sideImg})` }
                            : { background: 'linear-gradient(145deg, #3b60c9 0%, #161f37 100%)' }
                    }
                    aria-hidden
                />
                <div className="relative z-[1] flex justify-end">
                    <div className="w-full lg:w-10/12">
                        <div className="mx-4 rounded-sm border-2 border-[#dbe5f3] bg-[#ecf1f5] px-5 py-10 shadow-sm sm:mx-6 sm:px-8 lg:mx-0 lg:border-[10px] lg:px-10 lg:pb-12 lg:pl-[260px] lg:pt-10 lg:shadow-md">
                            <div className="mb-6 text-left lg:mb-8">
                                <h2 className="font-sans text-3xl font-semibold capitalize leading-tight text-[#131c33] sm:text-4xl">Our mission</h2>
                                <div className="mt-3 h-1 w-14 rounded-full bg-[#3b60c9]" aria-hidden />
                            </div>
                            <div className="max-w-prose space-y-4 font-sans text-base leading-relaxed text-[#3a3b3c] sm:text-[1.05rem]">
                                <p>
                                    We empower young people and underserved communities with inclusive, youth-led programs—leadership, arts, technology, and
                                    livelihoods—through awareness, innovation, and collaboration.
                                </p>
                                <p>
                                    Our vision is to lead in digital and community innovation for equitable access to youth empowerment across South Sudan and
                                    East Africa.
                                </p>
                            </div>
                            <Link
                                href={route('about')}
                                className="mt-8 inline-flex min-h-[48px] items-center justify-center bg-[#3b60c9] px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition motion-safe:duration-200 hover:bg-[#161f37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b60c9] focus-visible:ring-offset-2"
                            >
                                Know more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
