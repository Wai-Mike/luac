import AppLayout from '@/layouts/app-layout';
import DepartmentActivityList from '@/components/department/DepartmentActivityList';
import DepartmentQuickAction from '@/components/department/DepartmentQuickAction';
import DepartmentSectionCard from '@/components/department/DepartmentSectionCard';
import DepartmentStatCard from '@/components/department/DepartmentStatCard';
import { Head, Link } from '@inertiajs/react';
import { Anchor, ArrowRightLeft, FileCheck2, FileText, Handshake, Scale, Upload } from 'lucide-react';

const kpis = [
    { label: 'Active partnerships', value: '23', hint: 'MOUs / LOIs in force', tone: 'blue' },
    { label: 'Legal documents', value: '186', hint: 'Repository index', tone: 'violet' },
    { label: 'Pending agreements', value: '4', hint: 'Awaiting signature', tone: 'amber' },
    { label: 'Compliance reviews', value: '2', hint: 'Scheduled this month', tone: 'emerald' },
];

const partnerships = [
    { id: 1, title: 'County youth desk — joint outreach', meta: 'Renewal discussion', time: 'This week' },
    { id: 2, title: 'Local NGO coalition (education)', meta: 'Quarterly sync', time: 'Next week' },
];

const docReviews = [
    { id: 1, title: 'Vendor contract — events staging', meta: 'Clause 7 liability', time: 'Review due Mon' },
    { id: 2, title: 'Volunteer waiver — v2026.1', meta: 'Plain-language pass', time: 'In review' },
];

const pendingMous = [
    { id: 1, title: 'ICT lab sponsor — equipment grant', meta: 'Awaiting board countersign', time: 'Pending' },
    { id: 2, title: 'Media partner — joint campaign', meta: 'Marketing + Legal', time: 'Pending' },
];

const pendingTasks = [
    { id: 1, title: 'File annual returns reminder to finance', meta: 'Compliance calendar', time: 'Due Wed' },
    { id: 2, title: 'Redline data-sharing addendum (census)', meta: 'External counsel', time: 'Due Fri' },
];

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'External & Legal Affairs' },
];

export default function ExternalLegalAffairsDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="External & Legal Affairs · Dashboard" />
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(29,84,114)]">Department overview</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">External &amp; Legal Affairs</h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-600">
                            Partnerships, agreements, regulatory posture, and document lifecycle (placeholder data).
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

                <DepartmentSectionCard title="Quick actions" subtitle="Partnership & legal workflows.">
                    <div className="flex flex-wrap gap-3">
                        <DepartmentQuickAction href={null} label="Add partner" icon={Handshake} comingSoon />
                        <DepartmentQuickAction href={null} label="Upload agreement" icon={Upload} comingSoon />
                        <DepartmentQuickAction href={null} label="Add legal record" icon={Scale} comingSoon />
                        <DepartmentQuickAction href={null} label="Create compliance review" icon={FileCheck2} comingSoon />
                    </div>
                </DepartmentSectionCard>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Pending tasks" subtitle="Counsel inbox snapshot.">
                        <DepartmentActivityList items={pendingTasks} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Pending MOUs / contracts" subtitle="Signature workflow queue.">
                        <DepartmentActivityList items={pendingMous} />
                    </DepartmentSectionCard>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Recent partnerships" subtitle="Relationship health & cadence.">
                        <DepartmentActivityList items={partnerships} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Legal document reviews" subtitle="Redlines, waivers, vendor paper.">
                        <DepartmentActivityList items={docReviews} />
                    </DepartmentSectionCard>
                </div>

                <DepartmentSectionCard
                    title="Department reports"
                    subtitle="Compliance certificates, agreement registers, diligence packs."
                    action={
                        <Link href="/admin/analytics" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                            Open analytics
                        </Link>
                    }
                >
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <FileText className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Agreement register</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">XLSX placeholder • versioned repository later.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Anchor className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Partnership risk digest</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Sample summary • tie to external monitoring.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <ArrowRightLeft className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Compliance evidence bundle</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Zip placeholder • audit checklist export.</p>
                        </div>
                    </div>
                </DepartmentSectionCard>
            </div>
        </AppLayout>
    );
}
