import { usePage } from '@inertiajs/react';

export default function useCapabilities() {
    const capabilities = usePage().props.auth?.capabilities ?? {};

    return {
        canManageUsers: Boolean(capabilities.manage_users),
        canEditContent: Boolean(capabilities.edit_content),
    };
}
