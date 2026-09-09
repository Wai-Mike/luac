<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ContactMessage;
use App\Models\Department;
use App\Models\Donation;
use App\Models\User;
use App\Models\SiteMedia;
use App\Models\YouthMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        $stats = [
            'total_executives' => User::query()
                ->where(fn ($q) => $q->where('is_executive', true)->orWhere('role', User::ROLE_ADMIN))
                ->count(),
            'total_youth_members' => YouthMember::count(),
            'total_donations' => Donation::query()->count(),
            'donations_usd' => Donation::query()->sum('amount_usd'),
            'new_messages' => ContactMessage::query()->where('status', 'new')->count(),
            'total_departments' => Department::query()->count(),
            'gallery_items' => Schema::hasTable('site_media') ? SiteMedia::query()->gallery()->count() : 0,
            'video_items' => Schema::hasTable('site_media') ? SiteMedia::query()->videos()->count() : 0,
        ];

        $recent_youth = YouthMember::query()
            ->latest()
            ->limit(5)
            ->get();

        $recent_donations = Donation::query()
            ->with('campaign:id,title')
            ->latest('donated_at')
            ->limit(5)
            ->get();

        $recent_messages = ContactMessage::query()->latest()->limit(5)->get();

        $executives = User::query()
            ->where(fn ($q) => $q->where('is_executive', true)->orWhere('role', User::ROLE_ADMIN))
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'department_id']);

        $recent_activity = ActivityLog::query()
            ->with('user:id,name')
            ->latest()
            ->limit(8)
            ->get();

        return Inertia::render('admin/dashboard', [
            'user' => $user,
            'stats' => $stats,
            'recent_youth' => $recent_youth,
            'recent_donations' => $recent_donations,
            'recent_messages' => $recent_messages,
            'executives' => $executives,
            'recent_activity' => $recent_activity,
        ]);
    }

    public function users()
    {
        $users = User::query()
            ->with('department:id,name,slug')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'departments' => Department::query()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', Rule::in([User::ROLE_VIEWER, User::ROLE_ADMIN])],
            'department_id' => ['nullable', 'exists:departments,id'],
            'phone' => ['nullable', 'string', 'max:50'],
        ]);

        User::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'],
            'department_id' => $validated['department_id'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'is_executive' => true,
            'is_chairman' => false,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        return redirect()->route('admin.users')->with('success', 'Executive account created.');
    }

    public function updateUserRole(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user->isChairman()) {
            return redirect()->route('admin.users')->with('error', 'The Chairman account cannot be changed here.');
        }

        $validated = $request->validate([
            'role' => ['required', Rule::in([User::ROLE_VIEWER, User::ROLE_ADMIN])],
            'department_id' => ['nullable', 'exists:departments,id'],
        ]);

        $user->update([
            'role' => $validated['role'],
            'department_id' => $validated['department_id'] ?? null,
            'is_executive' => true,
        ]);

        return redirect()->route('admin.users')->with('success', 'User role and department updated.');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot delete your own account.');
        }
        if ($user->isChairman()) {
            return redirect()->route('admin.users')->with('error', 'The Chairman account cannot be deleted.');
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
