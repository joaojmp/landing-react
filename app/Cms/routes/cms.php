<?php

use Illuminate\Support\Facades\Route;
use App\Cms\Http\Controllers\IndexController;
use App\Cms\Http\Controllers\LeadsController;
use App\Cms\Http\Controllers\PagesController;
use App\Cms\Http\Controllers\UsersController;
use App\Cms\Http\Controllers\BannersController;
use App\Cms\Http\Controllers\PoliciesController;
use App\Cms\Http\Controllers\Links\LinksController;
use App\Cms\Http\Controllers\Posts\PostsController;
use App\Cms\Http\Controllers\Posts\SubjectsController;
use App\Cms\Http\Controllers\Configs\ConfigsController;
use App\Cms\Http\Controllers\Configs\ScriptsController;
use App\Cms\Http\Controllers\Configs\WhatsappController;
use App\Cms\Http\Controllers\Links\ConfigsController as LinksConfigsController;

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

Route::resource('/banners', BannersController::class);
Route::put("/banners/{id}/{file}", [BannersController::class, "destroyFile"])->name("banners.file");

Route::resource("/posts/subjects", SubjectsController::class);
Route::put("/posts/descriptions/{id}/{file}", [PostsController::class, "destroyDescriptionsFile"])->name("posts.descriptions.file");
Route::resource("/posts", PostsController::class);

Route::resource('/leads', LeadsController::class);

Route::get("/links/configs", [LinksConfigsController::class, "index"])->name("links.configs.index");
Route::put("/links/configs", [LinksConfigsController::class, "update"])->name("links.configs.update");
Route::put("/links/configs/{file}", [LinksConfigsController::class, "destroyFile"])->name("links.configs.file");
Route::resource('/links', LinksController::class);
Route::put("/links/{id}/{file}", [LinksController::class, "destroyFile"])->name("links.file");

Route::resource('/pages', PagesController::class);
Route::put("/pages/{id}/{file}", [PagesController::class, "destroyFile"])->name("pages.file");

Route::resource('/policies', PoliciesController::class);

Route::resource('/users', UsersController::class);
Route::put("/users/{id}/{file}", [UsersController::class, "destroyFile"])->name("users.file");

Route::get("/cache", [IndexController::class, "cache"])->name("cms.cache");
Route::get("/cache/clear", [IndexController::class, "cacheClear"])->name("cms.clear");
Route::get("/down", [IndexController::class, "down"])->name("cms.down");
Route::get("/up", [IndexController::class, "up"])->name("cms.up");

Route::get("/configs/whatsapp", [WhatsappController::class, "index"])->name("configs.whatsapp.index");
Route::put("/configs/whatsapp", [WhatsappController::class, "update"])->name("configs.whatsapp.update");

Route::get("/configs/scripts", [ScriptsController::class, "index"])->name("configs.scripts.index");
Route::put("/configs/scripts", [ScriptsController::class, "update"])->name("configs.scripts.update");

Route::get("/configs", [ConfigsController::class, "index"])->name("configs.index");
Route::put("/configs", [ConfigsController::class, "update"])->name("configs.update");

Route::get("/phpinfo", function () {
    phpinfo();
})->name("cms.php");
