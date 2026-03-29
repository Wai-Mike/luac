<?php

use App\Http\Controllers\Guest\PageController;
use App\Http\Controllers\Guest\YouthCensusController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/team', [PageController::class, 'team'])->name('team');
Route::get('/reports', [PageController::class, 'reports'])->name('reports');

Route::get('/youth-census/register', [YouthCensusController::class, 'create'])->name('youth-census.register');
Route::post('/youth-census', [YouthCensusController::class, 'store'])->name('youth-census.store');
Route::get('/youth-census/thank-you', [YouthCensusController::class, 'thankYou'])->name('youth-census.thank-you');
Route::get('/youth-census/overview', [YouthCensusController::class, 'overview'])->name('youth-census.overview');

Route::middleware(['auth', 'verified', 'role:user'])->prefix('user')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
    Route::get('/profile', [UserDashboardController::class, 'profile'])->name('user.profile');
    Route::get('/profile/setup', [UserDashboardController::class, 'profileSetup'])->name('user.profile.setup');
    Route::post('/profile/setup', [UserDashboardController::class, 'profileSetupStore'])->name('user.profile.setup.store');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/analytics', [AdminDashboardController::class, 'analytics'])->name('admin.analytics');
});
