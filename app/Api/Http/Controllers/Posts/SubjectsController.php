<?php

namespace App\Api\Http\Controllers\Posts;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Src\Posts\Services\SubjectService;
use App\Api\Http\Controllers\Controller;

class SubjectsController extends Controller
{
    /**
     * Controller constructor.
     *
     * @param SubjectService $service The service instance for handling business logic.
     */
    public function __construct(SubjectService $service)
    {
        $this->service = $service;
    }

    /**
     * Get all objects and return a JSON response.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $objects = $this->service->orderBy("order")->get();

        return $this->json($objects);
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

            return response("Não foi possível reordenar os assuntos.", 400);
        }
    }
}
