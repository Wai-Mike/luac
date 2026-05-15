<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleOrHigherMiddleware
{
    /**
     * member < management < admin
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (! auth()->check()) {
            return redirect()->route('login')->with('error', 'Please log in to access this page.');
        }

        $user = auth()->user();

        $roleHierarchy = [
            'member' => 1,
            'management' => 2,
            'admin' => 3,
        ];

        $userRoleLevel = $roleHierarchy[$user->role] ?? 0;
        $requiredRoleLevel = $roleHierarchy[$role] ?? 0;

        if ($userRoleLevel < $requiredRoleLevel) {
            return match ($user->role) {
                'admin' => redirect()->route('home')->with('error', 'Access denied. You do not have sufficient privileges to access this resource.'),
                'management', 'member' => redirect()->route('user.dashboard')->with('error', 'Access denied. You do not have sufficient privileges to access this resource.'),
                default => redirect()->route('home')->with('error', 'Access denied. Invalid user role.'),
            };
        }

        return $next($request);
    }
}
