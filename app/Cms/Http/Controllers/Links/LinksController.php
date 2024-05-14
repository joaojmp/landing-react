<?php

namespace App\Cms\Http\Controllers\Links;

use Inertia\Inertia;
use Inertia\Response;
use Src\Links\Enums\Icon;
use Src\Links\Enums\Type;
use Src\Links\LinkService;
use App\Cms\Http\Controllers\Controller;

class LinksController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "active" => "ativo",
        "type" => "tipo",
        "title" => "título",
        "link" => "link",
        "icon" => "ícone",
        "image" => "imagem",
    ];

    /**
     * Controller constructor.
     *
     * @param LinkService $service
     */
    public function __construct(LinkService $service)
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
            "active" => "required|boolean",
            "type" => "required|integer|in:" . join(",", Type::toArray()),
            "title" => "required|string|max:191",
            "value" => "required|string",
            "icon" => "nullable|integer|in:" . join(",", Icon::toArray()),
            "image" => "nullable|mimes:jpg,jpeg,png,webp|max:5000",
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Links";
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $response = [];
        $objects = $this->service->get();

        if ($objects) {
            $response['objects'] = $objects;
        }

        if (!empty($this->includes)) {
            foreach ($this->includes as $attribute => $model) {
                $response[$attribute] = $model::all();
            }
        }

        $response['types'] = Type::getAll();
        $response['icons'] = Icon::getAll();

        return Inertia::render($this->path() . '/All', $response);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * 
     * @return Response
     */
    public function edit(int $id): Response
    {
        $response = [];
        $object = $this->service->find($id);

        if ($object) {
            $response['object'] = $object;
        }

        if (!empty($this->includes)) {
            foreach ($this->includes as $attribute => $model) {
                $response[$attribute] = $model::all();
            }
        }

        $response['types'] = Type::getAll();
        $response['icons'] = Icon::getAll();

        return Inertia::render($this->path() . '/Edit', $response);
    }
}
