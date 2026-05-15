<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Department;
use App\Models\User;
use App\Models\YouthMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        $stats = [
            'total_users' => User::count(),
            'total_youth_members' => YouthMember::count(),
            'total_departments' => Department::query()->count(),
            'active_departments' => Department::query()->where('status', 'active')->count(),
        ];

        $recent_youth = YouthMember::query()
            ->latest()
            ->limit(5)
            ->get();

        $recent_activity = ActivityLog::query()
            ->with('user:id,name')
            ->latest()
            ->limit(8)
            ->get();

        return Inertia::render('admin/dashboard', [
            'user' => $user,
            'stats' => $stats,
            'recent_youth' => $recent_youth,
            'recent_activity' => $recent_activity,
        ]);
    }

    public function users()
    {
        $users = User::query()->latest()->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function updateUserRole(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'role' => 'required|in:member,management,admin',
        ]);

        $user->update($validated);

        return redirect()->route('admin.users')->with('success', 'User role updated successfully!');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot delete your own account.');
        }
        $user->delete();

        return redirect()->route('admin.users')->with('success', 'User deleted successfully!');
    }

    public function settings()
    {
        return Inertia::render('admin/settings/index');
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'required|string|max:500',
            'contact_email' => 'required|email',
        ]);

        return redirect()->route('admin.settings')->with('success', 'Settings updated successfully!');
    }
}
