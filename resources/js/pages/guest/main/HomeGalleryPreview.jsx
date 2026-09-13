import GuestButton from '@/components/GuestButton';
import FeaturedCarousel from '../components/FeaturedCarousel';
import SectionLabel from '../components/SectionLabel';

export default function HomeGalleryPreview({ photos = [] }) {
    if (!photos.length) {
        return null;
    }

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Gallery</SectionLabel>
                        <h2>
                            Youth, girls
                            <br />
                            and community
                        </h2>
                    </div>
                    <GuestButton href={route('gallery')} variant="outline">
                        Open full gallery →
                    </GuestButton>
                </div>
                <FeaturedCarousel photos={photos} compact />
            </div>
        </section>
    );
}
