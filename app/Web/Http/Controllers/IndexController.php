<?php

namespace App\Web\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Core\Http\Controllers\Controller;
use Src\Landings\Services\LandingService;

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
    public function index(string $slug): Response
    {
        $landing = $this->service->findBySlug($slug);

        if (!$landing) {
            return abort(404);
        }

        view()->share('landing', $landing);

        return Inertia::render('Index', ['landing' => $landing]);
    }
}
