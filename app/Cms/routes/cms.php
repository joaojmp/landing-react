<?php

use Illuminate\Support\Facades\Route;
use App\Cms\Http\Controllers\IndexController;
use App\Cms\Http\Controllers\UsersController;
use App\Cms\Http\Controllers\LandingsController;

/*
|--------------------------------------------------------------------------
| Cms Routes
|--------------------------------------------------------------------------
|
| Here is where you can register cms routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "cms" middleware group. Now create something great!
|
*/

Route::get('/', [IndexController::class, "index"])->name("cms.home");

Route::resource('/landings', LandingsController::class);

Route::resource('/users', UsersController::class);
Route::put("/users/{id}/{file}", [UsersController::class, "destroyFile"])->name("users.file");

Route::get("/cache", [IndexController::class, "cache"])->name("cms.cache");
Route::get("/cache/clear", [IndexController::class, "cacheClear"])->name("cms.clear");
Route::get("/down", [IndexController::class, "down"])->name("cms.down");
Route::get("/up", [IndexController::class, "up"])->name("cms.up");

Route::get("/phpinfo", function () {
    phpinfo();
})->name("cms.php");
