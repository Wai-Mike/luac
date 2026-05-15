import AppLayout from '@/layouts/app-layout';
import DepartmentActivityList from '@/components/department/DepartmentActivityList';
import DepartmentQuickAction from '@/components/department/DepartmentQuickAction';
import DepartmentSectionCard from '@/components/department/DepartmentSectionCard';
import DepartmentStatCard from '@/components/department/DepartmentStatCard';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, Building2, CalendarPlus, ClipboardList, FileSignature, FileText } from 'lucide-react';

const kpis = [
    { label: 'Total executive members', value: '48', hint: 'Across council & aides', tone: 'blue' },
    { label: 'Pending resolutions', value: '6', hint: 'Awaiting quorum / sign-off', tone: 'amber' },
    { label: 'Active meetings', value: '3', hint: 'This month', tone: 'emerald' },
    { label: 'Departments monitored', value: '5', hint: 'All units reporting', tone: 'violet' },
];

const recentDecisions = [
    { id: 1, title: 'Youth mentorship budget approved — Q3', meta: 'Confidential • Executive session', time: '2h ago' },
    { id: 2, title: 'Revised grievance escalation path published', meta: 'Policy • v1.2', time: 'Yesterday' },
    { id: 3, title: 'Inter-department KPI cadence locked (monthly)', meta: 'Governance', time: '3d ago' },
];

const deptPerformance = [
    { id: 1, title: 'Programs & Welfare', meta: 'On track • 94% milestones', time: '+2%' },
    { id: 2, title: 'Finance & Administration', meta: 'Attention • approvals backlog', time: '−1%' },
    { id: 3, title: 'ICT & Information', meta: 'Healthy uptime', time: 'OK' },
];

const upcomingMeetings = [
    { id: 1, title: 'Council strategy session', meta: 'Board room / hybrid', time: 'Thu 10:00' },
    { id: 2, title: 'Quarterly risk review', meta: 'Legal + Finance', time: 'Mon 14:30' },
];

const pendingTasks = [
    { id: 1, title: 'Circulate draft communique to department leads', meta: 'Owner: Secretary', time: 'Due Fri' },
    { id: 2, title: 'Approve external speaker list for youth forum', meta: 'Compliance check', time: 'Due Sun' },
    { id: 3, title: 'Follow up on MOU status with county liaison', meta: 'External affairs', time: 'Due next week' },
];

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Executive Office' },
];

export default function ExecutiveOfficeDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Executive Office · Dashboard" />
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(29,84,114)]">Department overview</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Executive Office</h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-600">
                            Council coordination, resolutions, executive decisions, and cross-department performance.
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

                <DepartmentSectionCard title="Quick actions" subtitle="Shortcuts for common executive workflows (placeholders where noted).">
                    <div className="flex flex-wrap gap-3">
                        <DepartmentQuickAction href={null} label="Create meeting" icon={CalendarPlus} comingSoon />
                        <DepartmentQuickAction href={null} label="Add resolution" icon={FileText} comingSoon />
                        <DepartmentQuickAction href={null} label="Assign task" icon={ClipboardList} comingSoon />
                        <DepartmentQuickAction href="/admin/analytics" label="View reports" icon={BarChart3} />
                    </div>
                </DepartmentSectionCard>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Pending tasks" subtitle="Items needing executive attention.">
                        <DepartmentActivityList items={pendingTasks} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Upcoming meetings" subtitle="Scheduled sessions and reviews.">
                        <DepartmentActivityList items={upcomingMeetings} />
                    </DepartmentSectionCard>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Recent executive decisions" subtitle="Latest motions and approvals.">
                        <DepartmentActivityList items={recentDecisions} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Department performance summary" subtitle="High-level pulse by unit.">
                        <DepartmentActivityList items={deptPerformance} />
                    </DepartmentSectionCard>
                </div>

                <DepartmentSectionCard
                    title="Department reports"
                    subtitle="Export-ready summaries (sample tiles — wire to backend when ready)."
                    action={
                        <Link
                            href="/admin/analytics"
                            className="text-sm font-medium text-[rgb(29,84,114)] hover:underline"
                        >
                            Open analytics
                        </Link>
                    }
                >
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <FileSignature className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Executive digest</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">PDF • Last generated 5 days ago (placeholder).</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Building2 className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Cross-dept scorecard</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">CSV • KPI export pending integration.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <BarChart3 className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Risk & compliance pack</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Deck • Placeholder until legal module ships.</p>
                        </div>
                    </div>
                </DepartmentSectionCard>
            </div>
        </AppLayout>
    );
}
