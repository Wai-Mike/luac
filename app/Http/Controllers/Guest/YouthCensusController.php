<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\YouthCensusRequest;
use App\Models\YouthMember;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class YouthCensusController extends Controller
{
    /**
     * Show the multi-step youth census registration form.
     */
    public function create()
    {
        return Inertia::render('guest/youth-census/register');
    }

    /**
     * Store a newly registered youth member.
     */
    public function store(YouthCensusRequest $request)
    {
        YouthMember::create($this->prepareData($request));

        return redirect()->route('youth-census.thank-you');
    }

    /**
     * Simple thank you page after submission.
     */
    public function thankYou()
    {
        return Inertia::render('guest/youth-census/thank-you');
    }

    /**
     * Optional public overview of aggregated census data.
     */
    public function overview()
    {
        $total = YouthMember::count();

        $byGender = YouthMember::select('gender', DB::raw('count(*) as total'))
            ->groupBy('gender')
            ->get();

        $byCounty = YouthMember::select('county', DB::raw('count(*) as total'))
            ->groupBy('county')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        return Inertia::render('guest/youth-census/overview', [
            'total' => $total,
            'byGender' => $byGender,
            'byCounty' => $byCounty,
        ]);
    }

    protected function prepareData(YouthCensusRequest $request): array
    {
        $data = $request->validated();

        if (isset($data['skills']) && is_string($data['skills'])) {
            $data['skills'] = array_filter(array_map('trim', explode(',', $data['skills'])));
        }

        if (isset($data['interests']) && is_string($data['interests'])) {
            $data['interests'] = array_filter(array_map('trim', explode(',', $data['interests'])));
        }

        return $data;
    }
}

