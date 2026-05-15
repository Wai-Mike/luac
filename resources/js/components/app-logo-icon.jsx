import { cn } from '@/lib/utils';

/** Small logo mark for chrome (navbar, auth card, favicon-scale uses). */
export default function AppLogoIcon({ className, alt = 'LAYYA', ...props }) {
    return (
        <img
            alt={alt}
            className={cn('h-10 w-10 rounded-full object-cover', className)}
            draggable={false}
            src="/images/logo.jpg"
            {...props}
        />
    );
}
