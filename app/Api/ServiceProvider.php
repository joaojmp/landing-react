<?php

namespace App\Api;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Route::prefix("api/cms")
            ->middleware(["api", "auth:api"])
            ->group(__DIR__ . "/routes/cms.php");

        Route::prefix("api")
            ->middleware(["web", "api"])
            ->group(__DIR__ . "/routes/web.php");
    }
}
