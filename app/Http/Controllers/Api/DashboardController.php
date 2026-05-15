<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\CensusRecord;
use App\Models\Donation;
use App\Models\Election;
use App\Models\Event;
use App\Models\FundraisingCampaign;
use App\Models\Member;
use App\Models\Program;
use App\Models\Staff;
use App\Models\YouthMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('view_reports'), 403);

        $memberGender = Member::query()
            ->select('gender', DB::raw('count(*) as total'))
            ->whereNotNull('gender')
            ->groupBy('gender')
            ->pluck('total', 'gender');

        $recentDonations = Donation::query()
            ->with('campaign:id,title,slug')
            ->latest('donated_at')
            ->limit(5)
            ->get()
            ->map(fn ($d) => [
                'id' => $d->id,
                'amount' => (string) $d->amount,
                'donor_name' => $d->donor_name,
                'donated_at' => $d->donated_at?->toIso8601String(),
                'campaign' => $d->campaign?->only(['id', 'title', 'slug']),
            ]);

        $recentMembers = Member::query()
            ->latest()
            ->limit(5)
            ->get(['id', 'member_no', 'full_name', 'status', 'created_at']);

        $upcomingEvents = Event::query()
            ->where('status', 'upcoming')
            ->orderByRaw('COALESCE(event_date, starts_at) ASC')
            ->limit(5)
            ->get();

        return response()->json([
            'totals' => [
                'members' => Member::query()->count(),
                'active_members' => Member::query()->where('status', 'active')->count(),
                'staff' => Staff::query()->where('status', 'active')->count(),
                'programs' => Program::query()->count(),
                'ongoing_programs' => Program::query()->where('status', 'ongoing')->count(),
                'fundraising_campaigns' => FundraisingCampaign::query()->count(),
                'donations_amount' => (string) Donation::query()->sum('amount'),
                'active_elections' => Election::query()->where('status', 'open')->count(),
                'census_households' => CensusRecord::query()->count(),
                'youth_reached' => YouthMember::query()->count(),
            ],
            'member_gender_breakdown' => $memberGender,
            'recent_donations' => $recentDonations,
            'recent_members' => $recentMembers,
            'upcoming_events' => EventResource::collection($upcomingEvents)->resolve(),
        ]);
    }
}
