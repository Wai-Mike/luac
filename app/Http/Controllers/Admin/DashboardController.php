<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\YouthMember;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function analytics()
    {
        $admin = Auth::user();

        $userGrowth = User::query()
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($row) => ['date' => $row->date, 'users' => $row->count]);

        $youthGrowth = YouthMember::query()
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($row) => ['date' => $row->date, 'registrations' => $row->count]);

        $analytics = [
            'totals' => [
                'users' => User::count(),
                'youth_members' => YouthMember::count(),
            ],
            'userGrowth' => $userGrowth,
            'youthGrowth' => $youthGrowth,
        ];

        return Inertia::render('admin/analytics/index', [
            'analytics' => $analytics,
            'user' => $admin,
            'role' => 'admin',
            'currentPath' => request()->path(),
        ]);
    }
}
