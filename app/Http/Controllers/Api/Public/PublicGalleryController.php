<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryItemResource;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicGalleryController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = GalleryItem::query()
            ->where('status', 'visible')
            ->orderBy('sort_order')
            ->orderByDesc('id');

        return GalleryItemResource::collection(
            $query->paginate($request->integer('per_page', 24))
        );
    }
}
