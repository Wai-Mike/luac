<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\GeneratesUniqueSlug;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreProgramRequest;
use App\Http\Requests\Api\UpdateProgramRequest;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProgramController extends Controller
{
    use GeneratesUniqueSlug;

    public function index(Request $request): AnonymousResourceCollection
    {
        abort_unless($request->user()?->hasPermission('view_programs'), 403);

        return ProgramResource::collection(
            Program::query()->latest()->paginate($request->integer('per_page', 15))
        );
    }

    public function store(StoreProgramRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->uniqueSlug('programs', 'slug', $data['title']);
        $data['created_by'] = $request->user()->id;

        $program = Program::query()->create($data);

        return (new ProgramResource($program))->response()->setStatusCode(201);
    }

    public function show(Request $request, Program $program): ProgramResource
    {
        abort_unless($request->user()?->hasPermission('view_programs'), 403);

        return new ProgramResource($program);
    }

    public function update(UpdateProgramRequest $request, Program $program): ProgramResource
    {
        $data = $request->validated();
        if (isset($data['title']) && $data['title'] !== $program->title) {
            $data['slug'] = $this->uniqueSlug('programs', 'slug', $data['title'], $program->id);
        }
        $program->update($data);

        return new ProgramResource($program->fresh());
    }

    public function destroy(Request $request, Program $program): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('delete_programs'), 403);
        $program->delete();

        return response()->json(['message' => 'Program deleted.']);
    }
}
