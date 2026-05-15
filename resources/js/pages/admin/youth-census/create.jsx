import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Youth census', href: '/admin/youth-members' },
    { title: 'Add record' },
];

const empty = {
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    phone: '',
    email: '',
    county: '',
    payam: '',
    boma: '',
    education_level: '',
    current_school: '',
    employment_status: '',
    skills: '',
    interests: '',
    heard_about_layya: '',
};

export default function YouthCensusCreate() {
    const { data, setData, post, processing, errors, transform } = useForm(empty);

    useEffect(() => {
        transform((d) => ({
            ...d,
            skills: d.skills
                ? String(d.skills)
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                : [],
            interests: d.interests
                ? String(d.interests)
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                : [],
        }));
    }, [transform]);

    const submit = (e) => {
        e.preventDefault();
        post('/admin/youth-members', { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin · Add youth record" />

            <div className="mx-auto max-w-2xl space-y-6">
                <Link href="/admin/youth-members" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                    ← Back to list
                </Link>
                <h1 className="text-2xl font-semibold text-slate-900">Add youth member</h1>

                <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="First name" error={errors.first_name}>
                            <input
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                required
                            />
                        </Field>
                        <Field label="Last name" error={errors.last_name}>
                            <input
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                required
                            />
                        </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Gender" error={errors.gender}>
                            <select
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            >
                                <option value="">—</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </Field>
                        <Field label="Date of birth" error={errors.date_of_birth}>
                            <input
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Phone" error={errors.phone}>
                            <input
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                        <Field label="Email" error={errors.email}>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Field label="County" error={errors.county}>
                            <input
                                value={data.county}
                                onChange={(e) => setData('county', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                        <Field label="Payam" error={errors.payam}>
                            <input
                                value={data.payam}
                                onChange={(e) => setData('payam', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                        <Field label="Boma" error={errors.boma}>
                            <input
                                value={data.boma}
                                onChange={(e) => setData('boma', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Education level" error={errors.education_level}>
                            <input
                                value={data.education_level}
                                onChange={(e) => setData('education_level', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                        <Field label="Current school" error={errors.current_school}>
                            <input
                                value={data.current_school}
                                onChange={(e) => setData('current_school', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        </Field>
                    </div>
                    <Field label="Employment status" error={errors.employment_status}>
                        <input
                            value={data.employment_status}
                            onChange={(e) => setData('employment_status', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                    </Field>
                    <Field label="Skills (comma-separated)" error={errors.skills}>
                        <input
                            value={data.skills}
                            onChange={(e) => setData('skills', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                    </Field>
                    <Field label="Interests (comma-separated)" error={errors.interests}>
                        <input
                            value={data.interests}
                            onChange={(e) => setData('interests', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                    </Field>
                    <Field label="Heard about LAYYA" error={errors.heard_about_layya}>
                        <input
                            value={data.heard_about_layya}
                            onChange={(e) => setData('heard_about_layya', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        />
                    </Field>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[rgb(4,50,75)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                    >
                        {processing ? 'Saving…' : 'Save'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}
