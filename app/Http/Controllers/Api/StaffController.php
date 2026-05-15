<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreStaffRequest;
use App\Http\Requests\Api\UpdateStaffRequest;
use App\Http\Resources\StaffResource;
use App\Models\Staff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StaffController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_staff'), 403);

        return StaffResource::collection(
            Staff::query()->orderBy('sort_order')->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreStaffRequest $request): JsonResponse
    {
        $staff = Staff::query()->create($request->validated());

        return (new StaffResource($staff))->response()->setStatusCode(201);
    }

    public function show(Request $request, Staff $staff): StaffResource
    {
        abort_unless($request->user()?->hasPermission('view_staff'), 403);

        return new StaffResource($staff);
    }

    public function update(UpdateStaffRequest $request, Staff $staff): StaffResource
    {
        $staff->update($request->validated());

        return new StaffResource($staff->fresh());
    }

    public function destroy(Request $request, Staff $staff): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_staff'), 403);
        $staff->delete();

        return response()->json(['message' => 'Staff record deleted.']);
    }
}
