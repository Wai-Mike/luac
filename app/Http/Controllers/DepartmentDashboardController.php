<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DepartmentDashboardController extends Controller
{
    public function executiveOffice(): Response
    {
        return Inertia::render('DepartmentDashboards/ExecutiveOfficeDashboard', [
            'user' => auth()->user(),
        ]);
    }

    public function financeAdministration(): Response
    {
        return Inertia::render('DepartmentDashboards/FinanceAdministrationDashboard', [
            'user' => auth()->user(),
        ]);
    }

    public function ictInformation(): Response
    {
        return Inertia::render('DepartmentDashboards/ICTInformationDashboard', [
            'user' => auth()->user(),
        ]);
    }

    public function programsWelfare(): Response
    {
        return Inertia::render('DepartmentDashboards/ProgramsWelfareDashboard', [
            'user' => auth()->user(),
        ]);
    }

    public function externalLegalAffairs(): Response
    {
        return Inertia::render('DepartmentDashboards/ExternalLegalAffairsDashboard', [
            'user' => auth()->user(),
        ]);
    }
}
