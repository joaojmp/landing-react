<?php

namespace App\Api\Http\Controllers;

use Exception;
use Src\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Core\Http\Controllers\Controller as BaseController;

/**
 * Class Controller
 *
 * @package App\Api\Http\Controllers
 */
abstract class Controller extends BaseController
{
    /**
     * The service instance for handling business logic.
     *
     * @var Service
     */
    protected Service $service;

    /**
     * Controller constructor.
     *
     * @param Service $service The service instance for handling business logic.
     */
    public function __construct(Service $service)
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
        $objects = $this->service->all();

        return $this->json($objects);
    }

    /**
     * Show a single object by ID and return a JSON response.
     *
     * @param int $id The ID of the object to show.
     *
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $object = $this->service->find($id);

            return $this->json($object);
        } catch (Exception $e) {
            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->badRequest($this->getMessage($e, 'Não foi encontrado.'));
        }
    }

    /**
     * Store a new object using the provided request data and return a JSON response.
     *
     * @param Request $request The HTTP request instance.
     *
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $this->validateByType($request, 'create');

        try {
            $object = $this->service->create($request->all());

            return $this->json($object);
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->badRequest($this->getMessage($e, 'Não foi possível cadastrar.'));
        }
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
            $object = $this->service->update($request->all(), $id);

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

    /**
     * Delete an object by ID and return a JSON response.
     *
     * @param int $id The ID of the object to delete.
     *
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $object = $this->service->delete($id);

            return $this->json($object);
        } catch (Exception $e) {
            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->badRequest($this->getMessage($e, 'Não foi possível excluir.'));
        }
    }
}
