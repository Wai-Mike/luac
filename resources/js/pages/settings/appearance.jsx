import AppearanceToggleTab from '@/components/appearance-tabs';
import SettingsLayout from '@/layouts/settings/layout';
import { Head } from '@inertiajs/react';

export default function Appearance() {
    return (
        <SettingsLayout>
            <Head title="Appearance" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium text-neutral-900">Appearance</h2>
                    <p className="mt-1 text-sm text-neutral-600">Choose how this app looks when you’re signed in.</p>
                </div>

                <AppearanceToggleTab className="w-full max-w-sm flex-wrap md:flex-nowrap" />
            </div>
        </SettingsLayout>
    );
}
