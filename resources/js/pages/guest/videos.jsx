import GuestLayout from '@/layouts/GuestLayout';
import CommunityVideos from './components/CommunityVideos';
import PageHero from './components/PageHero';

export default function Videos({ videos = [] }) {
    return (
        <GuestLayout title="Community videos">
            <PageHero
                label="Archive"
                title="Community videos"
                italic="and memory"
                subtitle="Historical documentation of LAYYA events — culture, sport, training, and gathering in Luac Akook Yieu."
                image="/images/cover1.jpg"
            />
            <CommunityVideos videos={videos} />
        </GuestLayout>
    );
}
