<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreProgramParticipantRequest;
use App\Http\Requests\Api\UpdateProgramParticipantRequest;
use App\Http\Resources\ProgramParticipantResource;
use App\Models\Program;
use App\Models\ProgramParticipant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProgramParticipantController extends Controller
{
    public function index(Request $request, Program $program): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_programs'), 403);

        return ProgramParticipantResource::collection(
            $program->participants()->latest()->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreProgramParticipantRequest $request, Program $program): JsonResponse
    {
        $participant = $program->participants()->create($request->validated());

        return (new ProgramParticipantResource($participant))->response()->setStatusCode(201);
    }

    public function show(Request $request, Program $program, ProgramParticipant $participant): ProgramParticipantResource
    {
        abort_unless($request->user()?->hasPermission('view_programs'), 403);
        abort_if($participant->program_id !== $program->id, 404);

        return new ProgramParticipantResource($participant);
    }

    public function update(
        UpdateProgramParticipantRequest $request,
        Program $program,
        ProgramParticipant $participant
    ): ProgramParticipantResource {
        abort_if($participant->program_id !== $program->id, 404);
        $participant->update($request->validated());

        return new ProgramParticipantResource($participant->fresh());
    }

    public function destroy(Request $request, Program $program, ProgramParticipant $participant): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('update_programs'), 403);
        abort_if($participant->program_id !== $program->id, 404);
        $participant->delete();

        return response()->json(['message' => 'Participant removed.']);
    }
}
