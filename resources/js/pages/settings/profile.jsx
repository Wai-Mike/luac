import InputError from '@/components/input-error';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Profile({ mustVerifyEmail, status }) {
    const {
        props: {
            auth: { user },
        },
    } = usePage();

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <SettingsLayout>
            <Head title="Profile settings" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium text-neutral-900">Profile</h2>
                    <p className="mt-1 text-sm text-neutral-600">Update your display name and email address.</p>
                </div>

                {status && (
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{status}</p>
                )}

                <form className="space-y-6" onSubmit={submit}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    {mustVerifyEmail && !user.email_verified_at && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                            Your email address is unverified.
                            <Link
                                href={route('verification.notice')}
                                className="ml-1 font-semibold text-amber-950 underline decoration-amber-800/70 hover:text-amber-900"
                                prefetch
                            >
                                Resend verification
                            </Link>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    );
}
