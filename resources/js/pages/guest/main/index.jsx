import CTASection from '../components/CTASection';
import GuestLayout from '@/layouts/GuestLayout';
import { brand } from '../data/siteContent';
import AboutPreviewSection from './AboutPreviewSection';
import FocusAreasSection from './FocusAreasSection';
import HomeGalleryPreview from './HomeGalleryPreview';
import HomeImpactStats from './HomeImpactStats';
import LayyaHeroSection from './LayyaHeroSection';
import NewsTeaserSection from './NewsTeaserSection';
import ProgramsPreviewHome from './ProgramsPreviewHome';

export default function index({ heroImage, homeGallery = [] }) {
    return (
        <GuestLayout navbarVariant="layya" footerVariant="layya">
            <div className="font-sans text-slate-800 antialiased [text-rendering:optimizeLegibility]">
                <LayyaHeroSection heroImage={heroImage} />
                <AboutPreviewSection />
                <FocusAreasSection />
                <HomeImpactStats />
                <ProgramsPreviewHome />
                <HomeGalleryPreview images={homeGallery} />
                <NewsTeaserSection />
                <CTASection
                    title="Join the LAYYA Movement"
                    text="Whether you are a young person, parent, community leader, donor, or partner — there is a place for you."
                    primaryHref={route('get-involved')}
                    primaryLabel="Become a Member"
                    secondaryHref={route('contact')}
                    secondaryLabel="Partner With Us"
                    tertiaryHref={route('fundraising')}
                    tertiaryLabel="Support Our Work"
                />
                <section className="border-t border-slate-100 bg-slate-50 py-10">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm font-medium text-slate-600">{brand.fullName}</p>
                        <p className="mt-2 text-lg font-semibold text-teal-800">{brand.tagline}</p>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
