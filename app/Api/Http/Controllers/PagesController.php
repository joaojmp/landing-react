<?php

namespace App\Api\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Src\Landings\Services\PageService;
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

    /**
     * Update an existing object using the provided request data and return a JSON response.
     *
     * @param Request $request The HTTP request instance.
     * @param int     $id      The ID of the object to update.
     *
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $object = $this->service->update([
                "content" => $request->content,
                "html" => $request->html,
                "css" => $request->css,
                "js" => $request->js,
                "landing_id" => $request->landing_id,
            ], $id);

            return $this->json($object);
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->badRequest($this->getMessage($e, 'Não foi possível atualizar.'));
        }
    }
}
