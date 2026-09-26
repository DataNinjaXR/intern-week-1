<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Demonstration Middleware: Check for optional or required API token
        $apiKey = $request->header('X-API-Key') ?? $request->bearerToken();

        // For demonstration, if X-API-Key header is 'secret-key-123' or 'demo-token', allow protected action
        // If route demands strict auth and key is invalid, return 401
        if ($request->is('api/protected/*') && $apiKey !== 'secret-key-123') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Invalid or missing X-API-Key header (use X-API-Key: secret-key-123).',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $response = $next($request);

        // Append custom middleware header for demonstration
        $response->headers->set('X-Middleware-Verified', 'True');

        return $response;
    }
}
