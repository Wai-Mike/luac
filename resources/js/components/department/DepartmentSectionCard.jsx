export default function DepartmentSectionCard({ title, subtitle, action, children }) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                    {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
                </div>
                {action ? <div className="shrink-0">{action}</div> : null}
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
}
