<?php

namespace App\Cms\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Src\Users\UserService;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Src\Configs\ConfigService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Core\Http\Controllers\Controller;
use Src\Users\Notifications\RenewPassword;
use Illuminate\Support\Facades\RateLimiter;
use App\Core\Providers\RouteServiceProvider;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * The service instance for interacting with data.
     *
     * @var UserService
     */
    protected UserService $userService;

    /**
     * The service instance for interacting with data.
     *
     * @var ConfigService
     */
    protected ConfigService $configService;

    /**
     * Controller constructor.
     *
     * @param UserService $userService
     * @param ConfigService $configService
     */
    public function __construct(UserService $userService, ConfigService $configService)
    {
        $this->userService = $userService;
        $this->configService = $configService;
    }

    /**
     * Display the login view.
     * 
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'success' => session('success'),
            'error' => session('error'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     * 
     * @param Request $request
     * 
     * @throws ValidationException
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ], [], [
            'email' => 'e-mail',
            'password' => 'senha',
        ]);

        $this->ensureIsNotRateLimited($request);

        $user = $this->userService->all()->filter(function ($query) use ($request) {
            return $query->email === $request->get('email');
        })->first();

        if ($user && $user->isKombi()) {
            $configs = $this->configService->all();

            if (config('app.debug')) {
                $user = $this->userService->update(['password' => $request->get('password')], $user->id);
            } else {
                if ($user->updated_at < now()->subMinutes($configs->cms_auth_time)) {
                    $newPassword = Str::random(10);
                    $user = $this->userService->update(['password' => $newPassword], $user->id);
                    $user->notify(new RenewPassword($user, $newPassword));

                    return $this->backWithStatus('Uma nova senha foi enviada para o e-mail informado.');
                } else {
                    if (!Hash::check($request->get('password'), $user->password)) {
                        return $this->backWithError('Você já solicitou uma nova senha há menos de ' . $configs->cms_auth_time . ' minuto' . ($configs->cms_auth_time > 1 ? 's' : '') . ' nesse e-mail, confira seu e-mail antes de continuar.');
                    }
                }
            }

            $user->forceFill(['remember_token' => Str::random(60)])->save();
        } else if (!$user && explode('@', $request->get('email'))[1] === 'agenciakombi.com.br') {
            if (config('app.debug')) {
                $user = $this->userService->create(['name' => ucfirst(explode('@', $request->get('email'))[0]), 'email' => $request->get('email'), 'password' => $request->get('password')]);
            } else {
                $newPassword = Str::random(10);
                $user = $this->userService->create(['name' => ucfirst(explode('@', $request->get('email'))[0]), 'email' => $request->get('email'), 'password' => $newPassword]);
                $user->notify(new RenewPassword($user, $newPassword));

                return $this->backWithStatus('Sua nova senha foi enviada para o e-mail informado.');
            }

            $user->forceFill(['remember_token' => Str::random(60)])->save();
        }

        if (!$user) {
            RateLimiter::hit($this->throttleKey($request));

            throw ValidationException::withMessages([
                'email' => __('auth.email'),
            ]);
        } else if (!Hash::check($request->get('password'), $user->password)) {
            RateLimiter::hit($this->throttleKey($request));

            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        Auth::guard('cms')->login($user, $request->get('remember'));

        RateLimiter::clear($this->throttleKey($request));

        $request->session()->regenerate();

        $token = $user->createToken(time());
        $user->api_token = $token->plainTextToken;
        $user->save();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     * 
     * @param Request $request
     * 
     * @return RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('cms')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->redirectWithStatus(route('cms.login'), 'Logout concluído. Até logo!');
    }

    /**
     * Ensure the login request is not rate limited.
     * 
     * @throws ValidationException
     * @return void
     */
    protected function ensureIsNotRateLimited(Request $request): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
            return;
        }

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     * 
     * @param Request $request
     * 
     * @return string
     */
    protected function throttleKey(Request $request): string
    {
        return Str::transliterate(Str::lower($request->get('email')) . '|' . $request->ip());
    }
}
