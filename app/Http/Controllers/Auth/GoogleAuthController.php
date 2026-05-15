<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google OAuth
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google OAuth callback
     */
    public function handleGoogleCallback(Request $request)
    {
        try {
            Log::info('Google OAuth callback started', [
                'request_url' => $request->fullUrl(),
                'session_id' => session()->getId(),
            ]);

            $googleUser = Socialite::driver('google')->user();

            Log::info('Google user data received', [
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName(),
                'id' => $googleUser->getId(),
            ]);

            $wasRecentlyCreated = false;
            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName() ?: ($googleUser->user['given_name'] ?? 'Google User'),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'email_verified_at' => now(), // Google emails are pre-verified
                    'role' => 'member',
                ]
            );

            // Check if this was a newly created user
            if ($user->wasRecentlyCreated) {
                $wasRecentlyCreated = true;
            }

            Log::info('User created/updated', [
                'user_id' => $user->id,
                'user_role' => $user->role,
                'user_email' => $user->email,
                'was_recently_created' => $wasRecentlyCreated,
            ]);

            Auth::login($user, true); // Remember the user
            if (Schema::hasTable('profiles')) {
                $user->load('profile');
            }

            Log::info('User logged in', [
                'authenticated' => Auth::check(),
                'auth_user_id' => Auth::id(),
                'session_data' => session()->all(),
            ]);

            if (Schema::hasTable('profiles') && ! $user->profile) {
                Log::info('Redirecting to profile setup', ['user_id' => $user->id]);

                return redirect()->intended(route('user.profile.setup'));
            }

            Log::info('Redirecting user to dashboard dispatcher', [
                'user_role' => $user->role,
                'can_access_admin' => $user->canAccessAdminPanel(),
            ]);

            return redirect()->intended(route('dashboard'));
        } catch (\Throwable $e) {
            Log::warning('Google OAuth callback failed', [
                'message' => $e->getMessage(),
                'error' => $e->getTraceAsString(),
            ]);

            return redirect()->route('login')->with('error', 'Google authentication failed. Please try again.');
        }
    }

    /**
     * Link Google account to authenticated user
     */
    public function linkGoogleAccount(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login')->with('error', 'Please log in first.');
        }

        try {
            $googleUser = Socialite::driver('google')->user();

            // Check if Google account is already linked to another user
            if (User::where('google_id', $googleUser->getId())->where('id', '!=', $user->id)->exists()) {
                return redirect()->back()->with('error', 'This Google account is already linked to another user.');
            }

            $user->update([
                'google_id' => $googleUser->getId(),
                'avatar' => $user->avatar ?: $googleUser->getAvatar(),
            ]);

            return redirect()->back()->with('success', 'Google account linked successfully!');
        } catch (\Throwable $e) {
            Log::warning('Google account linking failed', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()->with('error', 'Failed to link Google account. Please try again.');
        }
    }

    /**
     * Unlink Google account from authenticated user
     */
    public function unlinkGoogleAccount(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login')->with('error', 'Please log in first.');
        }

        $user->update(['google_id' => null]);

        return redirect()->back()->with('success', 'Google account unlinked successfully!');
    }
}
