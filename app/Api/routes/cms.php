<?php

use Illuminate\Support\Facades\Route;
use App\Api\Http\Controllers\LeadsController;
use App\Api\Http\Controllers\PagesController;
use App\Api\Http\Controllers\UsersController;
use App\Api\Http\Controllers\LandingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource("/landings", LandingsController::class, [
    'as' => 'api'
]);

Route::apiResource("/landings/pages", PagesController::class, [
    'as' => 'api'
]);

Route::apiResource("/leads", LeadsController::class, [
    'as' => 'api'
]);

Route::apiResource("/users", UsersController::class, [
    'as' => 'api'
]);
