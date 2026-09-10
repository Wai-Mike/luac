<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use Illuminate\Http\RedirectResponse;

class AdminNotificationController extends Controller
{
    public function markRead(AdminNotification $notification): RedirectResponse
    {
        if (! $notification->read_at) {
            $notification->forceFill(['read_at' => now()])->save();
        }

        $target = AdminNotification::relativeUrl($notification->url);

        if ($target) {
            return redirect($target);
        }

        return back();
    }

    public function markAllRead(): RedirectResponse
    {
        AdminNotification::query()->whereNull('read_at')->update(['read_at' => now()]);

        return back();
    }
}
