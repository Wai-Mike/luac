<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreElectionRequest;
use App\Http\Requests\Api\UpdateElectionRequest;
use App\Http\Resources\ElectionPositionResource;
use App\Http\Resources\ElectionResource;
use App\Models\Election;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ElectionController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        return ElectionResource::collection(
            Election::query()
                ->withCount('positions')
                ->latest()
                ->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreElectionRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        $election = Election::query()->create($data);

        return (new ElectionResource($election->loadCount('positions')))->response()->setStatusCode(201);
    }

    public function show(Request $request, Election $election): ElectionResource
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        return new ElectionResource($election->loadCount('positions'));
    }

    public function update(UpdateElectionRequest $request, Election $election): ElectionResource
    {
        $election->update($request->validated());

        return new ElectionResource($election->fresh()->loadCount('positions'));
    }

    public function destroy(Request $request, Election $election): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('update_elections'), 403);
        $election->delete();

        return response()->json(['message' => 'Election deleted.']);
    }

    public function results(Request $request, Election $election): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('view_elections'), 403);

        if ($election->status === 'draft') {
            return response()->json(['message' => 'Results are not available for this election.'], 404);
        }

        $positions = $election->positions()
            ->orderBy('sort_order')
            ->get()
            ->map(function ($position) {
                $candidates = $position->candidates()
                    ->where('status', 'approved')
                    ->with(['member'])
                    ->withCount('votes')
                    ->orderByDesc('votes_count')
                    ->get();

                return [
                    'position' => new ElectionPositionResource($position),
                    'candidates' => $candidates->map(fn ($c) => [
                        'id' => $c->id,
                        'member_id' => $c->member_id,
                        'member_name' => $c->member?->full_name,
                        'votes' => $c->votes_count,
                    ]),
                ];
            });

        return response()->json(['election' => new ElectionResource($election), 'results' => $positions]);
    }

    public function close(Request $request, Election $election): JsonResponse
    {
        abort_unless(
            $request->user()?->hasPermission('update_elections') || $request->user()?->hasPermission('manage_votes'),
            403
        );

        if ($election->status !== 'open') {
            return response()->json(['message' => 'Only an open election can be closed.'], 422);
        }

        $election->update(['status' => 'closed']);

        return response()->json(['message' => 'Election closed.', 'election' => new ElectionResource($election->fresh())]);
    }

    public function publishResults(Request $request, Election $election): JsonResponse
    {
        abort_unless(
            $request->user()?->hasPermission('update_elections') || $request->user()?->hasPermission('manage_votes'),
            403
        );

        if ($election->status !== 'closed') {
            return response()->json(['message' => 'Election must be closed before publishing results.'], 422);
        }

        $election->update(['status' => 'published']);

        return response()->json([
            'message' => 'Results published.',
            'election' => new ElectionResource($election->fresh()),
        ]);
    }
}
