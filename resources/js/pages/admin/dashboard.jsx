import AppLayout from '@/layouts/app-layout';
import useCapabilities from '@/hooks/useCapabilities';
import { Head, Link, usePage } from '@inertiajs/react';
import { Clapperboard, GraduationCap, HeartHandshake, Image, Mail, Store, Users } from 'lucide-react';

const breadcrumbs = [{ title: 'Dashboard' }];

function money(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
        Number(amount || 0),
    );
}

export default function AdminDashboard({
    stats = {},
    recent_youth = [],
    recent_donations = [],
    recent_messages = [],
    executives = [],
    recent_activity = [],
}) {
    const page = usePage();
    const user = page.props.auth?.user;
    const flash = page.props.flash ?? {};
    const { canEditContent, canManageUsers } = useCapabilities();

    return (
        <AppLayout breadcrumbs={breadcrumbs} contentClassName="bg-brand-soft !px-0 !pt-0">
            <Head title="Executive · Dashboard" />

            <div className="bg-brand-dark px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">Executive</p>
                    <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                        Welcome{user?.name ? `, ${user.name}` : ''}
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/70">
                        Review public submissions and keep the LAYYA website current.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        <Link href={route('admin.content.site.edit')} className="btn btn-amber">
                            {canEditContent ? 'Edit website' : 'View website'}
                        </Link>
                        <Link href={route('admin.media.index')} className="btn btn-ghost">
                            Photos & videos
                        </Link>
                        {canManageUsers ? (
                            <Link href={route('admin.users')} className="btn btn-ghost">
                                Manage users
                            </Link>
                        ) : null}
                        <Link href={route('admin.youth-members.index')} className="btn btn-ghost">
                            Youth census
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {flash.success ? (
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm text-brand">{flash.success}</div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="Executives" value={stats.total_executives ?? 0} icon={Users} />
                    <StatCard
                        label="Youth census"
                        value={stats.total_youth_members ?? 0}
                        href={route('admin.youth-members.index')}
                        icon={GraduationCap}
                    />
                    <StatCard
                        label="Donations"
                        value={stats.total_donations ?? 0}
                        hint={`${money(stats.donations_usd)} USD`}
                        href={route('admin.donations.index')}
                        icon={HeartHandshake}
                    />
                    <StatCard label="New messages" value={stats.new_messages ?? 0} href={route('admin.contacts.index')} icon={Mail} />
                    <StatCard label="Departments" value={stats.total_departments ?? 0} href={route('admin.departments.index')} icon={Store} />
                    <StatCard
                        label="Gallery photos"
                        value={stats.gallery_items ?? 0}
                        href={route('admin.media.index', { kind: 'gallery' })}
                        icon={Image}
                    />
                    <StatCard
                        label="Videos"
                        value={stats.video_items ?? 0}
                        href={route('admin.media.index', { kind: 'video' })}
                        icon={Clapperboard}
                    />
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">Quick links</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Link
                                href={route('admin.contacts.index')}
                                className="rounded-full bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark"
                            >
                                Messages
                            </Link>
                            <Link
                                href={route('admin.donations.index')}
                                className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand hover:bg-cream"
                            >
                                Donations
                            </Link>
                            <Link
                                href={route('home')}
                                className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand hover:bg-cream"
                            >
                                View public site
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Panel title="Recent youth registrations" empty="No census records yet.">
                        {recent_youth.map((y) => (
                            <li key={y.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                                <span className="font-medium text-brand-ink">
                                    {y.first_name} {y.last_name}
                                </span>
                                <span className="text-brand-muted">{y.county || '—'}</span>
                                <Link href={`/admin/youth-members/${y.id}`} className="font-semibold text-brand hover:underline">
                                    View
                                </Link>
                            </li>
                        ))}
                    </Panel>

                    <Panel title="Recent donations" empty="No donations yet.">
                        {recent_donations.map((donation) => (
                            <li key={donation.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                                <span className="font-medium text-brand-ink">{donation.donor_name}</span>
                                <span className="text-brand-muted">{donation.campaign?.title || 'Gift'}</span>
                                <span className="text-brand">{money(donation.amount_usd)}</span>
                            </li>
                        ))}
                    </Panel>

                    <Panel title="New and recent messages" empty="No contact messages yet.">
                        {recent_messages.map((message) => (
                            <li key={message.id} className="px-5 py-3 text-sm">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="font-medium text-brand-ink">{message.name}</span>
                                    <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs uppercase text-brand">
                                        {message.status}
                                    </span>
                                </div>
                                <p className="mt-1 line-clamp-2 text-brand-muted">{message.message}</p>
                            </li>
                        ))}
                    </Panel>

                    <Panel title="Executive members" empty="No executive accounts yet.">
                        {executives.map((executive) => (
                            <li key={executive.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                                <span className="font-medium text-brand-ink">{executive.name}</span>
                                <span className="text-brand-muted">{executive.email}</span>
                            </li>
                        ))}
                    </Panel>
                </div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                    <div className="border-b border-brand/10 px-5 py-4">
                        <h2 className="text-lg font-semibold text-brand-ink">Recent activity</h2>
                    </div>
                    <ul className="divide-y divide-brand/10">
                        {recent_activity.length === 0 ? (
                            <li className="px-5 py-8 text-center text-sm text-brand-muted">Activity will appear as you manage the system.</li>
                        ) : (
                            recent_activity.map((entry) => (
                                <li key={entry.id} className="flex flex-col gap-1 px-5 py-3 text-sm">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-cream px-2 py-0.5 text-xs font-semibold uppercase text-brand-ink">
                                            {entry.action}
                                        </span>
                                        <span className="font-medium text-brand-ink">{entry.description}</span>
                                    </div>
                                    <p className="text-xs text-brand-muted">
                                        {entry.user?.name ?? 'System'} · {entry.created_at ? new Date(entry.created_at).toLocaleString() : '—'}
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ label, value, hint, href, icon: Icon }) {
    const inner = (
        <>
            <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">{label}</p>
                {Icon ? (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Icon className="h-4 w-4" />
                    </span>
                ) : null}
            </div>
            <p className="mt-3 text-3xl font-semibold text-brand-ink">{value}</p>
            {hint ? <p className="mt-1 text-xs text-brand-muted">{hint}</p> : null}
        </>
    );

    if (href) {
        return (
            <Link href={href} className="rounded-3xl bg-white p-5 shadow-sm transition hover:ring-2 hover:ring-brand/20">
                {inner}
            </Link>
        );
    }

    return <div className="rounded-3xl bg-white p-5 shadow-sm">{inner}</div>;
}

function Panel({ title, empty, children }) {
    const items = Array.isArray(children) ? children : [];

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-brand/10 px-5 py-4">
                <h2 className="text-lg font-semibold text-brand-ink">{title}</h2>
            </div>
            <ul className="divide-y divide-brand/10">
                {items.length === 0 ? <li className="px-5 py-8 text-center text-sm text-brand-muted">{empty}</li> : children}
            </ul>
        </div>
    );
}
