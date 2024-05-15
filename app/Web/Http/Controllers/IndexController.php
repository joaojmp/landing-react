<?php

namespace App\Web\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Src\Landings\LandingService;
use App\Core\Http\Controllers\Controller;

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
            return Inertia::render('NotFound');
        }

        view()->share('landing', $landing);

        return Inertia::render('Index', ['landing' => $landing]);
    }
}
