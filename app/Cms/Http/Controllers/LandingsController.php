<?php

namespace App\Cms\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\File;
use Illuminate\Support\Arr;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\RedirectResponse;
use Src\Landings\Services\PageService;
use App\Cms\Http\Controllers\Controller;
use Src\Landings\Services\LandingService;

class LandingsController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "title" => "título da página",
        "description" => "descrição da página",
        "image" => "imagem de compartilhamento",
        "favicon" => "ícone da página",
        "emails" => "e-mails",
        "script_head" => "script tag head",
        "script_body" => "script tag body",
    ];

    /**
     * @param PageService
     */
    protected PageService $pageService;

    /**
     * Controller constructor.
     *
     * @param LandingService $service
     * @param PageService $pageService
     */
    public function __construct(
        LandingService $service,
        PageService $pageService
    ) {
        parent::__construct($service);
        $this->pageService = $pageService;
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
            "description" => "nullable|string",
            "image" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "favicon" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "emails" => "nullable|array",
            "script_head" => "nullable|string",
            "script_body" => "nullable|string",
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
        $landing = $this->service->with(["pages" => function ($query) {
            $query->orderBy("order");
        }])->find($id);

        if (!$landing) {
            return redirect()->route('leadings.index');
        }

        return Inertia::render($this->path() . '/Editor', ['landing' => $landing]);
    }

    /**
     * Clone a landing page
     *
     * @return RedirectResponse
     */
    public function clone(int $id): RedirectResponse
    {
        $landing = $this->service->with("pages")->find($id);

        if (!$landing) {
            return redirect()->route('leadings.index');
        }

        $attributes = $landing->getAttributes();
        unset($attributes["id"]);
        unset($attributes["created_at"]);
        unset($attributes["updated_at"]);

        $attributes["title"] = $attributes["title"] . " (clone)";
        $attributes["slug"] = $attributes["slug"] . "-clone";

        if ($landing->image) {
            $path = public_path("/storage/landings/" . $landing->image);
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $attributes["image"] = self::fromBase64('data:image/' . $type . ';base64,' . base64_encode($data));
        }

        if ($landing->favicon) {
            $path = public_path("/storage/landings/" . $landing->favicon);
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $attributes["favicon"] = self::fromBase64('data:image/' . $type . ';base64,' . base64_encode($data));
        }

        $newLanding = $this->service->create($attributes);

        if ($landing->pages->count()) {
            foreach ($landing->pages as $page) {
                $attributes = $page->getAttributes();
                unset($attributes["id"]);
                unset($attributes["created_at"]);
                unset($attributes["updated_at"]);
                $attributes["landing_id"] = $newLanding->id;

                $this->pageService->create($attributes);
            }
        }

        return redirect()->back();
    }

    /**
     * Convert base64-encoded file data into an UploadedFile instance.
     *
     * @param string $base64File
     * 
     * @return UploadedFile
     */
    protected static function fromBase64(string $base64File): UploadedFile
    {
        $fileData = base64_decode(Arr::last(explode(',', $base64File)));
        $tempFile = tmpfile();
        $tempFilePath = stream_get_meta_data($tempFile)['uri'];

        file_put_contents($tempFilePath, $fileData);

        $tempFileObject = new File($tempFilePath);
        $file = new UploadedFile(
            $tempFileObject->getPathname(),
            $tempFileObject->getFilename(),
            $tempFileObject->getMimeType(),
            0,
            true
        );

        app()->terminating(function () use ($tempFile) {
            fclose($tempFile);
        });

        return $file;
    }
}
