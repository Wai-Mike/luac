<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreVoterRequest;
use App\Http\Requests\Api\UpdateVoterRequest;
use App\Http\Resources\VoterResource;
use App\Models\Voter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VoterController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        $query = Voter::query()->with('member')->latest();

        if ($request->filled('election_id')) {
            $query->where('election_id', $request->integer('election_id'));
        }

        return VoterResource::collection(
            $query->paginate($request->integer('per_page', 20))
        );
    }

    public function store(StoreVoterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $voter = Voter::query()->create($data);

        return (new VoterResource($voter->load('member')))->response()->setStatusCode(201);
    }

    public function show(Request $request, Voter $voter): VoterResource
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        return new VoterResource($voter->load('member'));
    }

    public function update(UpdateVoterRequest $request, Voter $voter): VoterResource
    {
        $data = $request->validated();
        if (array_key_exists('is_verified', $data) && $data['is_verified'] && ! $voter->is_verified) {
            $data['verified_by'] = $request->user()->id;
        }
        $voter->update($data);

        return new VoterResource($voter->fresh()->load('member'));
    }

    public function destroy(Request $request, Voter $voter): JsonResponse
    {
        abort_unless(
            $request->user()?->hasPermission('manage_votes') || $request->user()?->hasPermission('update_elections'),
            403
        );
        $voter->delete();

        return response()->json(['message' => 'Voter record deleted.']);
    }
}
