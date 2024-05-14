@php
    $meta_image = isset($page['props']) && $page['props']['page'] ? asset('storage/pages/' . $page['props']['page']['image']) : asset('images/' . $configs->sharing_image);
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('web::_metas-head')

    @include('web::_css')

    <!-- Scripts -->
    @routes(nonce: Vite::cspNonce())
    @viteReactRefresh
    @vite(['app/Web/resources/js/app.tsx', "app/Web/resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead

    {!! str_replace('"', "'", $configs->scripts_head(Vite::cspNonce())) !!}
</head>

<body class="font-sans antialiased">
    {!! str_replace('"', "'", $configs->scripts_body(Vite::cspNonce())) !!}

    @inertia
</body>

</html>
