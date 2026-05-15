import AppLayout from '@/layouts/app-layout';
import DepartmentActivityList from '@/components/department/DepartmentActivityList';
import DepartmentQuickAction from '@/components/department/DepartmentQuickAction';
import DepartmentSectionCard from '@/components/department/DepartmentSectionCard';
import DepartmentStatCard from '@/components/department/DepartmentStatCard';
import { Head, Link } from '@inertiajs/react';
import {
    BadgeDollarSign,
    FileSpreadsheet,
    Landmark,
    PiggyBank,
    PieChart,
    Receipt,
    ShieldCheck,
} from 'lucide-react';

const kpis = [
    { label: 'Total contributions', value: 'Ls 428,900', hint: 'YTD recorded', tone: 'emerald' },
    { label: 'Total expenses', value: 'Ls 192,410', hint: 'YTD paid out', tone: 'rose' },
    { label: 'Current budget', value: 'Ls 610k', hint: 'Approved FY outlook', tone: 'blue' },
    { label: 'Pending approvals', value: '7', hint: 'Invoices / requests', tone: 'amber' },
];

const transactions = [
    { id: 1, title: 'Vendor payment — venue rental (youth forum)', meta: 'Expense • Finance lead', time: 'Today' },
    { id: 2, title: 'Member contribution batch #442', meta: 'Income • Mobile money', time: 'Yesterday' },
    { id: 3, title: 'Office supplies restock', meta: 'Expense • petty cash', time: '2d ago' },
];

const budgetUtil = [
    { id: 1, title: 'Programs allocation', meta: '62% utilized • on plan', time: 'OK' },
    { id: 2, title: 'Operations', meta: '78% utilized • watchlist', time: 'Review' },
    { id: 3, title: 'Reserves', meta: '18% utilized • healthy buffer', time: 'OK' },
];

const pendingFinancial = [
    { id: 1, title: 'Reimbursement — field enumerators (census)', meta: 'Receipts attached', time: 'Due Wed' },
    { id: 2, title: 'Fundraising campaign payout reconciliation', meta: 'Bank feed mismatch', time: 'Due Fri' },
];

const pendingTasks = [
    { id: 1, title: 'Sign off on Q2 adjournment accounts', meta: 'Treasurer + Chair', time: 'Due Mon' },
    { id: 2, title: 'Update vote ledger for micro-grants', meta: 'Programs liaison', time: 'Due Thu' },
];

const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Finance & Administration' },
];

export default function FinanceAdministrationDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finance & Administration · Dashboard" />
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(29,84,114)]">Department overview</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Finance &amp; Administration</h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-600">
                            Contributions, expenses, budgets, and administrative controls (placeholder figures).
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

                <DepartmentSectionCard title="Quick actions" subtitle="Finance workflows — connect to modules when available.">
                    <div className="flex flex-wrap gap-3">
                        <DepartmentQuickAction href={null} label="Add expense" icon={Receipt} comingSoon />
                        <DepartmentQuickAction href={null} label="Add contribution" icon={PiggyBank} comingSoon />
                        <DepartmentQuickAction href={null} label="Create budget" icon={PieChart} comingSoon />
                        <DepartmentQuickAction href="/admin/analytics" label="Generate finance report" icon={FileSpreadsheet} />
                    </div>
                </DepartmentSectionCard>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Pending tasks" subtitle="Approvals and follow-ups.">
                        <DepartmentActivityList items={pendingTasks} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Pending financial requests" subtitle="Queue snapshot.">
                        <DepartmentActivityList items={pendingFinancial} />
                    </DepartmentSectionCard>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <DepartmentSectionCard title="Recent transactions" subtitle="Latest ledger movement (sample).">
                        <DepartmentActivityList items={transactions} />
                    </DepartmentSectionCard>
                    <DepartmentSectionCard title="Budget utilization" subtitle="High-level burn vs plan.">
                        <DepartmentActivityList items={budgetUtil} />
                    </DepartmentSectionCard>
                </div>

                <DepartmentSectionCard
                    title="Department reports"
                    subtitle="Financial statements and compliance exports (placeholders)."
                    action={
                        <Link href="/admin/analytics" className="text-sm font-medium text-[rgb(29,84,114)] hover:underline">
                            Open analytics
                        </Link>
                    }
                >
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <BadgeDollarSign className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Income statement</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Placeholder export • wire to fundraising + ledger.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Landmark className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Cash position</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Sample tile • connect bank reconciliation job.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <ShieldCheck className="h-4 w-4 text-[rgb(29,84,114)]" />
                                <span className="text-sm font-semibold">Audit trail pack</span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600">Compliance bundle • pending activity log integration.</p>
                        </div>
                    </div>
                </DepartmentSectionCard>
            </div>
        </AppLayout>
    );
}
