<?php

namespace App\Api\Http\Controllers\Posts;

use Src\Posts\Services\PostService;
use App\Api\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param PostService $service The service instance for handling business logic.
     */
    public function __construct(PostService $service)
    {
        $this->service = $service;
    }
}
