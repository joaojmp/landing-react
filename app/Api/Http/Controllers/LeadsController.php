<?php

namespace App\Api\Http\Controllers;

use Src\Leads\LeadService;
use App\Api\Http\Controllers\Controller;

class LeadsController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "data" => "dados",
        "landing_id" => "página",
    ];

    /**
     * Controller constructor.
     *
     * @param LeadService $service The service instance for handling business logic.
     */
    public function __construct(LeadService $service)
    {
        $this->service = $service;
    }

    /**
     * Get the validation rules for the controller's actions.
     *
     * @param int|null    $id
     * @param string|null $action
     *
     * @return array
     */
    protected function rules(?int $id = null, ?string $action = null): array
    {
        return [
            "data" => "required|array",
            "landing_id" => "required|exists:landings,id",
        ];
    }
}
