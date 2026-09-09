<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Inertia\Inertia;

class DonationInboxController extends Controller
{
    public function index()
    {
        $donations = Donation::query()
            ->with('campaign:id,title')
            ->latest('donated_at')
            ->paginate(20);

        return Inertia::render('admin/donations/index', [
            'donations' => $donations,
        ]);
    }
}
