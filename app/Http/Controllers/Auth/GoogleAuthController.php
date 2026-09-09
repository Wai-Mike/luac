<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

            $user = User::query()->where('email', $googleUser->getEmail())->first();

            if (! $user || ! $user->isExecutive() || $user->status !== 'active') {
                return redirect()->route('login')->with('error', 'Only LAYYA executive members can sign in.');
            }

            $user->update([
                'google_id' => $googleUser->getId(),
                'avatar' => $user->avatar ?: $googleUser->getAvatar(),
                'last_login_at' => now(),
            ]);

            Auth::login($user, true);

            Log::info('Executive logged in via Google', [
                'authenticated' => Auth::check(),
                'auth_user_id' => Auth::id(),
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
