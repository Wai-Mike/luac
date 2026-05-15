<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\GeneratesUniqueSlug;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreNewsPostRequest;
use App\Http\Requests\Api\UpdateNewsPostRequest;
use App\Http\Resources\NewsPostResource;
use App\Models\NewsPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsPostController extends Controller
{
    use GeneratesUniqueSlug;

    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_news'), 403);

        return NewsPostResource::collection(
            NewsPost::query()->latest()->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreNewsPostRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->uniqueSlug('news_posts', 'slug', $data['title']);
        $data['created_by'] = $request->user()->id;

        if (($data['status'] ?? '') === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post = NewsPost::query()->create($data);

        return (new NewsPostResource($post))->response()->setStatusCode(201);
    }

    public function show(Request $request, NewsPost $newsPost): NewsPostResource
    {
        abort_unless($request->user()?->hasPermission('view_news'), 403);

        return new NewsPostResource($newsPost);
    }

    public function update(UpdateNewsPostRequest $request, NewsPost $newsPost): NewsPostResource
    {
        $data = $request->validated();
        if (isset($data['title']) && $data['title'] !== $newsPost->title) {
            $data['slug'] = $this->uniqueSlug('news_posts', 'slug', $data['title'], $newsPost->id);
        }
        if (($data['status'] ?? $newsPost->status) === 'published' && empty($data['published_at'] ?? $newsPost->published_at)) {
            $data['published_at'] = now();
        }

        $newsPost->update($data);

        return new NewsPostResource($newsPost->fresh());
    }

    public function destroy(Request $request, NewsPost $newsPost): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_news'), 403);
        $newsPost->delete();

        return response()->json(['message' => 'News post deleted.']);
    }
}
