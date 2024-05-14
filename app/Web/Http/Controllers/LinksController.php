<?php

namespace App\Web\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Src\Links\LinkService;
use App\Core\Http\Controllers\Controller;

class LinksController extends Controller
{
    /**
     * @var LinkService
     */
    protected LinkService $linkService;

    /**
     * @param LinkService $linkService
     */
    public function __construct(LinkService $linkService)
    {
        $this->linkService = $linkService;
    }

    /**
     * Display the link view.
     */
    public function index(): Response
    {
        $links = $this->linkService->orderBy("order")->get();

        return Inertia::render('Link/Index', ["links" => $links]);
    }
}
