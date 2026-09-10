import AdminLayout from '@/layouts/admin-layout';

export default function AppLayout({ children, breadcrumbs = [], title, subtitle }) {
    const last = breadcrumbs[breadcrumbs.length - 1];

    return (
        <AdminLayout title={title || last?.title || 'Dashboard'} subtitle={subtitle}>
            {children}
        </AdminLayout>
    );
}
