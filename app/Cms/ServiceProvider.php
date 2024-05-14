<?php

namespace App\Cms;

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
        Route::prefix("cms")
            ->middleware("web")
            ->group(__DIR__ . "/routes/auth.php");

        Route::prefix("cms")
            ->middleware(["web", "auth:cms", "verified"])
            ->group(__DIR__ . "/routes/cms.php");

        $this->loadViewsFrom(__DIR__ . "/resources/views", "cms");
    }
}
