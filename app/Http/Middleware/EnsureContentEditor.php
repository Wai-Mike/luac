<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureContentEditor
{
    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->canEditContent()) {
            return redirect()
                ->back(fallback: route('admin.dashboard'))
                ->with('error', 'Only the Chairman or an assigned admin can edit content.');
        }

        return $next($request);
    }
}
