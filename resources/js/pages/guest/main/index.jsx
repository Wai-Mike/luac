import GuestLayout from '@/layouts/GuestLayout';
import BlogSection from './BlogSection';
import CommunityPhotoStrip from './CommunityPhotoStrip';
import ContactSection from './ContactSection';
import HeroSection from './HeroSection';
import ImpactStatsSection from './ImpactStatsSection';
import PurposeSection from './PurposeSection';
import TawusHubSection from './TawusHubSection';

export default function index({ homeGallery = [], tawusStripImages = [], blogPostImages = [] }) {
    return (
        <GuestLayout navbarVariant="association" footerVariant="association">
            <div className="association-home bg-association-canvas text-association-ink antialiased">
                <HeroSection />
                <ImpactStatsSection />
                <PurposeSection />
                <TawusHubSection stripImages={tawusStripImages} />
                <CommunityPhotoStrip images={homeGallery} />
                <BlogSection blogPostImages={blogPostImages} />
                <ContactSection />
            </div>
        </GuestLayout>
    );
}
