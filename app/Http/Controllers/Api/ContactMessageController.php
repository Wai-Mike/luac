<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StorePublicContactMessageRequest;
use App\Http\Requests\Api\UpdateContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ContactMessageController extends Controller
{
    public function store(StorePublicContactMessageRequest $request): JsonResponse
    {
        $message = ContactMessage::query()->create($request->validated());

        return (new ContactMessageResource($message))->response()->setStatusCode(201);
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_contact_messages'), 403);

        $query = ContactMessage::query()->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return ContactMessageResource::collection(
            $query->paginate($request->integer('per_page', 20))
        );
    }

    public function show(Request $request, ContactMessage $contactMessage): ContactMessageResource
    {
        abort_unless($request->user()?->hasPermission('view_contact_messages'), 403);

        return new ContactMessageResource($contactMessage);
    }

    public function update(UpdateContactMessageRequest $request, ContactMessage $contactMessage): ContactMessageResource
    {
        $contactMessage->update($request->validated());

        return new ContactMessageResource($contactMessage->fresh());
    }

    public function destroy(Request $request, ContactMessage $contactMessage): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('update_contact_messages'), 403);
        $contactMessage->delete();

        return response()->json(['message' => 'Contact message deleted.']);
    }
}
