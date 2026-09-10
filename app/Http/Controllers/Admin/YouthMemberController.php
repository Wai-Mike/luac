<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\YouthMemberRequest;
use App\Models\YouthMember;
use App\Support\ExcelWorkbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class YouthMemberController extends Controller
{
    /**
     * Display a listing of the resource with basic census analytics.
     */
    public function index(Request $request)
    {
        $query = YouthMember::query()->census();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('profession', 'like', "%{$search}%");
            });
        }

        $members = $query->latest()->paginate(20)->withQueryString();

        $byGender = YouthMember::query()->census()->select('gender', DB::raw('count(*) as total'))
            ->groupBy('gender')
            ->get();

        $byCounty = YouthMember::query()->census()->select('county', DB::raw('count(*) as total'))
            ->groupBy('county')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        $byEducation = YouthMember::query()->census()->select('education_level', DB::raw('count(*) as total'))
            ->groupBy('education_level')
            ->orderByDesc('total')
            ->get();

        $byProfession = YouthMember::query()
            ->census()
            ->selectRaw("COALESCE(NULLIF(profession, ''), 'Unspecified') as name, count(*) as total")
            ->groupBy('name')
            ->orderByDesc('total')
            ->limit(12)
            ->get();

        $byPayam = YouthMember::query()
            ->census()
            ->selectRaw("COALESCE(NULLIF(payam, ''), NULLIF(county, ''), 'Unspecified') as name, count(*) as total")
            ->groupBy('name')
            ->orderByDesc('total')
            ->limit(7)
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
                'byProfession' => $byProfession,
                'byPayam' => $byPayam,
            ],
        ]);
    }

    public function export(): StreamedResponse
    {
        $members = YouthMember::query()->census()->latest()->get();

        $rows = $members->map(function (YouthMember $member) {
            $interests = is_array($member->interests) ? implode(', ', $member->interests) : '';

            return [
                $member->first_name,
                $member->last_name,
                $member->gender,
                $member->age,
                optional($member->date_of_birth)->format('Y-m-d'),
                $member->phone,
                $member->email,
                $member->county,
                $member->payam,
                $member->boma,
                $member->education_level,
                $member->current_school,
                $member->employment_status,
                $member->profession,
                $interests,
                $member->heard_about_layya,
                optional($member->created_at)->format('Y-m-d'),
            ];
        })->all();

        $xml = ExcelWorkbook::spreadsheetMl('Youth census', [
            'First name',
            'Last name',
            'Gender',
            'Age',
            'Date of birth',
            'Phone',
            'Email',
            'County',
            'Payam',
            'Boma',
            'Education',
            'School',
            'Employment',
            'Profession',
            'Interests',
            'Heard about LAYYA',
            'Registered',
        ], $rows);

        $filename = 'layya-youth-census-'.now()->format('Y-m-d').'.xls';

        return response()->streamDownload(function () use ($xml) {
            echo $xml;
        }, $filename, [
            'Content-Type' => 'application/vnd.ms-excel; charset=UTF-8',
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/youth-census/create');
    }

    public function store(YouthMemberRequest $request)
    {
        YouthMember::create([
            ...$this->prepareData($request),
            'source' => 'census',
        ]);

        return redirect()->route('admin.youth-members.index')
            ->with('success', 'Youth member added to census successfully.');
    }

    public function show(YouthMember $youthMember)
    {
        return Inertia::render('admin/youth-census/show', [
            'member' => $youthMember,
        ]);
    }

    public function edit(YouthMember $youthMember)
    {
        return Inertia::render('admin/youth-census/edit', [
            'member' => $youthMember,
        ]);
    }

    public function update(YouthMemberRequest $request, YouthMember $youthMember)
    {
        $youthMember->update($this->prepareData($request));

        return redirect()->route('admin.youth-members.index')
            ->with('success', 'Youth member updated successfully.');
    }

    public function destroy(YouthMember $youthMember)
    {
        $youthMember->delete();

        return redirect()->route('admin.youth-members.index')
            ->with('success', 'Youth member removed from census.');
    }

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
