<?php

namespace App\Cms\Http\Controllers;

use Exception;
use Src\Service;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\File;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use App\Core\Http\Controllers\Controller as BaseController;

/**
 * Class Controller
 *
 * Base controller for CMS-related operations.
 *
 * @package App\Cms\Http\Controllers
 */
abstract class Controller extends BaseController
{
    /**
     * The service instance for interacting with data.
     *
     * @var Service
     */
    protected Service $service;

    /**
     * Array of model relationships to include in responses.
     *
     * @var array
     */
    protected array $includes = [];

    /**
     * Controller constructor.
     *
     * @param Service $service
     */
    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    abstract protected function path(): string;

    /**
     * Redirect to the index page with success message after storing data.
     *
     * @return RedirectResponse
     */
    protected function sendStoreResponse(): RedirectResponse
    {
        return $this->backWithSuccess('Adicionado com sucesso.');
    }

    /**
     * Redirect to the index page with success message after updating data.
     *
     * @return RedirectResponse
     */
    protected function sendUpdateResponse(): RedirectResponse
    {
        return $this->backWithSuccess('Atualizado com sucesso.');
    }

    /**
     * Redirect to the index page with success message after destroying data.
     *
     * @return RedirectResponse
     */
    protected function sendDestroyResponse(): RedirectResponse
    {
        return $this->backWithSuccess('Removido com sucesso.');
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

        return Inertia::render($this->path() . '/All', $response);
    }

    /**
     * Redirect to the edit page for a specific resource.
     *
     * @param int $id
     * 
     * @return RedirectResponse
     */
    public function show(int $id): RedirectResponse
    {
        return redirect($this->path() . '/' . $id . '/edit');
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

        return Inertia::render($this->path() . '/Edit', $response);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * 
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request = $this->hasBase64($request);

        $this->validateByType($request, 'create');

        try {
            $this->service->create($request->all());

            return $this->sendStoreResponse();
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : 'Não foi possível adicionar.');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * 
     * @return RedirectResponse
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $request = $this->hasBase64($request);

        $this->validateByType($request, 'update', $id);

        try {
            $this->service->update($request->all(), $id);

            return $this->sendUpdateResponse();
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : 'Não foi possível atualizar.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * 
     * @return RedirectResponse
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->service->delete($id);

            return $this->sendDestroyResponse();
        } catch (Exception $e) {
            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : 'Não foi possível remover.');
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
    public function destroyFile(int $id, string $file): RedirectResponse
    {
        try {
            $this->service->deleteOneFile($id, $file);

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
     * Process the request data to handle base64-encoded images.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Request
     */
    protected function hasBase64(Request $request): Request
    {
        $result = [];
        $this->processBase64Values($request->all(), $result);
        $request->replace($result);

        return $request;
    }

    /**
     * Recursively process an array, converting base64-encoded images to their binary form.
     *
     * @param array $data
     * @param array &$result
     */
    protected function processBase64Values(array $data, array &$result = [])
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $result[$key] = [];
                $this->processBase64Values($value, $result[$key]);
            } else {
                $result[$key] = $this->isBase64Image($value) ? $this->fromBase64($value) : $value;
            }
        }
    }

    /**
     * Check if a string represents a base64-encoded image.
     *
     * @param string|null $value
     * @return bool
     */
    protected function isBase64Image(?string $value): bool
    {
        return is_string($value) && str_contains($value, 'data:image');
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
