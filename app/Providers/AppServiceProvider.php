<?php

namespace App\Providers;

use App\Models\Department;
use App\Models\Donation;
use App\Observers\DepartmentObserver;
use App\Observers\DonationObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Department::observe(DepartmentObserver::class);
        Donation::observe(DonationObserver::class);
    }
}
