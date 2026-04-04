import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import BlogSection from './BlogSection';
import CommunityPhotoStrip from './CommunityPhotoStrip';
import ContactSection from './ContactSection';
import HeroSection from './HeroSection';
import PurposeSection from './PurposeSection';
import TawusHubSection from './TawusHubSection';

export default function index({ homeGallery = [], tawusStripImages = [], blogPostImages = [] }) {
    return (
        <div>
            <GuestNavbar />
            <HeroSection />
            <PurposeSection />
            <TawusHubSection stripImages={tawusStripImages} />
            <CommunityPhotoStrip images={homeGallery} />
            <BlogSection blogPostImages={blogPostImages} />
            <ContactSection />
            <GuestFooter />
        </div>
    );
}
