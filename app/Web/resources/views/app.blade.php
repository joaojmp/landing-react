@php
    $meta_image = (isset($landing) && $landing->image ? asset('storage/landings/' . $landing->image) : asset('images/sharing_image.webp')) . '?id=' . time();
    $favicon = (isset($landing) && $landing->favicon ? asset('storage/landings/' . $landing->favicon) : asset('images/favicon.webp')) . '?id=' . time();
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('web::_metas-head')

    @isset($landing)
        <style rel="preload stylesheet">
            {!! $landing->css !!}
        </style>
    @endisset

    <!-- Scripts -->
    @routes(nonce: Vite::cspNonce())
    @viteReactRefresh
    @vite(['app/Web/resources/js/app.tsx', "app/Web/resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead

    @isset($landing)
        {!! $landing->script_head !!}
    @endisset
</head>

{!! $landing->body ?? '<body>' !!}
@isset($landing)
    {!! $landing->script_body !!}
@endisset

@inertia
</body>

</html>
