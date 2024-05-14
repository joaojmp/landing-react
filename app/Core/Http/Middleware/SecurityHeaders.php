<?php

namespace App\Core\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Vite;

class SecurityHeaders
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
        $response = $next($request);

        if ($request->is(["cms", "cms/*"]) || $response->getStatusCode() >= 400) {
            return $response;
        }

        $baseUri = config("app.url");
        $defaultSrc = "'none'";
        $imgSrc = "'self' data: https://*.google-analytics.com https://img.youtube.com https://*.sharethis.com https://fonts.gstatic.com/s/i/googlematerialicons/more/v6/gm_blue-48dp/1x/gm_more_gm_blue_48dp.png";
        $scriptSrc = "'self' 'unsafe-inline' 'unsafe-eval' 'nonce-" . Vite::cspNonce() . "' http://*:*/ https://*.google.com https://*.gstatic.com https://*.googletagmanager.com https://*.google-analytics.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://*.sharethis.com http://www.youtube.com";
        $styleSrc = "'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://www.googletagmanager.com/debug/badge.css";
        $fontSrc = "data: https://fonts.gstatic.com https://fonts.googleapis.com/ https://cdnjs.cloudflare.com/";
        $connectSrc = "'self' ws://*:*/ ws://127.0.0.1:*/ https://*.google-analytics.com https://viacep.com.br https://*.sharethis.com";
        $frameSrc = "https://*.google.com https://*.youtube.com https://*.sharethis.mgr.consensu.org";
        $frameAncestors = "'none'";

        $response->header("Content-Security-Policy", "base-uri $baseUri; default-src $defaultSrc; img-src $imgSrc; script-src $scriptSrc; style-src $styleSrc; font-src $fontSrc; connect-src $connectSrc; frame-src $frameSrc; frame-ancestors $frameAncestors");

        $response->header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

        $response->header("X-Content-Type-Options", "nosniff");

        $response->header("X-Frame-Options", "DENY");

        $response->header("X-XSS-Protection", "1; mode=block");

        return $response;
    }
}
