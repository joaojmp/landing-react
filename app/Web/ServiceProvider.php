<?php

namespace App\Web;

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
        Route::middleware("web")
            ->group(__DIR__ . "/routes/web.php");

        $this->loadViewsFrom(__DIR__ . "/resources/views", "web");
    }
}
