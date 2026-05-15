<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreDonationRequest;
use App\Http\Requests\Api\UpdateDonationRequest;
use App\Http\Resources\DonationResource;
use App\Models\Donation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DonationController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_fundraising'), 403);

        $query = Donation::query()->with('campaign:id,title,slug')->latest('donated_at');

        if ($request->filled('fundraising_campaign_id')) {
            $query->where('fundraising_campaign_id', $request->integer('fundraising_campaign_id'));
        }

        return DonationResource::collection(
            $query->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreDonationRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['received_by'] = $data['received_by'] ?? $request->user()->id;

        $donation = Donation::query()->create($data);

        return (new DonationResource($donation->load('campaign')))->response()->setStatusCode(201);
    }

    public function show(Request $request, Donation $donation): DonationResource
    {
        abort_unless($request->user()?->hasPermission('view_fundraising'), 403);

        return new DonationResource($donation->load('campaign'));
    }

    public function update(UpdateDonationRequest $request, Donation $donation): DonationResource
    {
        $donation->update($request->validated());

        return new DonationResource($donation->fresh()->load('campaign'));
    }

    public function destroy(Request $request, Donation $donation): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_fundraising'), 403);
        $donation->delete();

        return response()->json(['message' => 'Donation deleted.']);
    }
}
