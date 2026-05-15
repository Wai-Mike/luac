<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCensusSurveyRequest;
use App\Http\Requests\Api\UpdateCensusSurveyRequest;
use App\Http\Resources\CensusSurveyResource;
use App\Models\CensusRecord;
use App\Models\CensusSurvey;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class CensusSurveyController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_census'), 403);

        return CensusSurveyResource::collection(
            CensusSurvey::query()
                ->withCount('records')
                ->latest('year')
                ->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreCensusSurveyRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        $survey = CensusSurvey::query()->create($data);

        return (new CensusSurveyResource($survey->loadCount('records')))->response()->setStatusCode(201);
    }

    public function show(Request $request, CensusSurvey $censusSurvey): CensusSurveyResource
    {
        abort_unless($request->user()?->hasPermission('view_census'), 403);

        return new CensusSurveyResource($censusSurvey->loadCount('records'));
    }

    public function update(UpdateCensusSurveyRequest $request, CensusSurvey $censusSurvey): CensusSurveyResource
    {
        $censusSurvey->update($request->validated());

        return new CensusSurveyResource($censusSurvey->fresh()->loadCount('records'));
    }

    public function destroy(Request $request, CensusSurvey $censusSurvey): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_census'), 403);
        $censusSurvey->delete();

        return response()->json(['message' => 'Survey deleted.']);
    }

    public function summary(Request $request, CensusSurvey $censusSurvey): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('view_census'), 403);

        $totals = CensusRecord::query()
            ->where('census_survey_id', $censusSurvey->id)
            ->selectRaw('
                count(*) as households,
                coalesce(sum(household_size), 0) as population_total,
                coalesce(sum(youth_count), 0) as youth_total,
                coalesce(sum(male_count), 0) as male_total,
                coalesce(sum(female_count), 0) as female_total,
                coalesce(sum(case when needs_support = 1 then 1 else 0 end), 0) as households_needing_support
            ')
            ->first();

        $byCounty = CensusRecord::query()
            ->where('census_survey_id', $censusSurvey->id)
            ->whereNotNull('county')
            ->select('county', DB::raw('count(*) as households'))
            ->groupBy('county')
            ->orderByDesc('households')
            ->get();

        return response()->json([
            'survey' => new CensusSurveyResource($censusSurvey),
            'totals' => $totals,
            'by_county' => $byCounty,
        ]);
    }
}
