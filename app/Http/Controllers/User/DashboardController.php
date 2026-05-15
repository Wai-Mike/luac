<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('user/dashboard/index', [
            'user' => $user,
            'stats' => [
                'welcome_message' => "Welcome back, {$user->name}!",
            ],
        ]);
    }

    public function profile()
    {
        $user = Auth::user();
        if (Schema::hasTable('profiles')) {
            $user->load('profile');
        }

        return Inertia::render('user/profile/index', [
            'user' => $user,
            'profile' => Schema::hasTable('profiles') ? $user->profile : null,
        ]);
    }

    public function profileSetup()
    {
        $user = Auth::user();
        if (Schema::hasTable('profiles')) {
            $user->load('profile');
        }

        if (Schema::hasTable('profiles') && $user->profile) {
            return redirect()->route('user.profile');
        }

        return Inertia::render('user/profile/setup', [
            'user' => $user,
        ]);
    }

    public function profileSetupStore(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'gender' => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date|before:today',
            'phone' => 'nullable|string|max:50',
            'bio' => 'nullable|string|max:2000',
        ]);

        Profile::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($validated, [
                'preferences' => [
                    'notifications' => true,
                    'privacy_level' => 'normal',
                ],
            ])
        );

        return redirect()->route('user.dashboard')->with('success', 'Profile saved successfully!');
    }
}
