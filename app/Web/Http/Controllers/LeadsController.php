<?php

namespace App\Web\Http\Controllers;

use Exception;
use Src\Leads\LeadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use App\Core\Http\Controllers\Controller;

class LeadsController extends Controller
{
    /**
     * @var LeadService
     */
    protected LeadService $leadService;

    /**
     * @param LeadService $leadService
     */
    public function __construct(LeadService $leadService)
    {
        $this->leadService = $leadService;
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            "name" => "required|string|max:191",
            "email" => "required|required_without:phone|string|email|max:191",
            "phone" => "required|required_without:email|string",
            "origin" => "required|string|max:191",
        ], [], [
            "name" => "nome",
            "email" => "e-mail",
            "phone" => "telefone",
            "origin" => "origem",
        ]);

        try {
            $this->leadService->create($request->all());

            return $this->backWithSuccess("Salvo com sucesso!");
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : 'Não foi possível adicionar.');
        }
    }
}
