<?php

namespace App\Core\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class Https
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->secure() && App::environment() === "production") {
            return redirect()->secure($request->path(), 301);
        }

        return $next($request);
    }
}
