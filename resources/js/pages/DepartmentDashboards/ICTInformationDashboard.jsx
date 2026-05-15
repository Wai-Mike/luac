import AppLayout from '@/layouts/app-layout';
import DepartmentActivityList from '@/components/department/DepartmentActivityList';
import DepartmentQuickAction from '@/components/department/DepartmentQuickAction';
import DepartmentSectionCard from '@/components/department/DepartmentSectionCard';
import DepartmentStatCard from '@/components/department/DepartmentStatCard';
import { Head, Link } from '@inertiajs/react';
import { Activity, Cpu, Monitor, ScrollText, Shield, UserPlus, Wrench } from 'lucide-react';

const kpis = [
    { label: 'Total system users', value: '1,284', hint: 'Registered accounts', tone: 'blue' },
    { label: 'Active users', value: '312', hint: 'Last 7 days', tone: 'emerald' },
    { label: 'Open support tasks', value: '9', hint: 'ICT queue', tone: 'amber' },
    { label: 'Website / system status', value: 'Operational', hint: 'All services green', tone: 'default' },
];

const sysActivities = [
    { id: 1, title: 'SSL certificate renewed (public site)', meta: 'Infrastructure', time: 'Today' },
    { id: 2, title: 'Database backup completed', meta: 'Nightly job', time: 'Last night' },
    { id: 3, title: 'Admin role permissions synced', meta: 'RBAC seeder run', time: '2d ago' },
];

const accessSummary = [
    { id: 1, title: 'Staff with admin access', meta: '18 users • reviewed monthly', time: 'OK' },
    { id: 2, title: 'API tokens active', meta: 'Sanctum • 42 tokens', time: 'Review' },
    { id: 3, title: 'MFA adoption (pilot)', meta: '6% users • goal 25%', time: 'Track' },
];

const supportReqs = [
    { id: 1, title: 'Reset 2FA for finance officer', meta: 'Priority normal', time: 'Open' },
    { id: 2, title: 'News post image upload failing (Safari)', meta: 'Repro attached', time: 'In progress' },
];

const pendingTasks = [
    { id: 1, title: 'Patch dependency audit (moderate)', meta: 'npm / composer', time: 'Due Fri' },
    { id: 2, title: 'Review CDN cache rules for media', meta: 'Performance', time: 'Due next sprint' },
];

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'ICT & Information' },
];

export default function ICTInformationDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ICT & Information · Dashboard" />
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(29,84,114)]">Department overview</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">ICT &amp; Information</h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-600">
                            Platform health, user access patterns, support workload, and change activity (placeholder metrics).
                        </p>
                    </div>
                    <Link href="/admin" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                        ← Main admin
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {kpis.map((k) => (
                        <DepartmentStatCard key={k.label} {...k} />
                    ))}
                </div>

                <DepartmentSectionCard title="Quick actions" subtitle="Operational shortcuts for the digital workspace.">
                    <div className="flex flex-wrap gap-3">
                        <DepartmentQuickAction href="/admin/users" label="Add / manage users" icon={UserPlus} />
                        <DepartmentQuickAction href={null} label="View activity logs" icon={ScrollText} comingSoon />
                        <DepartmentQuickAction href={null} label="Manage website updates" icon={Monitor} comingSoon />
                        <DepartmentQuickAction href={null} label="Create ICT task" icon={Wrench} comingSoon />
                    </div>
                </DepartmentSectionCard>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Pending tasks" subtitle="Infrastructure & support backlog.">
                        <DepartmentActivityList items={pendingTasks} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Technical support requests" subtitle="Open tickets snapshot.">
                        <DepartmentActivityList items={supportReqs} />
                    </DepartmentSectionCard>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Recent system activities" subtitle="Deployments, backups, RBAC updates.">
                        <DepartmentActivityList items={sysActivities} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="User access summary" subtitle="Privileged access posture (sample).">
                        <DepartmentActivityList items={accessSummary} />
                    </DepartmentSectionCard>
                </div>

                <DepartmentSectionCard
                    title="Department reports"
                    subtitle="Runbooks, uptime, and audit exports."
                    action={
                        <Link href="/admin/analytics" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                            Open analytics
                        </Link>
                    }
                >
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Activity className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Uptime report</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Placeholder • wire to monitoring provider.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Shield className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Access review packet</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">CSV of roles &amp; pivot assignments (planned).</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Cpu className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Change log digest</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Placeholder • CMS + infra changes.</p>
                        </div>
                    </div>
                </DepartmentSectionCard>
            </div>
        </AppLayout>
    );
}
