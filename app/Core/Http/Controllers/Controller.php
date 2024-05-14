<?php

namespace App\Core\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * Class Controller
 *
 * @package App\Core\Http\Controllers
 */
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [];

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
        return [];
    }

    /**
     * Validate the request data based on the specified rules and attributes.
     *
     * @param Request     $request
     * @param string|null $action
     * @param int|null    $id
     *
     * @return void
     */
    protected function validateByType(Request $request, ?string $action = null, ?int $id = null): void
    {
        $request->validate(
            $this->rules($id, $action),
            [],
            $this->validationAttributes
        );
    }

    /**
     * Redirect to the specified route with a success message.
     *
     * @param string $to
     * @param string $message
     *
     * @return RedirectResponse
     */
    protected function redirectWithSuccess(string $to, string $message): RedirectResponse
    {
        return redirect($to)->with('success', $message);
    }

    /**
     * Redirect to the specified route with an error message.
     *
     * @param string $to
     * @param string $message
     *
     * @return RedirectResponse
     */
    protected function redirectWithError(string $to, string $message): RedirectResponse
    {
        return redirect($to)->with('error', $message);
    }

    /**
     * Redirect to the specified route with a status message.
     *
     * @param string $to
     * @param string $message
     *
     * @return RedirectResponse
     */
    protected function redirectWithStatus(string $to, string $message): RedirectResponse
    {
        return redirect($to)->with('status', $message);
    }

    /**
     * Redirect back with a success message.
     *
     * @param string $message
     *
     * @return RedirectResponse
     */
    protected function backWithSuccess(string $message): RedirectResponse
    {
        return back()->with('success', $message);
    }

    /**
     * Redirect back with an error message.
     *
     * @param string $message
     *
     * @return RedirectResponse
     */
    protected function backWithError(string $message): RedirectResponse
    {
        return back()->with('error', $message);
    }

    /**
     * Redirect back with a status message.
     *
     * @param string $message
     *
     * @return RedirectResponse
     */
    protected function backWithStatus(string $message): RedirectResponse
    {
        return back()->with('status', $message);
    }

    /**
     * Return a JSON response with the given data, status, and headers.
     *
     * @param mixed $data
     * @param int   $status
     * @param array $headers
     *
     * @return JsonResponse
     */
    public function json(mixed $data, int $status = 200, array $headers = []): JsonResponse
    {
        return response()->json($data, $status, $headers);
    }

    /**
     * Return a `No Content` response with the given headers.
     *
     * @param array $headers
     *
     * @return Response
     */
    public function noContent(array $headers = []): Response
    {
        return response(null, 204, $headers);
    }

    /**
     * Return a `Bad Request` response with the given content and headers.
     *
     * @param string $content
     * @param array  $headers
     *
     * @return Response
     */
    public function badRequest(string $content = '', array $headers = []): Response
    {
        return response($content, 400, $headers);
    }

    /**
     * Get the message from the given exception or a default message.
     *
     * @param Exception $e
     * @param string    $default
     *
     * @return string
     */
    protected function getMessage(Exception $e, string $default): string
    {
        return $e->getCode() === 1 ? $e->getMessage() : $default;
    }
}
