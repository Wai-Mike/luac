<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicEventController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Event::query()
            ->where('status', 'upcoming')
            ->orderByRaw('COALESCE(event_date, starts_at) ASC');

        return EventResource::collection(
            $query->paginate($request->integer('per_page', 12))
        );
    }
}
