<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ServePublicStorageController extends Controller
{
    public function __invoke(Request $request, string $path): BinaryFileResponse
    {
        $path = str_replace('\\', '/', $path);

        abort_if($path === '' || str_contains($path, '..') || str_starts_with($path, '/'), 404);

        $file = storage_path('app/public/'.$path);

        abort_unless(is_file($file), 404);

        return response()->file($file);
    }
}
