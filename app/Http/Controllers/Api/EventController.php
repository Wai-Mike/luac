<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\GeneratesUniqueSlug;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreEventRequest;
use App\Http\Requests\Api\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EventController extends Controller
{
    use GeneratesUniqueSlug;

    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_events'), 403);

        return EventResource::collection(
            Event::query()->latest('starts_at')->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreEventRequest $request): JsonResponse
    {
        $data = $this->mapFeaturedImage($request->validated());
        $data['slug'] = $this->uniqueSlug('events', 'slug', $data['title']);
        $data['created_by'] = $request->user()->id;
        if (empty($data['event_date'])) {
            $data['event_date'] = $data['starts_at'];
        }

        $event = Event::query()->create($data);

        return (new EventResource($event))->response()->setStatusCode(201);
    }

    public function show(Request $request, Event $event): EventResource
    {
        abort_unless($request->user()?->hasPermission('view_events'), 403);

        return new EventResource($event);
    }

    public function update(UpdateEventRequest $request, Event $event): EventResource
    {
        $data = $this->mapFeaturedImage($request->validated());
        if (isset($data['title']) && $data['title'] !== $event->title) {
            $data['slug'] = $this->uniqueSlug('events', 'slug', $data['title'], $event->id);
        }
        if (array_key_exists('starts_at', $data) && ! array_key_exists('event_date', $data)) {
            $data['event_date'] = $data['starts_at'];
        }

        $event->update($data);

        return new EventResource($event->fresh());
    }

    public function destroy(Request $request, Event $event): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_events'), 403);
        $event->delete();

        return response()->json(['message' => 'Event deleted.']);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mapFeaturedImage(array $data): array
    {
        if (array_key_exists('featured_image', $data)) {
            $data['cover_image'] = $data['featured_image'];
            unset($data['featured_image']);
        }

        return $data;
    }
}
