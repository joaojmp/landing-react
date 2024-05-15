<?php

namespace App\Cms\Http\Controllers;

use Src\Landings\LandingService;
use App\Cms\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LandingsController extends Controller
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
     * @param LandingService $service
     */
    public function __construct(LandingService $service)
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
            "title" => "required|max:191|unique:landings" . ($action === "create" ? "" : ",title," . $id),
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Landings";
    }

    /**
     * Open editor page
     *
     * @return Response|RedirectResponse
     */
    public function editor(int $id): Response|RedirectResponse
    {
        $landing = $this->service->find($id);

        if (!$landing) {
            return redirect()->route('leadings.index');
        }

        return Inertia::render($this->path() . '/Editor', ['landing' => $landing]);
    }
}
