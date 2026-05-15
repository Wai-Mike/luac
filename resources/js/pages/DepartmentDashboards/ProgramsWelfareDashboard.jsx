import AppLayout from '@/layouts/app-layout';
import DepartmentActivityList from '@/components/department/DepartmentActivityList';
import DepartmentQuickAction from '@/components/department/DepartmentQuickAction';
import DepartmentSectionCard from '@/components/department/DepartmentSectionCard';
import DepartmentStatCard from '@/components/department/DepartmentStatCard';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, CalendarDays, ClipboardList, FileBarChart2, Gift, Users2 } from 'lucide-react';

const kpis = [
    { label: 'Active programs', value: '14', hint: 'Running this quarter', tone: 'blue' },
    { label: 'Upcoming events', value: '6', hint: 'Next 30 days', tone: 'violet' },
    { label: 'Beneficiaries', value: '3,420', hint: 'Cumulative reach', tone: 'emerald' },
    { label: 'Pending welfare requests', value: '11', hint: 'Needs triage', tone: 'amber' },
];

const recentPrograms = [
    { id: 1, title: 'Youth skills bootcamp — cohort B', meta: 'Programs lead', time: 'Kickoff Mon' },
    { id: 2, title: 'Scholarship screening window', meta: 'Education track', time: 'Closes Sun' },
    { id: 3, title: 'Community health volunteers training', meta: 'Welfare', time: 'Ongoing' },
];

const welfareActivities = [
    { id: 1, title: 'Emergency food packs — west ward', meta: '12 families served', time: 'Last week' },
    { id: 2, title: 'Peer counseling drop-in (Sat)', meta: '12 attended', time: '3d ago' },
];

const upcomingEvents = [
    { id: 1, title: 'Inter-school debate (culture)', meta: 'County hall', time: 'Sat 09:00' },
    { id: 2, title: 'Sports league finals — football', meta: 'Municipal pitch', time: 'Sun 15:00' },
    { id: 3, title: 'STEM Saturday for girls', meta: 'ICT lab partner', time: 'Next Sat' },
];

const pendingTasks = [
    { id: 1, title: 'Finalize nutrition partner MOU addendum', meta: 'Programs + Legal', time: 'Due Tue' },
    { id: 2, title: 'Publish event gallery for youth week', meta: 'Comms', time: 'Due Thu' },
];

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Programs & Welfare' },
];

export default function ProgramsWelfareDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programs & Welfare · Dashboard" />
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(29,84,114)]">Department overview</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Programs &amp; Welfare</h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-600">
                            Program delivery, welfare response, sports / culture / education touchpoints (sample data).
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

                <DepartmentSectionCard title="Quick actions" subtitle="Operational shortcuts for programmes team.">
                    <div className="flex flex-wrap gap-3">
                        <DepartmentQuickAction href={null} label="Create program" icon={BookOpen} comingSoon />
                        <DepartmentQuickAction href={null} label="Add event" icon={CalendarDays} comingSoon />
                        <DepartmentQuickAction href="/admin/youth-members" label="Register beneficiary / census" icon={Users2} />
                        <DepartmentQuickAction href="/admin/analytics" label="Generate program report" icon={FileBarChart2} />
                    </div>
                </DepartmentSectionCard>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Pending tasks" subtitle="Coordination backlog.">
                        <DepartmentActivityList items={pendingTasks} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Upcoming education / sports / culture" subtitle="Events calendar (sample).">
                        <DepartmentActivityList items={upcomingEvents} />
                    </DepartmentSectionCard>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Recent programs" subtitle="Delivery pipeline highlights.">
                        <DepartmentActivityList items={recentPrograms} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Welfare activities" subtitle="Field interventions & outreach.">
                        <DepartmentActivityList items={welfareActivities} />
                    </DepartmentSectionCard>
                </div>

                <DepartmentSectionCard
                    title="Department reports"
                    subtitle="Program KPIs and welfare case summaries."
                    action={
                        <Link href="/admin/analytics" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                            Open analytics
                        </Link>
                    }
                >
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <ClipboardList className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Quarterly outcomes</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Placeholder PDF • KPIs pending backend.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Gift className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Welfare disbursements</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">CSV sample • integrates with approvals.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Users2 className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Beneficiary reach map</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Visual placeholder • map provider TBD.</p>
                        </div>
                    </div>
                </DepartmentSectionCard>
            </div>
        </AppLayout>
    );
}
