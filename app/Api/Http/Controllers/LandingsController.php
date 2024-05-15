<?php

namespace App\Api\Http\Controllers;

use Src\Landings\LandingService;
use App\Api\Http\Controllers\Controller;

class LandingsController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param LandingService $service The service instance for handling business logic.
     */
    public function __construct(LandingService $service)
    {
        $this->service = $service;
    }
}
