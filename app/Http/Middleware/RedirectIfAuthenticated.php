<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $user = auth()->user();

            return match ($user->role) {
                'admin' => redirect()->route('admin.dashboard'),
                'management', 'member' => redirect()->route('user.dashboard'),
                default => redirect()->route('home'),
            };
        }

        return $next($request);
    }
}
