import AdminLayout from '@/components/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function YouthCensusShow({ member, user, role, currentPath }) {
    return (
        <AdminLayout user={user} role={role || 'admin'} currentPath={currentPath || `admin/youth-members/${member.id}`}>
            <Head title={`Youth Member - ${member.first_name} ${member.last_name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {member.first_name} {member.last_name}
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">Youth census record</p>
                    </div>
                    <Link
                        href={route('admin.youth-members.index')}
                        className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                        Back to list
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-slate-900">Demographics</h2>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                            <dt className="font-medium text-slate-600">Gender</dt>
                            <dd className="text-slate-800">{member.gender || '—'}</dd>

                            <dt className="font-medium text-slate-600">Date of birth</dt>
                            <dd className="text-slate-800">{member.date_of_birth || '—'}</dd>

                            <dt className="font-medium text-slate-600">Phone</dt>
                            <dd className="text-slate-800">{member.phone || '—'}</dd>

                            <dt className="font-medium text-slate-600">Email</dt>
                            <dd className="text-slate-800">{member.email || '—'}</dd>

                            <dt className="font-medium text-slate-600">County</dt>
                            <dd className="text-slate-800">{member.county || '—'}</dd>

                            <dt className="font-medium text-slate-600">Payam</dt>
                            <dd className="text-slate-800">{member.payam || '—'}</dd>

                            <dt className="font-medium text-slate-600">Boma</dt>
                            <dd className="text-slate-800">{member.boma || '—'}</dd>
                        </dl>
                    </section>

                    <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-slate-900">Education & Skills</h2>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                            <dt className="font-medium text-slate-600">Education level</dt>
                            <dd className="text-slate-800">{member.education_level || '—'}</dd>

                            <dt className="font-medium text-slate-600">Current school</dt>
                            <dd className="text-slate-800">{member.current_school || '—'}</dd>

                            <dt className="font-medium text-slate-600">Employment status</dt>
                            <dd className="text-slate-800">{member.employment_status || '—'}</dd>
                        </dl>

                        <div className="mt-3">
                            <p className="text-xs font-semibold text-slate-700">Skills</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {Array.isArray(member.skills) && member.skills.length > 0 ? (
                                    member.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-100"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-[11px] text-slate-400">No skills recorded</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-3">
                            <p className="text-xs font-semibold text-slate-700">Interests</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {Array.isArray(member.interests) && member.interests.length > 0 ? (
                                    member.interests.map((interest) => (
                                        <span
                                            key={interest}
                                            className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-amber-100"
                                        >
                                            {interest}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-[11px] text-slate-400">No interests recorded</span>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}

