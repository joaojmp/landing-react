<?php

namespace App\Core\Http\Middleware;

use Closure;
use stdClass;
use Inertia\Inertia;
use Pest\Support\Str;
use Src\Pages\PageService;
use Illuminate\Http\Request;
use Src\Configs\ConfigService;
use Src\Policies\PolicyService;
use Illuminate\Support\Facades\Vite;

/**
 * Class Layout
 *
 * This middleware class is responsible for sharing common data with Inertia responses, such as configurations,
 * policies, footer information, and page details. It ensures that these shared data are available across
 * all Inertia-driven views.
 *
 * @package App\Core\Http\Middleware
 */
class Layout
{
    /**
     * The configuration service instance.
     *
     * @var ConfigService
     */
    protected $configService;

    /**
     * The policy service instance.
     *
     * @var PolicyService
     */
    protected $policyService;

    /**
     * The page service instance.
     *
     * @var PageService
     */
    protected $pageService;

    /**
     * Layout constructor.
     *
     * @param ConfigService $configService
     * @param PolicyService $policyService
     * @param PageService   $pageService
     */
    public function __construct(
        ConfigService $configService,
        PolicyService $policyService,
        PageService $pageService
    ) {
        $this->configService = $configService;
        $this->policyService = $policyService;
        $this->pageService = $pageService;
    }

    /**
     * Handle an incoming request.
     *
     * @param Request  $request
     * @param Closure  $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $configs = $this->configService->all();
        Inertia::share("configs", $configs);
        view()->share("configs", $configs);

        $policies = $this->policyService->where("fixed", true)->get();
        Inertia::share("policies", $policies);

        $footer = new stdClass;
        $footer->policies = $this->policyService->all();
        Inertia::share("footer", $footer);

        $page = $this->pageService->where("url", $request->url())->orWhere("url", $request->url() . "/")->first();
        Inertia::share("page", $page);

        Vite::useCspNonce(Str::random(25));

        return $next($request);
    }
}
