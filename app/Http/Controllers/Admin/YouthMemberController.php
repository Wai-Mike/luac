<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\YouthMemberRequest;
use App\Models\YouthMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class YouthMemberController extends Controller
{
    /**
     * Display a listing of the resource with basic census analytics.
     */
    public function index(Request $request)
    {
        $query = YouthMember::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $members = $query->latest()->paginate(20)->withQueryString();

        // Aggregate data for charts
        $byGender = YouthMember::select('gender', DB::raw('count(*) as total'))
            ->groupBy('gender')
            ->get();

        $byCounty = YouthMember::select('county', DB::raw('count(*) as total'))
            ->groupBy('county')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        $byEducation = YouthMember::select('education_level', DB::raw('count(*) as total'))
            ->groupBy('education_level')
            ->orderByDesc('total')
            ->get();

        return Inertia::render('admin/youth-census/index', [
            'members' => $members,
            'filters' => [
                'search' => $search,
            ],
            'charts' => [
                'byGender' => $byGender,
                'byCounty' => $byCounty,
                'byEducation' => $byEducation,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/youth-census/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(YouthMemberRequest $request)
    {
        YouthMember::create($this->prepareData($request));

        return redirect()->route('admin.youth-members.index')
            ->with('success', 'Youth member added to census successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(YouthMember $youthMember)
    {
        return Inertia::render('admin/youth-census/show', [
            'member' => $youthMember,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(YouthMember $youthMember)
    {
        return Inertia::render('admin/youth-census/edit', [
            'member' => $youthMember,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(YouthMemberRequest $request, YouthMember $youthMember)
    {
        $youthMember->update($this->prepareData($request));

        return redirect()->route('admin.youth-members.index')
            ->with('success', 'Youth member updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(YouthMember $youthMember)
    {
        $youthMember->delete();

        return redirect()->route('admin.youth-members.index')
            ->with('success', 'Youth member removed from census.');
    }

    /**
     * Normalize incoming data for casting JSON fields.
     */
    protected function prepareData(YouthMemberRequest $request): array
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

