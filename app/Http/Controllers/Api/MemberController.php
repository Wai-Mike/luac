<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreMemberRequest;
use App\Http\Requests\Api\UpdateMemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MemberController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_members'), 403);

        $filters = $request->only(['search', 'gender', 'status', 'county', 'membership_type']);

        $members = Member::query()
            ->filter($filters)
            ->latest()
            ->paginate($request->integer('per_page', 15));

        return MemberResource::collection($members);
    }

    public function store(StoreMemberRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['member_no'] = $this->nextMemberNo();

        $member = Member::query()->create($data);

        return (new MemberResource($member))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Request $request, Member $member): MemberResource
    {
        abort_unless($request->user()?->hasPermission('view_members'), 403);

        return new MemberResource($member);
    }

    public function update(UpdateMemberRequest $request, Member $member): MemberResource
    {
        $member->update($request->validated());

        return new MemberResource($member->fresh());
    }

    public function destroy(Request $request, Member $member): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_members'), 403);

        $member->delete();

        return response()->json(['message' => 'Member deleted.']);
    }

    protected function nextMemberNo(): string
    {
        $n = (int) Member::query()->max('id') + 1;

        return 'LAYYA-'.str_pad((string) $n, 6, '0', STR_PAD_LEFT);
    }
}
