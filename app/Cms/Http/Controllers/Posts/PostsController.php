<?php

namespace App\Cms\Http\Controllers\Posts;

use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Src\Posts\Services\PostService;
use Illuminate\Http\RedirectResponse;
use Src\Posts\Services\SubjectService;
use App\Cms\Http\Controllers\Controller;
use Src\Posts\Services\DescriptionService;

class PostsController extends Controller
{
    /**
     * Array of model relationships to include in responses.
     *
     * @var array
     */
    protected array $includes = [
        "subjects" => SubjectService::class,
    ];

    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "title" => "título",
        "short_description" => "breve descrição",
        "source" => "fonte",
        "image" => "imagem",
        "date" => "data",
        "subject_id" => "assunto",

        "descriptions" => "descrições",
        "descriptions.*.title" => "título",
        "descriptions.*.image" => "imagem",
        "descriptions.*.url" => "vídeo",
        "descriptions.*.description" => "descrição",
    ];

    /**
     * @var DescriptionService
     */
    protected DescriptionService $descriptionService;

    /**
     * Controller constructor.
     *
     * @param PostService $service
     * @param DescriptionService $descriptionService
     */
    public function __construct(
        PostService $service,
        DescriptionService $descriptionService
    ) {
        parent::__construct($service);
        $this->descriptionService = $descriptionService;
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
            "title" => "required|max:191|unique:posts" . ($action === "create" ? "" : ",title," . $id),
            "short_description" => "nullable|string",
            "source" => "nullable|string|max:191",
            "image" => ($action === "create" ? "required" : "nullable") . "|mimes:jpg,jpeg,png,webp|max:2000",
            "date" => "required|date",
            "subject_id" => "required|exists:post_subjects,id",

            "descriptions" => "nullable|array",
            "descriptions.*.title" => "nullable|string|max:191",
            "descriptions.*.image" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "descriptions.*.url" => "nullable|url|max:255",
            "descriptions.*.description" => "nullable|string",
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Posts";
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $response = [];
        $objects = $this->service->with("subject")->orderByDesc("date")->get();

        if ($objects) {
            $response["objects"] = $objects;
        }

        if (!empty($this->includes)) {
            foreach ($this->includes as $attribute => $model) {
                $response[$attribute] = $model::all();
            }
        }

        return Inertia::render($this->path() . "/All", $response);
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
        $object = $this->service->with(["subject", "descriptions" => function ($query) {
            $query->orderBy("order");
        }, "images" => function ($query) {
            $query->orderBy("order");
        }])->find($id);

        if ($object) {
            $object->descriptions = $object->descriptions->filter(function ($description) {
                $description->old_image = $description->image;
                $description->image = '';

                return $description;
            });

            $response["object"] = $object;
        }

        if (!empty($this->includes)) {
            foreach ($this->includes as $attribute => $model) {
                $response[$attribute] = $model::all();
            }
        }

        return Inertia::render($this->path() . "/Edit", $response);
    }

    /**
     * Remove a specific file associated with a resource.
     *
     * @param int $id
     * @param string $file
     * 
     * @return RedirectResponse
     */
    public function destroyDescriptionsFile(int $id, string $file): RedirectResponse
    {
        try {
            $this->descriptionService->deleteOneFile($id, $file);

            return $this->backWithSuccess('success', 'Removido com sucesso');
        } catch (Exception $e) {
            DB::rollback();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e);
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : 'Erro ao remover.');
        }
    }
}
