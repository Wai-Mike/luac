<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCensusRecordRequest;
use App\Http\Requests\Api\UpdateCensusRecordRequest;
use App\Http\Resources\CensusRecordResource;
use App\Models\CensusRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CensusRecordController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_census'), 403);

        $filters = $request->only(['search', 'county', 'gender', 'needs_support']);

        $query = CensusRecord::query()->filter($filters)->latest();

        if ($request->filled('census_survey_id')) {
            $query->where('census_survey_id', $request->integer('census_survey_id'));
        }

        return CensusRecordResource::collection(
            $query->paginate($request->integer('per_page', 20))
        );
    }

    public function store(StoreCensusRecordRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['collected_by'] = $request->user()->id;

        $record = CensusRecord::query()->create($data);

        return (new CensusRecordResource($record))->response()->setStatusCode(201);
    }

    public function show(Request $request, CensusRecord $censusRecord): CensusRecordResource
    {
        abort_unless($request->user()?->hasPermission('view_census'), 403);

        return new CensusRecordResource($censusRecord);
    }

    public function update(UpdateCensusRecordRequest $request, CensusRecord $censusRecord): CensusRecordResource
    {
        $censusRecord->update($request->validated());

        return new CensusRecordResource($censusRecord->fresh());
    }

    public function destroy(Request $request, CensusRecord $censusRecord): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_census'), 403);
        $censusRecord->delete();

        return response()->json(['message' => 'Record deleted.']);
    }
}
