<?php

namespace App\Cms\Http\Controllers\Configs;

use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Src\Configs\ConfigService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use App\Core\Http\Controllers\Controller;

class ScriptsController extends Controller
{
    /**
     * The service instance for interacting with data.
     *
     * @var ConfigService
     */
    protected ConfigService $service;

    /**
     * Controller constructor.
     *
     * @param ConfigService $service
     */
    public function __construct(ConfigService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $configs = $this->service->all();

        return Inertia::render("Configs/Scripts", ["configs" => $configs]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * 
     * @return RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            "scripts_head" => ["nullable", "string"],
            "scripts_body" => ["nullable", "string"],
        ], [], [
            "scripts_head" => "scripts para tag head",
            "scripts_body" => "scripts para tag body",
        ]);

        try {
            $this->service->update("scripts_head", $request->scripts_head);
            $this->service->update("scripts_body", $request->scripts_body);

            return $this->backWithSuccess("Atualizado com sucesso.");
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : "Não foi possível atualizar.");
        }
    }
}
