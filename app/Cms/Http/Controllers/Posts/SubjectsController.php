<?php

namespace App\Cms\Http\Controllers\Posts;

use Src\Posts\Services\SubjectService;
use App\Cms\Http\Controllers\Controller;

class SubjectsController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "title" => "título",
    ];

    /**
     * Controller constructor.
     *
     * @param SubjectService $service
     */
    public function __construct(SubjectService $service)
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
            "title" => "required|max:191|unique:post_subjects" . ($action === "create" ? "" : ",title," . $id),
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Posts/Subjects";
    }
}
