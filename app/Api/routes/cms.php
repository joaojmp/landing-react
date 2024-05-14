<?php

use Illuminate\Support\Facades\Route;
use App\Api\Http\Controllers\LeadsController;
use App\Api\Http\Controllers\LinksController;
use App\Api\Http\Controllers\PagesController;
use App\Api\Http\Controllers\UsersController;
use App\Api\Http\Controllers\BannersController;
use App\Api\Http\Controllers\PoliciesController;
use App\Api\Http\Controllers\Posts\PostsController;
use App\Api\Http\Controllers\Posts\ImagesController;
use App\Api\Http\Controllers\Posts\SubjectsController;
use App\Api\Http\Controllers\Posts\DescriptionsController;

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

Route::put("/banners/reorder", [BannersController::class, "reorder"])->name("api.banners.reorder");
Route::apiResource("/banners", BannersController::class, [
    'as' => 'api'
]);

Route::put("/posts/subjects/reorder", [SubjectsController::class, "reorder"])->name("api.subjects.reorder");
Route::apiResource("/posts/subjects", SubjectsController::class, [
    'as' => 'api'
]);

Route::put("/posts/descriptions/reorder", [DescriptionsController::class, "reorder"])->name("api.descriptions.reorder");
Route::apiResource("/posts/descriptions", DescriptionsController::class, [
    'as' => 'api'
]);

Route::put("/posts/images/reorder", [ImagesController::class, "reorder"])->name("api.posts.images.reorder");
Route::apiResource("/posts/images", ImagesController::class, [
    'as' => 'api.posts'
]);

Route::apiResource("/posts", PostsController::class, [
    'as' => 'api'
]);

Route::apiResource("/leads", LeadsController::class, [
    'as' => 'api'
]);

Route::apiResource("/links", LinksController::class, [
    'as' => 'api'
]);

Route::apiResource("/pages", PagesController::class, [
    'as' => 'api'
]);

Route::apiResource("/policies", PoliciesController::class, [
    'as' => 'api'
]);

Route::apiResource("/users", UsersController::class, [
    'as' => 'api'
]);
