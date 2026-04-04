import { useMemo, useState } from 'react';

export default function BlogSection({ blogPostImages = [] }) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSubscribed(true);
            setEmail('');
        } catch (error) {
            console.error('Subscription failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const storyImage = useMemo(() => (blogPostImages.length ? blogPostImages[0] : null), [blogPostImages]);

    return (
        <section className="bg-brand-surface py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand">
                        Community story
                    </div>
                    <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Leadership behind
                        <span className="block text-brand">Tawus Day</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Meet Nyantet Chol Miyom—chairlady of the organizing committee that brought Tawus Day to life for our community.
                    </p>
                </div>

                <div className="mb-16">
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
                            <div className="relative h-72 min-h-[240px] w-full sm:h-80 lg:h-full lg:min-h-[28rem]">
                                {storyImage ? (
                                    <img
                                        src={storyImage}
                                        alt="Tawus Day community celebration"
                                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-light to-brand-soft" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
                                        Tawus Day
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center p-8 lg:p-12">
                                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                    <span className="rounded-full bg-brand-surface px-3 py-1 text-brand">Organizing committee</span>
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">Nyantet Chol Miyom</h3>
                                <p className="mb-6 text-lg font-medium text-brand">Chairlady, Tawus Day organizing committee</p>
                                <div className="space-y-4 text-lg leading-relaxed text-gray-600">
                                    <p>
                                        When Tawus Day was planned, Nyantet stepped forward to chair the organizing committee—coordinating volunteers,
                                        shaping the program, and making sure young people, families, and guests felt welcome from the first welcome to the
                                        closing moments.
                                    </p>
                                    <p>
                                        Her leadership kept logistics, culture, and safety aligned so the day could celebrate skills, creativity, and unity
                                        without losing the warmth of a community gathering. Teammates describe her as steady under pressure: listening first,
                                        deciding clearly, and encouraging others to take ownership of their roles.
                                    </p>
                                    <p>
                                        Tawus Day is stronger because leaders like Nyantet build bridges between youth, mentors, and partners—proving that
                                        thoughtful organizing is its own kind of innovation.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center space-x-3 border-t border-gray-100 pt-8">
                                    <div className="h-10 w-10 rounded-full bg-brand"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Nyantet Chol Miyom</p>
                                        <p className="text-sm text-gray-500">Chairlady, Tawus Day organizing committee</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl bg-brand p-8 text-white shadow-sm">
                        <div className="absolute inset-0 bg-white/5"></div>
                        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/10"></div>
                        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5"></div>
                        <div className="absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-white/5"></div>

                        <div className="relative">
                            <div className="mb-8">
                                <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Newsletter
                                </div>
                                <h3 className="mb-4 text-3xl font-bold sm:text-4xl">Stay Updated</h3>
                                <p className="mx-auto max-w-2xl text-lg opacity-90">
                                    Get news about Tawus Hub, youth programs, and community events from LAYYA.
                                </p>
                            </div>

                            {isSubscribed ? (
                                <div className="mb-8 rounded-2xl border border-white/25 bg-white/10 p-6">
                                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
                                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-2xl font-bold text-white">Thank you for subscribing!</h4>
                                    <p className="mb-4 text-brand-foreground">You'll receive our latest updates and insights soon.</p>
                                    <button
                                        onClick={() => setIsSubscribed(false)}
                                        className="rounded-md bg-white/15 px-6 py-2 font-medium text-white transition-colors hover:bg-white/25"
                                    >
                                        Subscribe Another Email
                                    </button>
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <form onSubmit={handleEmailSubmit} className="mx-auto max-w-md">
                                        <div className="flex flex-col gap-4 sm:flex-row">
                                            <div className="flex-1">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email address"
                                                    className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-6 py-4 text-lg text-white placeholder-white/70 backdrop-blur-sm transition-all duration-300 focus:border-white focus:bg-white/20 focus:outline-none"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !email}
                                                className="rounded-md bg-white px-8 py-4 text-base font-semibold text-brand transition-colors hover:bg-brand-surface disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <span className="flex items-center justify-center">
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                            Subscribing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            Subscribe
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
