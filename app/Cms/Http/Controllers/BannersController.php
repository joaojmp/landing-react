<?php

namespace App\Cms\Http\Controllers;

use Src\Banners\BannerService;
use App\Cms\Http\Controllers\Controller;

class BannersController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "title" => "título",
        "link" => "link",
        "desktop" => "banner desktop",
        "tablet" => "banner tablet",
        "mobile" => "banner mobile",
    ];

    /**
     * Controller constructor.
     *
     * @param BannerService $service
     */
    public function __construct(BannerService $service)
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
            "title" => "required|string|max:191",
            "link" => "nullable|url|max:255",
            "desktop" => ($action === "create" ? "required" : "nullable") . "|mimes:jpg,jpeg,png,webp|max:2000",
            "tablet" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "mobile" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Banners";
    }
}
