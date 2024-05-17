<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('web::_metas-head')

    <style rel="preload stylesheet">
        {{ $landing->css }}
    </style>

    <!-- Scripts -->
    @routes(nonce: Vite::cspNonce())
    @viteReactRefresh
    @vite(['app/Web/resources/js/app.tsx', "app/Web/resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body id="imog" class="font-sans antialiased">
    @inertia
</body>

</html>
