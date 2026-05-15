const toneClasses = {
    blue: 'border-blue-200/80 bg-blue-50/50',
    emerald: 'border-emerald-200/80 bg-emerald-50/50',
    amber: 'border-amber-200/80 bg-amber-50/50',
    rose: 'border-rose-200/80 bg-rose-50/50',
    violet: 'border-violet-200/80 bg-violet-50/50',
    default: 'border-slate-200 bg-slate-50/40',
};

export default function DepartmentStatCard({ label, value, hint, tone = 'default' }) {
    const shell = toneClasses[tone] ?? toneClasses.default;

    return (
        <div className={`rounded-xl border p-4 shadow-sm ${shell}`}>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
            {hint ? <p className="mt-1 text-xs text-slate-600">{hint}</p> : null}
        </div>
    );
}
