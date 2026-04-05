import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';

export default function GuestLayout({ children, navbarVariant = 'default', footerVariant = 'default' }) {
    return (
        <div className="min-w-0">
            <GuestNavbar variant={navbarVariant} />
            {children}
            <GuestFooter variant={footerVariant} />
        </div>
    );
}
