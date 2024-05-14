<?php

namespace App\Cms\Http\Controllers;

use Src\Policies\PolicyService;
use App\Cms\Http\Controllers\Controller;

class PoliciesController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "title" => "título",
        "description" => "descrição",
    ];

    /**
     * Controller constructor.
     *
     * @param PolicyService $service
     */
    public function __construct(PolicyService $service)
    {
        parent::__construct($service);
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
            "title" => "required|string|max:191|unique:policies" . ($action == "create" ? "" : ",title," . $id),
            "description" => "required|array",
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Policies";
    }
}
