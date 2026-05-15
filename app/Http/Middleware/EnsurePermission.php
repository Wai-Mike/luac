<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePermission
{
    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $user = $request->user();

        if (! $user || ! $user->hasPermission($permission)) {
            $message = 'You do not have permission to perform this action.';

            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => $message,
                ], 403);
            }

            return redirect()
                ->back(fallback: $user?->canAccessAdminPanel() ? route('admin.dashboard') : route('home'))
                ->with('error', $message);
        }

        return $next($request);
    }
}
