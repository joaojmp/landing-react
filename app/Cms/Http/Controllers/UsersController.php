<?php

namespace App\Cms\Http\Controllers;

use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Src\Users\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use App\Cms\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class UsersController extends Controller
{
    /**
     * The validation attributes.
     *
     * @var array
     */
    protected array $validationAttributes = [
        "photo" => "foto",
        "name" => "nome",
        "email" => "e-mail",
        "password" => "senha",
    ];

    /**
     * Controller constructor.
     *
     * @param UserService $service
     */
    public function __construct(UserService $service)
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
            "photo" => "nullable|mimes:jpg,jpeg,png,webp|max:2000",
            "name" => "required|max:191",
            "email" => "required|email|max:191",
            "password" => ($action === "create" ? "required" : "nullable") . "|string|min:8|max:100|confirmed",
        ];
    }

    /**
     * Get the base path for the controller.
     *
     * @return string
     */
    protected function path(): string
    {
        return "Users";
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $response = [];
        $objects = $this->service->latest()->get()->filter(function ($object) {
            if (explode('@', $object->email)[1] === 'agenciakombi.com.br' && !$this->service->find(auth()->id())->isKombi()) {
                return false;
            }

            return true;
        });

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
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * 
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request = $this->hasBase64($request);

        $this->validateByType($request, "create");

        $this->email($request->email);

        try {
            $object = $this->service->create($request->all());

            return $this->sendStoreResponse($object->id);
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                dd($e);
            } else {
                Log::error($e->getMessage());
            }

            return $this->backWithError($e->getCode() === 1 ? $e->getMessage() : "Não foi possível adicionar.");
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

        $this->validateByType($request, "update", $id);

        $this->email($request->email, $id);

        try {
            $object = $this->service->update($request->all(), $id);

            return $this->sendUpdateResponse($object->id);
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
     * Check if an email is already registered in the system, optionally excluding a specific user ID.
     *
     * This method queries the underlying service to retrieve all users and filters them based on the provided email.
     * If an optional user ID is provided, it ensures that the email is not associated with that user.
     *
     * If the email is found in the system (and not associated with the provided user ID), a ValidationException is thrown
     * with a message indicating that the email is already registered.
     *
     * @param string $email The email address to check for existence.
     * @param int|null $id The optional user ID to exclude from the check.
     *
     * @throws ValidationException
     */
    protected function email(string $email, int $id = null): void
    {
        $user = $this->service->all()->filter(function ($item) use ($email, $id) {
            if ($id) {
                return $item->email === $email && $item->id !== $id;
            } else {
                return $item->email === $email;
            }
        })->first();

        if ($user) {
            throw ValidationException::withMessages([
                "email" => "E-mail já cadastrado.",
            ]);
        }
    }
}
