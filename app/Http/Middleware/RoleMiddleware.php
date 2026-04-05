<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request. $roles may be a single role or comma-separated (e.g. member,management).
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $roles): Response
    {
        if (! auth()->check()) {
            return redirect()->route('login')->with('error', 'Please log in to access this page.');
        }

        $allowed = array_map('trim', explode(',', $roles));
        $user = auth()->user();

        if (! in_array($user->role, $allowed, true)) {
            return match ($user->role) {
                'admin' => redirect()->route('admin.dashboard')->with('error', 'Access denied. You do not have permission to access this resource.'),
                'management', 'member' => redirect()->route('user.dashboard')->with('error', 'Access denied. You do not have permission to access this resource.'),
                default => redirect()->route('home')->with('error', 'Access denied. Invalid user role.'),
            };
        }

        return $next($request);
    }
}
