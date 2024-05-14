<?php

namespace App\Api\Http\Controllers;

use Exception;
use Src\Links\LinkService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Api\Http\Controllers\Controller;

class LinksController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param LinkService $service The service instance for handling business logic.
     */
    public function __construct(LinkService $service)
    {
        $this->service = $service;
    }

    /**
     * Reorder function based on the provided IDs.
     *
     * @param Request  $request
     * 
     * @return Response
     */
    public function reorder(Request $request): Response
    {
        try {
            $this->service->reorder($request->ids);

            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return response("Não foi possível reordenar os links.", 400);
        }
    }
}
