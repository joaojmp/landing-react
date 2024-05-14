<?php

namespace App\Core\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (!$request->expectsJson()) {
            if ($request->is(["cms", "cms/*"])) {
                return route("cms.login");
            } else {
                return route("web.home");
            }
        }
    }
}
