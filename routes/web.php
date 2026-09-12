<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\DashboardController as AdminAnalyticsController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\YouthMemberController;
use App\Http\Controllers\Admin\YouthMembershipController;
use App\Http\Controllers\DepartmentDashboardController;
use App\Http\Controllers\Admin\ContactInboxController;
use App\Http\Controllers\Admin\DonationInboxController;
use App\Http\Controllers\Admin\FinanceController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\OperationsController;
use App\Http\Controllers\Admin\SiteContentController;
use App\Http\Controllers\Guest\ContactController;
use App\Http\Controllers\Guest\DonationController;
use App\Http\Controllers\Guest\PageController;
use App\Http\Controllers\Guest\YouthCensusController;
use App\Http\Controllers\ServePublicStorageController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/storage/{path}', ServePublicStorageController::class)
    ->where('path', '.*')
    ->name('storage.public');

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
    Route::get('/videos', 'videos')->name('videos');
    Route::get('/reports', 'reports')->name('reports');
    Route::get('/tawus-hub', 'tawusHub')->name('tawus-hub');
});

Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:10,1')->name('contact.store');

Route::get('/fundraising/thank-you', [DonationController::class, 'thankYou'])->name('fundraising.thank-you');
Route::post('/fundraising/donate', [DonationController::class, 'store'])->middleware('throttle:10,1')->name('fundraising.donate');

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
        Route::get('/programs', [AdminController::class, 'programs'])->name('programs.index');
        Route::get('/news', [AdminController::class, 'news'])->name('news.index');

        Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
        Route::post('/settings', [AdminController::class, 'updateSettings'])->middleware('content.edit')->name('settings.update');

        Route::get('/users', [AdminController::class, 'users'])->name('users');
        Route::get('/users/{user}', [AdminUserController::class, 'show'])->name('users.show');
        Route::middleware('chairman')->group(function () {
            Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
            Route::patch('/users/{id}', [AdminController::class, 'updateUserRole'])->whereNumber('id')->name('users.role');
            Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->whereNumber('id')->name('users.destroy');
        });

        Route::get('youth-members', [YouthMemberController::class, 'index'])->name('youth-members.index');
        Route::get('youth-members/export', [YouthMemberController::class, 'export'])->name('youth-members.export');
        Route::get('youth-members/create', [YouthMemberController::class, 'create'])->middleware('content.edit')->name('youth-members.create');
        Route::post('youth-members', [YouthMemberController::class, 'store'])->middleware('content.edit')->name('youth-members.store');
        Route::get('youth-members/{youth_member}', [YouthMemberController::class, 'show'])->name('youth-members.show');
        Route::get('youth-members/{youth_member}/edit', [YouthMemberController::class, 'edit'])->middleware('content.edit')->name('youth-members.edit');
        Route::put('youth-members/{youth_member}', [YouthMemberController::class, 'update'])->middleware('content.edit')->name('youth-members.update');
        Route::patch('youth-members/{youth_member}', [YouthMemberController::class, 'update'])->middleware('content.edit');
        Route::delete('youth-members/{youth_member}', [YouthMemberController::class, 'destroy'])->middleware('content.edit')->name('youth-members.destroy');

        Route::get('memberships', [YouthMembershipController::class, 'index'])->name('memberships.index');
        Route::post('memberships', [YouthMembershipController::class, 'store'])->name('memberships.store');
        Route::get('memberships/export', [YouthMembershipController::class, 'export'])->name('memberships.export');
        Route::put('memberships/{youth_member}', [YouthMembershipController::class, 'update'])->name('memberships.update');

        Route::post('notifications/read-all', [AdminNotificationController::class, 'markAllRead'])->name('notifications.read-all');
        Route::post('notifications/{notification}/read', [AdminNotificationController::class, 'markRead'])->name('notifications.read');

        Route::get('/content/site', [SiteContentController::class, 'edit'])->name('content.site.edit');
        Route::put('/content/site', [SiteContentController::class, 'update'])->middleware('content.edit')->name('content.site.update');
        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
        Route::post('/media', [MediaController::class, 'store'])->middleware('content.edit')->name('media.store');
        Route::put('/media/{site_media}', [MediaController::class, 'update'])->middleware('content.edit')->name('media.update');
        Route::delete('/media/{site_media}', [MediaController::class, 'destroy'])->middleware('content.edit')->name('media.destroy');
        Route::post('/media/{site_media}/approve', [MediaController::class, 'approve'])->middleware('content.edit')->name('media.approve');
        Route::post('/media/portrait', [MediaController::class, 'uploadPortrait'])->middleware('content.edit')->name('media.portrait');
        Route::get('/donations', [DonationInboxController::class, 'index'])->name('donations.index');
        Route::post('/donations', [DonationInboxController::class, 'store'])->name('donations.store');
        Route::put('/donations/campaigns', [DonationInboxController::class, 'updateCampaigns'])->middleware('content.edit')->name('donations.campaigns.update');
        Route::get('/donations/export', [DonationInboxController::class, 'export'])->name('donations.export');
        Route::get('/finances', [FinanceController::class, 'index'])->name('finances.index');
        Route::get('/finances/export', [FinanceController::class, 'export'])->name('finances.export');
        Route::post('/finances/expenses', [FinanceController::class, 'storeExpense'])->name('finances.expenses.store');
        Route::delete('/finances/expenses/{association_expense}', [FinanceController::class, 'destroyExpense'])->name('finances.expenses.destroy');
        Route::get('/contacts', [ContactInboxController::class, 'index'])->name('contacts.index');
        Route::patch('/contacts/{contactMessage}', [ContactInboxController::class, 'update'])->middleware('content.edit')->name('contacts.update');

        Route::get('/operations', [OperationsController::class, 'index'])->name('operations.index');
        Route::post('/operations/reports', [OperationsController::class, 'storeReport'])->name('operations.reports.store');
        Route::put('/operations/reports/{report}', [OperationsController::class, 'updateReport'])->name('operations.reports.update');
        Route::delete('/operations/reports/{report}', [OperationsController::class, 'destroyReport'])->name('operations.reports.destroy');
        Route::post('/operations/meetings', [OperationsController::class, 'storeMeeting'])->name('operations.meetings.store');
        Route::put('/operations/meetings/{meeting}', [OperationsController::class, 'updateMeeting'])->name('operations.meetings.update');
        Route::delete('/operations/meetings/{meeting}', [OperationsController::class, 'destroyMeeting'])->name('operations.meetings.destroy');
        Route::post('/operations/tasks', [OperationsController::class, 'storeTask'])->name('operations.tasks.store');
        Route::put('/operations/tasks/{task}', [OperationsController::class, 'updateTask'])->name('operations.tasks.update');
        Route::delete('/operations/tasks/{task}', [OperationsController::class, 'destroyTask'])->name('operations.tasks.destroy');

        Route::get('/content/comments', [ContentController::class, 'comments'])->name('content.comments');
        Route::post('/content/comments/{comment}/approve', [ContentController::class, 'approveComment'])->middleware('content.edit')->name('content.comments.approve');
        Route::post('/content/comments/{comment}/reject', [ContentController::class, 'rejectComment'])->middleware('content.edit')->name('content.comments.reject');
        Route::delete('/content/comments/{comment}', [ContentController::class, 'deleteComment'])->middleware('content.edit')->name('content.comments.destroy');

        Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
        Route::middleware('chairman')->group(function () {
            Route::get('/departments/create', [DepartmentController::class, 'create'])->name('departments.create');
            Route::post('/departments', [DepartmentController::class, 'store'])->name('departments.store');
        });
        Route::get('/departments/{department}', [DepartmentController::class, 'show'])->name('departments.show');
        Route::middleware('chairman')->group(function () {
            Route::get('/departments/{department}/edit', [DepartmentController::class, 'edit'])->name('departments.edit');
            Route::put('/departments/{department}', [DepartmentController::class, 'update'])->name('departments.update');
            Route::patch('/departments/{department}/toggle-status', [DepartmentController::class, 'toggleStatus'])
                ->name('departments.toggle-status');
            Route::delete('/departments/{department}', [DepartmentController::class, 'destroy'])->name('departments.destroy');
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

    return redirect()->route('home')->with('error', 'Only LAYYA executive members can access the backend.');
})->name('dashboard');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
