<?php

namespace App\Providers;

use App\Models\AssociationExpense;
use App\Models\ContactMessage;
use App\Models\Department;
use App\Models\Donation;
use App\Models\YouthMember;
use App\Observers\AssociationExpenseObserver;
use App\Observers\ContactMessageObserver;
use App\Observers\DepartmentObserver;
use App\Observers\DonationObserver;
use App\Observers\YouthMemberObserver;
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
        YouthMember::observe(YouthMemberObserver::class);
        ContactMessage::observe(ContactMessageObserver::class);
        AssociationExpense::observe(AssociationExpenseObserver::class);
    }
}
