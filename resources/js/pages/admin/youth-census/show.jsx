import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

const youthBreadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Youth census', href: '/admin/youth-members' },
];

export default function YouthCensusShow({ member }) {
    if (!member) {
        return (
            <AppLayout breadcrumbs={youthBreadcrumbs}>
                <Head title="Admin · Youth record" />
                <p className="text-slate-600">Record not found.</p>
            </AppLayout>
        );
    }

    const breadcrumbs = [...youthBreadcrumbs, { title: `${member.first_name} ${member.last_name}` }];

    const destroy = () => {
        if (!confirm('Delete this youth record?')) return;
        router.delete(`/admin/youth-members/${member.id}`, { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${member.first_name} ${member.last_name}`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link href="/admin/youth-members" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                        ← Back to list
                    </Link>
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/youth-members/${member.id}/edit`}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                        >
                            Edit
                        </Link>
                        <button
                            type="button"
                            onClick={destroy}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        {member.first_name} {member.last_name}
                    </h1>
                    <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                        <Item label="Gender" value={member.gender} />
                        <Item label="Date of birth" value={member.date_of_birth} />
                        <Item label="Phone" value={member.phone} />
                        <Item label="Email" value={member.email} />
                        <Item label="County" value={member.county} />
                        <Item label="Payam" value={member.payam} />
                        <Item label="Boma" value={member.boma} />
                        <Item label="Education" value={member.education_level} />
                        <Item label="School" value={member.current_school} />
                        <Item label="Employment" value={member.employment_status} />
                        <Item label="Heard about LAYYA" value={member.heard_about_layya} />
                    </dl>
                    {Array.isArray(member.skills) && member.skills.length > 0 && (
                        <div className="mt-4">
                            <p className="text-xs font-medium uppercase text-slate-500">Skills</p>
                            <p className="mt-1 text-sm text-slate-800">{member.skills.join(', ')}</p>
                        </div>
                    )}
                    {Array.isArray(member.interests) && member.interests.length > 0 && (
                        <div className="mt-4">
                            <p className="text-xs font-medium uppercase text-slate-500">Interests</p>
                            <p className="mt-1 text-sm text-slate-800">{member.interests.join(', ')}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function Item({ label, value }) {
    if (value === null || value === undefined || value === '') return null;
    return (
        <div>
            <dt className="text-slate-500">{label}</dt>
            <dd className="font-medium text-slate-900">{String(value)}</dd>
        </div>
    );
}
