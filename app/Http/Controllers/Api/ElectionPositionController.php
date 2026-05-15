<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreElectionPositionRequest;
use App\Http\Requests\Api\UpdateElectionPositionRequest;
use App\Http\Resources\ElectionPositionResource;
use App\Models\Election;
use App\Models\ElectionPosition;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ElectionPositionController extends Controller
{
    public function index(Request $request, Election $election): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        return ElectionPositionResource::collection(
            $election->positions()->orderBy('sort_order')->paginate($request->integer('per_page', 50))
        );
    }

    public function store(StoreElectionPositionRequest $request, Election $election): JsonResponse
    {
        $position = $election->positions()->create($request->validated());

        return (new ElectionPositionResource($position))->response()->setStatusCode(201);
    }

    public function show(Request $request, Election $election, ElectionPosition $position): ElectionPositionResource
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);
        abort_if($position->election_id !== $election->id, 404);

        return new ElectionPositionResource($position);
    }

    public function update(
        UpdateElectionPositionRequest $request,
        Election $election,
        ElectionPosition $position
    ): ElectionPositionResource {
        abort_if($position->election_id !== $election->id, 404);
        $position->update($request->validated());

        return new ElectionPositionResource($position->fresh());
    }

    public function destroy(Request $request, Election $election, ElectionPosition $position): JsonResponse
    {
        abort_unless(
            $request->user()?->hasPermission('update_elections') || $request->user()?->hasPermission('manage_votes'),
            403
        );
        abort_if($position->election_id !== $election->id, 404);
        $position->delete();

        return response()->json(['message' => 'Position deleted.']);
    }
}
