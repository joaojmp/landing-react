<?php

namespace App\Cms\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Src\Users\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Password;
use App\Core\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
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
     * Display the password reset link request view.
     * 
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'success' => session('success'),
            'error' => session('error'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     * 
     * @param Request $request
     * 
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ], [], [
            'email' => 'e-mail'
        ]);

        $user = $this->userService->all()->filter(function ($query) use ($request) {
            return $query->email === $request->email;
        })->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => [trans(Password::INVALID_USER)],
            ]);
        }

        if (Password::getRepository()->recentlyCreatedToken($user)) {
            throw ValidationException::withMessages([
                'email' => [trans(Password::RESET_THROTTLED)],
            ]);
        }

        $user->sendPasswordResetNotification(
            Password::getRepository()->create($user)
        );

        return $this->backWithSuccess(trans(Password::RESET_LINK_SENT));
    }
}
