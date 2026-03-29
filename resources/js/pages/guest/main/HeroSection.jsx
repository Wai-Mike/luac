import { Link } from '@inertiajs/react';

export default function HeroSection() {

    return (
        <>
            <section
                className="relative py-16"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1)), url('/images/cover1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Main Content */}
                <div className="px-4 lg:w-[70%] lg:px-8">
                    {/* Main Heading */}
                    <h1 className="text-4xl leading-tight font-extrabold text-white drop-shadow-2xl sm:text-5xl lg:text-7xl">
                        Igniting
                        <span className="block bg-gradient-to-r from-white via-green-50 to-green-100 bg-clip-text text-transparent drop-shadow-lg">
                            Youth Leadership & Creativity
                        </span>
                        Across Luac Akok Yieu
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg leading-relaxed text-white drop-shadow-lg sm:text-xl font-medium">
                        A new generation of Luac Akok Yieu youth, dreaming big, building skills, and turning local ideas into real change for their
                        community.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link
                            href={route('services')}
                            className="group inline-flex items-center justify-center rounded-full bg-white/90 px-8 py-4 text-lg font-bold text-teal-800 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white"
                        >
                            <span className="flex items-center">
                                Explore Youth Programs
                                <svg
                                    className="ml-2 h-5 w-5 text-teal-800 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
