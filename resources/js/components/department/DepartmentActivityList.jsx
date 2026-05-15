export default function DepartmentActivityList({ items = [] }) {
    if (!items.length) {
        return <p className="text-sm text-slate-500">No items yet.</p>;
    }

    return (
        <ul className="divide-y divide-slate-100">
            {items.map((item) => (
                <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900">{item.title}</p>
                        {item.meta ? <p className="mt-0.5 text-xs text-slate-600">{item.meta}</p> : null}
                    </div>
                    <span className="shrink-0 text-xs font-medium tabular-nums text-slate-500">{item.time}</span>
                </li>
            ))}
        </ul>
    );
}
