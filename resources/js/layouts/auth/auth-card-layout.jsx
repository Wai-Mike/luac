import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function AuthCardLayout({ children, title, description, footer }) {
    return (
        <div className="bg-muted flex h-dvh max-h-dvh flex-col items-center justify-center gap-6 overflow-hidden overscroll-none p-4 sm:p-6 md:p-10">
            <div className="flex w-full max-h-full min-h-0 max-w-md flex-col gap-4 overflow-y-auto md:gap-6">
                <Link href={route('home')} prefetch className="flex shrink-0 items-center gap-2 self-center font-medium">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-border">
                        <AppLogoIcon className="h-9 w-9" />
                    </div>
                </Link>

                <div className="flex min-h-0 flex-col gap-4 md:gap-6">
                    <Card className="rounded-xl shadow-sm">
                        <CardHeader className="px-6 pt-6 pb-0 text-center sm:px-10 sm:pt-8">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 py-6 sm:px-10 sm:py-8">{children}</CardContent>
                    </Card>
                </div>
                {footer ? <div className="shrink-0 space-y-2 text-center">{footer}</div> : null}
            </div>
        </div>
    );
}
