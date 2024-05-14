<?php

namespace App\Api\Http\Controllers;

use Src\Users\UserService;
use App\Api\Http\Controllers\Controller;

class UsersController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param UserService $service The service instance for handling business logic.
     */
    public function __construct(UserService $service)
    {
        $this->service = $service;
    }
}
