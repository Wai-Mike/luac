<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\GeneratesUniqueSlug;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreFundraisingCampaignRequest;
use App\Http\Requests\Api\UpdateFundraisingCampaignRequest;
use App\Http\Resources\FundraisingCampaignResource;
use App\Models\FundraisingCampaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FundraisingCampaignController extends Controller
{
    use GeneratesUniqueSlug;

    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_fundraising'), 403);

        return FundraisingCampaignResource::collection(
            FundraisingCampaign::query()->latest()->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreFundraisingCampaignRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->uniqueSlug('fundraising_campaigns', 'slug', $data['title']);
        $data['created_by'] = $request->user()->id;

        $campaign = FundraisingCampaign::query()->create($data);

        return (new FundraisingCampaignResource($campaign))->response()->setStatusCode(201);
    }

    public function show(Request $request, FundraisingCampaign $fundraisingCampaign): FundraisingCampaignResource
    {
        abort_unless($request->user()?->hasPermission('view_fundraising'), 403);

        return new FundraisingCampaignResource($fundraisingCampaign);
    }

    public function update(UpdateFundraisingCampaignRequest $request, FundraisingCampaign $fundraisingCampaign): FundraisingCampaignResource
    {
        $data = $request->validated();
        if (isset($data['title']) && $data['title'] !== $fundraisingCampaign->title) {
            $data['slug'] = $this->uniqueSlug('fundraising_campaigns', 'slug', $data['title'], $fundraisingCampaign->id);
        }
        $fundraisingCampaign->update($data);

        return new FundraisingCampaignResource($fundraisingCampaign->fresh());
    }

    public function destroy(Request $request, FundraisingCampaign $fundraisingCampaign): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_fundraising'), 403);
        $fundraisingCampaign->delete();

        return response()->json(['message' => 'Campaign deleted.']);
    }
}
