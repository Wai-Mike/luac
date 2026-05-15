import { usePage } from '@inertiajs/react';

/**
 * Resolve user / role / path for admin screens (controllers may omit some props).
 */
export function useAdminPageProps(overrides = {}) {
    const page = usePage();
    const authUser = page.props.auth?.user ?? null;
    const rawUrl = page.url || '';
    const path = rawUrl.startsWith('/') ? rawUrl.split('?')[0] : `/${rawUrl.split('?')[0]}`;

    return {
        user: overrides.user ?? authUser,
        role: overrides.role ?? authUser?.role ?? 'admin',
        currentPath: overrides.currentPath ?? path,
    };
}

/** Laravel paginator or plain array */
export function paginatorItems(paginator) {
    if (!paginator) return [];
    if (Array.isArray(paginator)) return paginator;
    if (Array.isArray(paginator.data)) return paginator.data;
    return [];
}
