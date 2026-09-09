import SectionLabel from './SectionLabel';

export default function PageHero({ label, title, italic, subtitle, image }) {
    return (
        <section className="bg-brand-dark pt-16">
            {image ? (
                <div className="relative">
                    <img src={image} alt="" className="mx-auto block h-[min(70svh,40rem)] w-full max-w-none object-contain object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-brand-dark/15" />
                </div>
            ) : null}
            <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-24 lg:px-8">
                {label ? <SectionLabel light>{label}</SectionLabel> : null}
                <h1 className="max-w-4xl font-semibold text-white">
                    {title}
                    {italic ? ` ${italic}` : ''}
                </h1>
                {subtitle ? <p className="mt-5 max-w-2xl text-[19px] leading-[1.65] text-white/65">{subtitle}</p> : null}
            </div>
        </section>
    );
}
