<?php

use Illuminate\Support\Facades\Route;
use App\Api\Http\Controllers\LeadsController;

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

Route::post("/leads", [LeadsController::class, "store"])->name("api.leads.store");
