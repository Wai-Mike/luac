<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\YouthMemberController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$host = parse_url((string) config('app.url'), PHP_URL_HOST);
$adminDomain = $host ? 'admin.'.$host : null;

$registerAdminRoutes = function () {
    Route::get('/login', function () {
        return Inertia::render('admin/auth/login');
    })->name('admin.login');

    Route::post('/login', function (Illuminate\Http\Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            if (Auth::user()->role === 'admin') {
                return redirect()->intended(route('admin.dashboard'));
            }

            Auth::logout();

            return back()->withErrors([
                'email' => 'You do not have admin privileges.',
            ]);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    })->name('admin.login.submit');

    Route::post('/logout', function (Illuminate\Http\Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    })->name('admin.logout');

    Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
        Route::get('/analytics', [AdminDashboardController::class, 'analytics'])->name('admin.analytics');

        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
        Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole'])->name('admin.users.role');
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');

        Route::resource('youth-members', YouthMemberController::class)
            ->names('admin.youth-members');

        Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
        Route::put('/settings/update', [AdminController::class, 'updateSettings'])->name('admin.settings.update');
    });

    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });
};

if ($adminDomain) {
    Route::domain($adminDomain)->group($registerAdminRoutes);
}
