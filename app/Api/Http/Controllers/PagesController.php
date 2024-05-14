<?php

namespace App\Api\Http\Controllers;

use Src\Pages\PageService;
use App\Api\Http\Controllers\Controller;

class PagesController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param PageService $service The service instance for handling business logic.
     */
    public function __construct(PageService $service)
    {
        $this->service = $service;
    }
}
