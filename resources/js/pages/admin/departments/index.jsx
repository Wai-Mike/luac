import AppLayout from '@/layouts/app-layout';
import StatusBadge from '@/components/admin/StatusBadge';
import useCapabilities from '@/hooks/useCapabilities';
import { BORDER, CAT, SURFACE, TEAL, TEAL_LIGHT } from '@/lib/admin-theme';
import { Head, Link, router } from '@inertiajs/react';
import { paginatorItems } from '../useAdminPageProps';
import { Building2, HeartHandshake, Landmark, Monitor, Scale, Users } from 'lucide-react';

const ICONS = [Landmark, HeartHandshake, Monitor, Users, Scale, Building2];

export default function DepartmentsIndex({ departments: deptPaginator }) {
    const { canManageUsers } = useCapabilities();
    const rows = paginatorItems(deptPaginator);

    return (
        <AppLayout title="Departments" subtitle="Executive office and programme units">
            <Head title="Admin · Departments" />

            <div className="space-y-6">
                {canManageUsers ? (
                    <div className="flex justify-end">
                        <Link href="/admin/departments/create" className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: TEAL }}>
                            Add department
                        </Link>
                    </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {rows.length === 0 ? (
                        <p className="col-span-full rounded-2xl bg-white p-8 text-center text-sm text-brand-muted">No departments yet.</p>
                    ) : (
                        rows.map((d, i) => {
                            const Icon = ICONS[i % ICONS.length];
                            const color = CAT[i % CAT.length];
                            return (
                                <article key={d.id} className="rounded-2xl bg-white p-5" style={{ border: `1px solid ${BORDER}` }}>
                                    <div className="flex items-start justify-between">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: color }}>
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <StatusBadge status={d.status === 'active' ? 'active' : 'inactive'} />
                                    </div>
                                    <h2 className="mt-4 font-fraunces text-lg font-semibold text-brand-ink">{d.name}</h2>
                                    <p className="mt-1 text-xs text-brand-muted">{d.description || d.slug}</p>
                                    <p className="mt-3 text-sm text-brand-muted">{d.users_count ?? 0} {Number(d.users_count) === 1 ? 'member' : 'members'}</p>
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <Link href={`/admin/departments/${d.id}`} className="rounded-xl py-2 text-center text-xs font-semibold" style={{ background: SURFACE, color: TEAL }}>
                                            Dashboard
                                        </Link>
                                        {canManageUsers ? (
                                            <Link href={`/admin/departments/${d.id}/edit`} className="rounded-xl py-2 text-center text-xs font-semibold text-white" style={{ background: TEAL }}>
                                                Edit
                                            </Link>
                                        ) : (
                                            <span className="rounded-xl py-2 text-center text-xs font-semibold" style={{ background: TEAL_LIGHT, color: TEAL }}>
                                                View
                                            </span>
                                        )}
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
