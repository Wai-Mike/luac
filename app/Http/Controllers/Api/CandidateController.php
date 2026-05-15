<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCandidateRequest;
use App\Http\Requests\Api\UpdateCandidateRequest;
use App\Http\Resources\CandidateResource;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\ElectionPosition;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CandidateController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        $query = Candidate::query()->with(['member', 'position'])->latest();

        if ($request->filled('election_id')) {
            $query->where('election_id', $request->integer('election_id'));
        }
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return CandidateResource::collection(
            $query->paginate($request->integer('per_page', 20))
        );
    }

    public function store(StoreCandidateRequest $request): JsonResponse
    {
        $data = $request->validated();
        $election = Election::query()->findOrFail($data['election_id']);
        $position = ElectionPosition::query()->findOrFail($data['election_position_id']);

        if ((int) $position->election_id !== (int) $election->id) {
            return response()->json(['message' => 'Position does not belong to this election.'], 422);
        }

        $data['status'] = 'pending';
        $candidate = Candidate::query()->create($data);

        return (new CandidateResource($candidate->load('member')))->response()->setStatusCode(201);
    }

    public function show(Request $request, Candidate $candidate): CandidateResource
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        return new CandidateResource($candidate->load('member'));
    }

    public function update(UpdateCandidateRequest $request, Candidate $candidate): CandidateResource
    {
        $candidate->update($request->validated());

        return new CandidateResource($candidate->fresh()->load('member'));
    }

    public function destroy(Request $request, Candidate $candidate): JsonResponse
    {
        abort_unless(
            $request->user()?->hasPermission('manage_votes') || $request->user()?->hasPermission('update_elections'),
            403
        );
        $candidate->delete();

        return response()->json(['message' => 'Candidate removed.']);
    }
}
