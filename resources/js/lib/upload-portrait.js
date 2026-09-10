import { router } from '@inertiajs/react';

export function uploadPortrait(file, onUrl) {
    if (!file) {
        return;
    }

    const form = new FormData();
    form.append('image', file);

    router.post(route('admin.media.portrait'), form, {
        forceFormData: true,
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
            const url = page.props.flash?.uploaded_image;
            if (url) {
                onUrl(url);
            }
        },
    });
}
