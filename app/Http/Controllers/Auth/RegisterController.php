<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Notifications\VerificationWelcomeNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    /**
     * Display the registration view.
     */
    public function showRegistrationForm(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Display the login view.
     */
    public function showLoginForm(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('auth.password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'role' => 'member',
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Fire the Registered event (this will trigger the welcome email listener)
        event(new Registered($user));

        // Send custom verification email
        $user->notify(new VerificationWelcomeNotification);

        // Auto-login the user after registration
        Auth::login($user);

        // Check if user has a profile, if not redirect to profile setup
        if (Schema::hasTable('profiles')) {
            $user->load('profile');
        }
        if (Schema::hasTable('profiles') && ! isset($user->profile)) {
            return redirect()->route('user.profile.setup')->with('info', 'Please complete your profile to get started.');
        }

        return redirect()
            ->intended(route('dashboard'))
            ->with('success', 'Registration successful! Welcome.');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function login(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        // Try to load profile if table exists, otherwise skip
        if (Schema::hasTable('profiles')) {
            $user->load('profile');
        }

        // If email is not verified, redirect to verification page
        if (! $user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        // If user doesn't have a profile, redirect to profile setup
        if (Schema::hasTable('profiles') && ! isset($user->profile)) {
            return redirect()->route('user.profile.setup')->with('info', 'Please complete your profile to continue.');
        }

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
