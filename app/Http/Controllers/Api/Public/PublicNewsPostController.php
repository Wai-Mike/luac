<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsPostResource;
use App\Models\NewsPost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicNewsPostController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = NewsPost::query()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at');

        return NewsPostResource::collection(
            $query->paginate($request->integer('per_page', 12))
        );
    }
}
