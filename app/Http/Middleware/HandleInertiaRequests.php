<?php

namespace App\Http\Middleware;

use App\Models\AdminNotification;
use App\Models\PostComments;
use App\Models\User;
use App\Support\SiteContentRepository;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => function () use ($request) {
                    $user = $request->user();
                    if ($user instanceof \App\Models\User) {
                        $user->loadMissing('department');
                    }

                    return $user;
                },
                'permissions' => function () use ($request) {
                    $user = $request->user();

                    return $user instanceof \App\Models\User ? $user->permissionNames() : [];
                },
                'capabilities' => function () use ($request) {
                    $user = $request->user();
                    if (! $user instanceof \App\Models\User) {
                        return [
                            'manage_users' => false,
                            'edit_content' => false,
                        ];
                    }

                    return [
                        'manage_users' => $user->canManageUsers(),
                        'edit_content' => $user->canEditContent(),
                    ];
                },
            ],
            'site' => fn () => SiteContentRepository::get(),
            'admin' => [
                'pending_moderation' => function () {
                    if (! Schema::hasTable('post_comments')) {
                        return 0;
                    }

                    return PostComments::query()
                        ->where(fn ($q) => $q->where('is_approved', false)->orWhereNull('is_approved'))
                        ->count();
                },
                'notifications' => function () use ($request) {
                    $empty = ['unread' => 0, 'items' => []];
                    $user = $request->user();

                    if (! $user instanceof User || ! $user->canAccessAdminPanel() || ! Schema::hasTable('admin_notifications')) {
                        return $empty;
                    }

                    return [
                        'unread' => AdminNotification::query()->whereNull('read_at')->count(),
                        'items' => AdminNotification::query()
                            ->latest()
                            ->limit(12)
                            ->get(['id', 'type', 'title', 'body', 'url', 'read_at', 'created_at']),
                    ];
                },
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'uploaded_image' => $request->session()->get('uploaded_image'),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
