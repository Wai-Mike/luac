<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Prefer permission-based RBAC while legacy {@see User::$role} admins remain first-class via {@see User::hasPermission()}.
 */
class EnsureAdminAccess
{
    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login')->with('error', 'Please log in to access this page.');
        }

        if (! $user->canAccessAdminPanel()) {
            return redirect()->route('home')->with('error', 'Only LAYYA executive members can access the backend.');
        }

        return $next($request);
    }
}
