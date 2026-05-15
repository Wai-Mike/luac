import { Link } from '@inertiajs/react';
import { useMemo } from 'react';
import SectionTitle from './SectionTitle';

const fallbackPosts = [
    {
        title: 'Youth programs that change neighborhoods',
        excerpt: 'How LAYYA connects skills training with real community outcomes in Juba and surrounding areas.',
        author: 'LAYYA Team',
        time: 'Recently',
    },
    {
        title: 'Tawus Hub: safe space, real skills',
        excerpt: 'Girls learn hands-on trades and confidence alongside mentors who believe in their future.',
        author: 'Tawus Hub',
        time: 'Recently',
    },
    {
        title: 'Reports & transparency',
        excerpt: 'See updates on initiatives, events, and how partners can collaborate with youth leaders.',
        author: 'Reports',
        time: 'Recently',
    },
];

const linkFocus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b60c9] focus-visible:ring-offset-2 rounded-sm';

export default function BlogSection({ blogPostImages = [] }) {
    const posts = useMemo(() => {
        return fallbackPosts.map((p, i) => ({
            ...p,
            image: blogPostImages[i] || blogPostImages[0] || null,
            href: i === 0 ? route('reports') : i === 1 ? route('tawus-hub') : route('reports'),
        }));
    }, [blogPostImages]);

    return (
        <section id="blog-area" className="scroll-mt-24 bg-[#ecf1f5] py-16 sm:py-20 lg:py-[117px]">
            <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Recent news" subtitle="Stories, highlights, and ways to stay connected." />
                <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                    {posts.map((post) => (
                        <article
                            key={post.title}
                            className="group single-blog-post flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/[0.04] transition motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg"
                        >
                            <figure className="blog-thumb relative m-0 block overflow-hidden">
                                <div className="blog-thumbnail relative aspect-[16/10] min-h-[200px] w-full sm:min-h-[210px]">
                                    {post.image ? (
                                        <img
                                            src={post.image}
                                            alt=""
                                            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-[#3b60c9] to-[#161f37]" aria-hidden />
                                    )}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                                </div>
                                <figcaption className="blog-meta pointer-events-none absolute bottom-3 left-0 w-full px-5 sm:bottom-4 sm:px-6">
                                    <div className="author flex items-center gap-2.5">
                                        <div className="author-pic h-9 w-9 shrink-0 overflow-hidden rounded bg-white/30 ring-1 ring-white/40">
                                            <div className="h-full w-full bg-[#5481ff]" aria-hidden />
                                        </div>
                                        <div className="author-info min-w-0 text-left font-sans text-xs leading-tight text-white">
                                            <p className="m-0 truncate font-sans text-sm font-bold text-white">{post.author}</p>
                                            <p className="m-0 mt-0.5 text-[11px] text-white/85">{post.time}</p>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <div className="blog-content flex flex-1 flex-col p-6 text-[#3a3b3c] sm:p-7">
                                <h3 className="mb-3 font-sans text-lg font-semibold leading-snug sm:text-xl">
                                    <Link href={post.href} className={`text-[#131c33] transition hover:text-[#3b60c9] ${linkFocus}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mb-5 line-clamp-4 flex-1 font-sans text-sm leading-relaxed sm:text-base">{post.excerpt}</p>
                                <Link
                                    href={post.href}
                                    className={`inline-flex w-fit min-h-[40px] items-center bg-[#3b60c9] px-5 py-2 font-sans text-sm font-medium capitalize text-white transition hover:bg-[#161f37] ${linkFocus}`}
                                >
                                    Read more
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
