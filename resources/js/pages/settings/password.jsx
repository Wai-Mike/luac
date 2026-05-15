import InputError from '@/components/input-error';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';

export default function Password({ status }) {
    const { data, setData, put, errors, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            onSuccess: () => {
                setData({ current_password: '', password: '', password_confirmation: '' });
            },
        });
    };

    return (
        <SettingsLayout>
            <Head title="Password settings" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium text-neutral-900">Password</h2>
                    <p className="mt-1 text-sm text-neutral-600">Use a strong password that you don’t reuse elsewhere.</p>
                </div>

                {status && (
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{status}</p>
                )}

                <form className="space-y-6" onSubmit={submit}>
                    <div className="space-y-2">
                        <Label htmlFor="current_password">Current password</Label>
                        <Input
                            id="current_password"
                            type="password"
                            autoComplete="current-password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                        />
                        <InputError message={errors.current_password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">New password</Label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirm new password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update password
                    </Button>
                </form>
            </div>
        </SettingsLayout>
    );
}
