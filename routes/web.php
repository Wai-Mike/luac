<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\DashboardController as AdminAnalyticsController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\YouthMemberController;
use App\Http\Controllers\DepartmentDashboardController;
use App\Http\Controllers\Guest\PageController;
use App\Http\Controllers\Guest\YouthCensusController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use Illuminate\Support\Facades\Route;

Route::permanentRedirect('/services', '/programs');

Route::controller(PageController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/about', 'about')->name('about');
    Route::get('/programs', 'programs')->name('programs');
    Route::get('/fundraising', 'fundraising')->name('fundraising');
    Route::get('/gallery', 'gallery')->name('gallery');
    Route::get('/impact', 'impact')->name('impact');
    Route::get('/news', 'news')->name('news');
    Route::get('/get-involved', 'getInvolved')->name('get-involved');
    Route::get('/contact', 'contact')->name('contact');
    Route::get('/faq', 'faq')->name('faq');
    Route::get('/team', 'team')->name('team');
    Route::get('/reports', 'reports')->name('reports');
    Route::get('/tawus-hub', 'tawusHub')->name('tawus-hub');
});

Route::redirect('/tawus', '/tawus-hub');

Route::prefix('youth-census')->name('youth-census.')->group(function () {
    Route::get('/register', [YouthCensusController::class, 'create'])->name('register');
    Route::post('/', [YouthCensusController::class, 'store'])->name('store');
    Route::get('/thank-you', [YouthCensusController::class, 'thankYou'])->name('thank-you');
    Route::get('/overview', [YouthCensusController::class, 'overview'])->name('overview');
});

Route::middleware(['auth', 'verified', 'role:member,management'])
    ->prefix('user')
    ->group(function () {
        Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
        Route::get('/profile', [UserDashboardController::class, 'profile'])->name('user.profile');
        Route::get('/profile/setup', [UserDashboardController::class, 'profileSetup'])->name('user.profile.setup');
        Route::post('/profile/setup', [UserDashboardController::class, 'profileSetupStore'])->name('user.profile.setup.store');
    });

Route::middleware(['auth', 'verified', 'admin.access'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/analytics', [AdminAnalyticsController::class, 'analytics'])->name('analytics.index');

        Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
        Route::post('/settings', [AdminController::class, 'updateSettings'])->name('settings.update');

        Route::get('/users', [AdminController::class, 'users'])->name('users');
        Route::get('/users/{user}', [AdminUserController::class, 'show'])->name('users.show');
        Route::patch('/users/{id}', [AdminController::class, 'updateUserRole'])->whereNumber('id')->name('users.role');
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->whereNumber('id')->name('users.destroy');

        Route::resource('youth-members', YouthMemberController::class);

        Route::get('/content/comments', [ContentController::class, 'comments'])->name('content.comments');
        Route::post('/content/comments/{comment}/approve', [ContentController::class, 'approveComment'])->name('content.comments.approve');
        Route::post('/content/comments/{comment}/reject', [ContentController::class, 'rejectComment'])->name('content.comments.reject');
        Route::delete('/content/comments/{comment}', [ContentController::class, 'deleteComment'])->name('content.comments.destroy');

        Route::middleware('permission:manage_departments')->group(function () {
            Route::patch('/departments/{department}/toggle-status', [DepartmentController::class, 'toggleStatus'])
                ->name('departments.toggle-status');
            Route::resource('departments', DepartmentController::class);
        });
    });

Route::middleware(['auth', 'verified', 'admin.access'])
    ->prefix('departments')
    ->name('departments.')
    ->group(function () {
        Route::get('/executive-office/dashboard', [DepartmentDashboardController::class, 'executiveOffice'])->name('executive-office.dashboard');
        Route::get('/finance-administration/dashboard', [DepartmentDashboardController::class, 'financeAdministration'])->name('finance-administration.dashboard');
        Route::get('/ict-information/dashboard', [DepartmentDashboardController::class, 'ictInformation'])->name('ict-information.dashboard');
        Route::get('/programs-welfare/dashboard', [DepartmentDashboardController::class, 'programsWelfare'])->name('programs-welfare.dashboard');
        Route::get('/external-legal-affairs/dashboard', [DepartmentDashboardController::class, 'externalLegalAffairs'])->name('external-legal-affairs.dashboard');
    });

Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    $user = auth()->user();
    if ($user->canAccessAdminPanel()) {
        return app(AdminController::class)->dashboard();
    }
    if (in_array($user->role, ['member', 'management'], true)) {
        return app(UserDashboardController::class)->index();
    }

    return redirect()->route('home');
})->name('dashboard');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
