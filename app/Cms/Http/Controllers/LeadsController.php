<?php

namespace App\Cms\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Src\Landings\Services\LeadService;
use App\Cms\Http\Controllers\Controller;

class LeadsController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param LeadService $service
     */
    public function __construct(LeadService $service)
    {
        parent::__construct($service);
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Leads";
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $response = [];
        $objects = $this->service->with("landing")->get();

        if ($objects) {
            $response['objects'] = $objects;
        }

        if (!empty($this->includes)) {
            foreach ($this->includes as $attribute => $model) {
                $response[$attribute] = $model::all();
            }
        }

        return Inertia::render($this->path() . '/All', $response);
    }
}
