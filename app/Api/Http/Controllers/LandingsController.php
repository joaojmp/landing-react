<?php

namespace App\Api\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Src\Landings\LandingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        $this->validateByType($request, 'update', $id);

        try {
            $object = $this->service->update([
                "content" => $request->get('data')
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
