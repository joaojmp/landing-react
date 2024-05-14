<?php

namespace App\Cms\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Src\Users\UserService;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Password;
use App\Core\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Validation\Rules\Password as PasswordRules;

class NewPasswordController extends Controller
{
    /**
     * The service instance for interacting with data.
     *
     * @var UserService
     */
    protected UserService $userService;

    /**
     * Controller constructor.
     *
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display the password reset view.
     * 
     * @param Request $request
     * 
     * @return Response
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     * 
     * @param Request $request
     *
     * @throws ValidationException
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', PasswordRules::defaults()],
        ], [], [
            'email' => 'e-mail',
            'password' => 'senha',
        ]);

        $user = $this->userService->all()->filter(function ($query) use ($request) {
            return $query->email === $request->email;
        })->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => [trans(Password::INVALID_USER)],
            ]);
        }

        if (!Password::getRepository()->exists($user, $request->token)) {
            throw ValidationException::withMessages([
                'email' => [trans(Password::INVALID_TOKEN)],
            ]);
        }

        if (!$user instanceof CanResetPassword) {
            return $user;
        }

        $this->userService->update([
            "password" => $request->password,
            "remember_token" => Str::random(60),
        ], $user->id);

        Password::getRepository()->delete($user);

        return $this->redirectWithSuccess(route('cms.login'), trans(Password::PASSWORD_RESET));
    }
}
