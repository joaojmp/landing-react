<?php

namespace App\Api\Http\Controllers;

use App\Api\Http\Controllers\Controller;
use Src\Landings\Services\LandingService;

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
