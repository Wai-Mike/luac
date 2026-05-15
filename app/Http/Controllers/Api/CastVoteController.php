<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CastVoteRequest;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\Vote;
use App\Models\Voter;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;

class CastVoteController extends Controller
{
    public function __invoke(CastVoteRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = $request->user();
        $member = $user?->member;

        if (! $member) {
            return response()->json(['message' => 'No member profile is linked to your account.'], 403);
        }

        $election = Election::query()->findOrFail($data['election_id']);

        if ($election->status !== 'open') {
            return response()->json(['message' => 'Voting is not open for this election.'], 422);
        }

        $voter = Voter::query()
            ->where('election_id', $election->id)
            ->where('member_id', $member->id)
            ->first();

        if (! $voter || ! $voter->is_verified) {
            return response()->json(['message' => 'You are not a verified voter for this election.'], 403);
        }

        if ($voter->has_voted) {
            return response()->json(['message' => 'You have already completed your ballot.'], 422);
        }

        $candidate = Candidate::query()
            ->where('id', $data['candidate_id'])
            ->where('election_id', $election->id)
            ->where('election_position_id', $data['election_position_id'])
            ->where('status', 'approved')
            ->first();

        if (! $candidate) {
            return response()->json(['message' => 'Invalid or unapproved candidate for this position.'], 422);
        }

        try {
            Vote::query()->create([
                'election_id' => $election->id,
                'election_position_id' => $data['election_position_id'],
                'candidate_id' => $candidate->id,
                'voter_id' => $voter->id,
            ]);
        } catch (QueryException) {
            return response()->json(['message' => 'You have already voted for this position.'], 422);
        }

        $positionsCount = $election->positions()->count();
        $votesCount = Vote::query()->where('voter_id', $voter->id)->count();

        if ($positionsCount > 0 && $votesCount >= $positionsCount) {
            $voter->update(['has_voted' => true, 'voted_at' => now()]);
        }

        return response()->json(['message' => 'Vote recorded.']);
    }
}
