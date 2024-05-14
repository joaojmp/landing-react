<?php

use Illuminate\Support\Facades\Route;
use App\Web\Http\Controllers\BlogController;
use App\Web\Http\Controllers\IndexController;
use App\Web\Http\Controllers\LeadsController;
use App\Web\Http\Controllers\LinksController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [IndexController::class, "index"])->name("web.home");

Route::get('/sobre', [IndexController::class, "about"])->name("web.about");

Route::get("/blog/{year?}/{month?}/{day?}", [BlogController::class, "index"])->name("web.blog.index");
Route::get("/blog/{year}/{month}/{day}/{slug}", [BlogController::class, "show"])->name("web.blog.show");

Route::get('/contato', [IndexController::class, "contact"])->name("web.contact");

Route::get('/politicas/{slug}', [IndexController::class, "policy"])->name("web.policy");

Route::post('/leads', [LeadsController::class, "store"])->name("web.leads.store");

Route::get("/links", [LinksController::class, "index"])->name("web.links");
