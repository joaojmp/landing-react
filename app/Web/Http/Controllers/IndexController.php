<?php

namespace App\Web\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Core\Http\Controllers\Controller;
use Src\Landings\Services\LandingService;
use stdClass;

class IndexController extends Controller
{
    /**
     * @var LandingService
     */
    protected LandingService $service;

    /**
     * @param LandingService $service
     */
    public function __construct(LandingService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the index view.
     */
    public function index(string $slug, string $slugTwo = null): Response
    {
        $landing = $this->service->with(["pages" => function ($query) {
            $query->with("landing")->orderBy("order");
        }])->where("slug", $slug)->first();

        if (!$landing) {
            return abort(404);
        }

        $page = $slugTwo ? $landing->pages->where('slug', $slugTwo)->first() : $landing->pages->first();

        $content = new stdClass;
        $content->landing = $landing;
        $content->page = $page;
        view()->share('content', $content);

        return Inertia::render('Index', ['page' => $page]);
    }
}
