<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreGalleryItemRequest;
use App\Http\Requests\Api\UpdateGalleryItemRequest;
use App\Http\Resources\GalleryItemResource;
use App\Models\GalleryItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GalleryItemController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_gallery'), 403);

        return GalleryItemResource::collection(
            GalleryItem::query()
                ->orderBy('sort_order')
                ->orderByDesc('id')
                ->paginate($request->integer('per_page', 20))
        );
    }

    public function store(StoreGalleryItemRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        $item = GalleryItem::query()->create($data);

        return (new GalleryItemResource($item))->response()->setStatusCode(201);
    }

    public function show(Request $request, GalleryItem $galleryItem): GalleryItemResource
    {
        abort_unless($request->user()?->hasPermission('view_gallery'), 403);

        return new GalleryItemResource($galleryItem);
    }

    public function update(UpdateGalleryItemRequest $request, GalleryItem $galleryItem): GalleryItemResource
    {
        $galleryItem->update($request->validated());

        return new GalleryItemResource($galleryItem->fresh());
    }

    public function destroy(Request $request, GalleryItem $galleryItem): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_gallery'), 403);
        $galleryItem->delete();

        return response()->json(['message' => 'Gallery item deleted.']);
    }
}
