<?php

namespace App\Cms\Http\Controllers\Links;

use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Arr;
use Src\Links\Enums\Border;
use Illuminate\Http\Request;
use Src\Configs\ConfigService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Http\File as HttpFile;
use Illuminate\Http\RedirectResponse;
use App\Core\Http\Controllers\Controller;

class ConfigsController extends Controller
{
    /**
     * The service instance for interacting with data.
     *
     * @var ConfigService
     */
    protected ConfigService $service;

    /**
     * Controller constructor.
     *
     * @param ConfigService $service
     */
    public function __construct(ConfigService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $configs = $this->service->all();
        $borders = Border::getAll();

        return Inertia::render("Links/Configs/Index", ["configs" => $configs, "borders" => $borders]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * 
     * @return RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        $request = self::hasBase64($request);

        $request->validate([
            "links_logo" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "links_background" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "links_background_color" => "required|string",
            "links_button_border" => "required|string",
            "links_button_color" => "required|string",
            "links_button_hover_color" => "required|string",
            "links_button_font_color" => "required|string",
            "links_button_font_hover_color" => "required|string",
            "links_description" => "nullable|string",
            "links_description_color" => "required|string",
        ], [], [
            "links_logo" => "logo",
            "links_background" => "imagem de background",
            "links_background_color" => "cor de fundo",
            "links_button_border" => "Estilo da borda do botão",
            "links_button_color" => "cor do botão",
            "links_button_hover_color" => "cor do botão com mouse em cima",
            "links_button_font_color" => "cor do texto do botão",
            "links_button_font_hover_color" => "cor do texto do botão com mouse em cima",
            "links_description" => "descrição",
            "links_description_color" => "cor da descrição",
        ]);

        try {
            if ($request->has("links_logo") && $request->get("links_logo") != null) {
                File::delete(public_path("images") . "/links/" . $request->old_links_logo);
                $name = "links_logo.webp";
                $request->links_logo->move(public_path("images") . "/links/", $name);
                $this->service->update("links_logo", $name);
            }

            if ($request->has("links_background") && $request->get("links_background") != null) {
                File::delete(public_path("images") . "/links/" . $request->old_links_background);
                $name = "links_background.webp";
                $request->links_background->move(public_path("images") . "/links/", $name);
                $this->service->update("links_background", $name);
            }

            $this->service->update("links_background_color", $request->links_background_color);
            $this->service->update("links_button_border", $request->links_button_border);
            $this->service->update("links_button_color", $request->links_button_color);
            $this->service->update("links_button_hover_color", $request->links_button_hover_color);
            $this->service->update("links_button_font_color", $request->links_button_font_color);
            $this->service->update("links_button_font_hover_color", $request->links_button_font_hover_color);
            $this->service->update("links_description", $request->links_description);
            $this->service->update("links_description_color", $request->links_description_color);

            return $this->backWithSuccess("Atualizado com sucesso.");
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : "Não foi possível atualizar.");
        }
    }

    /**
     * Remove a specific file associated with a resource.
     *
     * @param int $id
     * @param string $file
     * 
     * @return RedirectResponse
     */
    public function destroyFile(string $file): RedirectResponse
    {
        try {
            $pathname = public_path("images/links") . "/" . $file . ".webp";
            File::delete($pathname);
            File::delete(str_replace(".webp", ".blur.webp", $pathname));

            $this->service->update($file, null);

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

    /**
     * Check if the request has base64-encoded images and replace them with UploadedFile instances.
     *
     * @param Request $request
     * 
     * @return Request
     */
    protected function hasBase64(Request $request): Request
    {
        foreach ($request->all() as $key => $value) {
            if ($value && is_string($value) && str_contains($value, 'data:image')) {
                $request->merge([$key => self::fromBase64($value)]);
            }
        }

        return $request;
    }

    /**
     * Convert base64-encoded file data into an UploadedFile instance.
     *
     * @param string $base64File
     * 
     * @return UploadedFile
     */
    protected function fromBase64(string $base64File): UploadedFile
    {
        $fileData = base64_decode(Arr::last(explode(',', $base64File)));
        $tempFile = tmpfile();
        $tempFilePath = stream_get_meta_data($tempFile)['uri'];

        file_put_contents($tempFilePath, $fileData);

        $tempFileObject = new HttpFile($tempFilePath);
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
