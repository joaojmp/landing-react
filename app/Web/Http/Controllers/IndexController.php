<?php

namespace App\Web\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Core\Http\Controllers\Controller;

class IndexController extends Controller
{
    /**
     * Display the index view.
     */
    public function index(): Response
    {
        return Inertia::render('Index');
    }
}
