<?php

namespace App\Cms\Http\Controllers;

use Src\Leads\LeadService;
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
}
