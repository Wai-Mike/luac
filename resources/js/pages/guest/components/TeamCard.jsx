import FadeIn from './FadeIn';

export default function TeamCard({ name, role, bio, image, delay = 0 }) {
    return (
        <FadeIn delay={delay}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-emerald-600">{role}</p>
                    <p className="mt-4 text-slate-600 leading-relaxed">{bio}</p>
                </div>
            </article>
        </FadeIn>
    );
}
