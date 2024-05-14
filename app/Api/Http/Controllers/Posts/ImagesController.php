<?php

namespace App\Api\Http\Controllers\Posts;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Src\Posts\Services\ImageService;
use App\Api\Http\Controllers\Controller;

class ImagesController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "name" => "imagem",
        "legend" => "legenda",
    ];

    /**
     * Controller constructor.
     *
     * @param ImageService $service The service instance for handling business logic.
     */
    public function __construct(ImageService $service)
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
            "name" => ($action === "create" ? "required" : "nullable") . "|mimes:jpg,jpeg,png,webp|max:2000",
            "legend" => "required|string|max:191",
        ];
    }

    /**
     * Reorder function based on the provided IDs.
     *
     * @param Request  $request
     * 
     * @return Response
     */
    public function reorder(Request $request): Response
    {
        try {
            $this->service->reorder($request->all());

            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->badRequest("Não foi possível reordenar as imagens.");
        }
    }
}
