<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicProgramController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Program::query()
            ->whereIn('status', ['planned', 'ongoing', 'completed'])
            ->latest();

        return ProgramResource::collection(
            $query->paginate($request->integer('per_page', 12))
        );
    }
}
