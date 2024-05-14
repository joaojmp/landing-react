<?php

namespace App\Cms\Http\Controllers;

use Src\Pages\PageService;
use App\Cms\Http\Controllers\Controller;

class PagesController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "url" => "url de acionamento",
        "title" => "título",
        "description" => "descrição",
        "image" => "imagem de compartilhamento",
    ];

    /**
     * Controller constructor.
     *
     * @param PageService $service
     */
    public function __construct(PageService $service)
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
            "url" => "required|url|max:255",
            "title" => "nullable|string|min:50|max:60",
            "description" => "nullable|string|min:50|max:160",
            "image" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Pages";
    }
}
