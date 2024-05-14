<?php

namespace App\Web\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Src\Banners\BannerService;
use Src\Policies\PolicyService;
use App\Core\Http\Controllers\Controller;

class IndexController extends Controller
{
    /**
     * @var BannerService
     */
    protected BannerService $bannerService;

    /**
     * @var PolicyService
     */
    protected PolicyService $policyService;

    /**
     * @param BannerService $bannerService
     * @param PolicyService $policyService
     */
    public function __construct(
        BannerService $bannerService,
        PolicyService $policyService
    ) {
        $this->bannerService = $bannerService;
        $this->policyService = $policyService;
    }

    /**
     * Display the home view.
     */
    public function index(): Response
    {
        $banners = $this->bannerService->orderBy("order")->get();

        return Inertia::render('Home/Index', ['banners' => $banners]);
    }

    /**
     * Display the about view.
     */
    public function about(): Response
    {
        return Inertia::render('About/Index');
    }

    /**
     * Display the contact view.
     */
    public function contact(): Response
    {
        return Inertia::render('Contact/Index');
    }

    /**
     * Display the policy view.
     */
    public function policy(string $slug): Response
    {
        $policy = $this->policyService->findBySlug($slug);

        if (!$policy) {
            return abort(404);
        }

        return Inertia::render('Policy/Index', ['policy' => $policy]);
    }
}
