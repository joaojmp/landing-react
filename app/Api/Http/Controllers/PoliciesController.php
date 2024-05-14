<?php

namespace App\Api\Http\Controllers;

use Src\Policies\PolicyService;
use App\Api\Http\Controllers\Controller;

class PoliciesController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param PolicyService $service The service instance for handling business logic.
     */
    public function __construct(PolicyService $service)
    {
        $this->service = $service;
    }
}
