<?php

namespace App\Cms\Http\Controllers\Configs;

use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Src\Configs\ConfigService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Http\File as HttpFile;
use Illuminate\Http\RedirectResponse;
use Intervention\Image\Facades\Image;
use App\Core\Http\Controllers\Controller;

class WhatsappController extends Controller
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

        return Inertia::render("Configs/Whatsapp", ["configs" => $configs]);
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
            "whatsapp_icon" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "whatsapp_active" => "required|boolean",
            "whatsapp_numbers" => "required|array",
            "whatsapp_numbers.*" => "required|string",
        ], [], [
            "whatsapp_icon" => "ícone do whatsapp",
            "whatsapp_active" => "whatsapp ativo",
            "whatsapp_numbers" => "números do whatsapp",
            "whatsapp_numbers.*" => "número do whatsapp",
        ]);

        try {
            if ($request->has("whatsapp_icon") && $request->get("whatsapp_icon") != null) {
                $pathname = public_path("images") . "/whatsapp_icon.webp";
                File::delete($pathname);
                Image::make($request->whatsapp_icon)->encode("webp")->save($pathname);
                Image::make($request->whatsapp_icon)->encode("webp")->pixelate(8)->save($pathname . ".blur.webp");
            }

            $this->service->update("whatsapp_active", $request->whatsapp_active);
            $this->service->update("whatsapp_numbers", implode(',', $request->whatsapp_numbers));

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
