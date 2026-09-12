import GuestLayout from '@/layouts/GuestLayout';
import CommunityVideos from '../components/CommunityVideos';
import AboutPreviewSection from './AboutPreviewSection';
import CommunityStory from './CommunityStory';
import ContactCTA from '../components/ContactCTA';
import FocusAreasSection from './FocusAreasSection';
import FundraisingPreview from './FundraisingPreview';
import HomeGalleryPreview from './HomeGalleryPreview';
import LayyaHeroSection from './LayyaHeroSection';
import LeadershipPreview from './LeadershipPreview';
import ProgramsPreviewHome from './ProgramsPreviewHome';
import TawusHubSpotlight from './TawusHubSpotlight';

export default function index({ heroImage, videos = [], raisedByProgram = {}, raisedSspByProgram = {} }) {
    return (
        <GuestLayout title="LAYYA">
            <LayyaHeroSection heroImage={heroImage} />
            <HomeGalleryPreview />
            <AboutPreviewSection />
            <ProgramsPreviewHome />
            <TawusHubSpotlight />
            <FundraisingPreview raisedByProgram={raisedByProgram} raisedSspByProgram={raisedSspByProgram} />
            <CommunityStory />
            <CommunityVideos preview videos={videos} />
            <LeadershipPreview />
            <FocusAreasSection />
            <ContactCTA />
        </GuestLayout>
    );
}
