import GuestLayout from '@/layouts/GuestLayout';
import CommunityVideos from '../components/CommunityVideos';
import AboutPreviewSection from './AboutPreviewSection';
import CommunityStory from './CommunityStory';
import ContactCTA from '../components/ContactCTA';
import FocusAreasSection from './FocusAreasSection';
import FundraisingPreview from './FundraisingPreview';
import LayyaHeroSection from './LayyaHeroSection';
import LeadershipPreview from './LeadershipPreview';
import ProgramsPreviewHome from './ProgramsPreviewHome';
import TawusHubSpotlight from './TawusHubSpotlight';

export default function index({ heroImage, homeGallery = [], videos = [], raisedByProgram = {}, raisedSspByProgram = {} }) {
    return (
        <GuestLayout title="LAYYA">
            <LayyaHeroSection heroImage={heroImage} />
            <AboutPreviewSection aboutImage={homeGallery[0]} visionImage={homeGallery[1]} />
            <ProgramsPreviewHome images={homeGallery} />
            <TawusHubSpotlight image={homeGallery[2] ?? heroImage} insetImage={homeGallery[3]} />
            <FundraisingPreview raisedByProgram={raisedByProgram} raisedSspByProgram={raisedSspByProgram} />
            <CommunityStory image={homeGallery[4] ?? homeGallery[0]} />
            <CommunityVideos preview videos={videos} />
            <LeadershipPreview />
            <FocusAreasSection />
            <ContactCTA />
        </GuestLayout>
    );
}
