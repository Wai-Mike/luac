import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <div className="guest-site min-w-0">
            {title ? <Head title={title} /> : null}
            <GuestNavbar />
            {children}
            <GuestFooter />
        </div>
    );
}
