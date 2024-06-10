@php
    $meta_image = (isset($content->landing) && $content->landing->image ? asset('storage/landings/' . $content->landing->image) : asset('images/sharing_image.webp')) . '?id=' . time();
    $favicon = (isset($content->landing) && $content->landing->favicon ? asset('storage/landings/' . $content->landing->favicon) : asset('images/favicon.webp')) . '?id=' . time();
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('web::_metas-head')

    @isset($content->pages)
        <style rel="preload stylesheet">
            {!! $content->page->css !!}
        </style>
    @endisset

    <!-- Scripts -->
    @routes(nonce: Vite::cspNonce())
    @viteReactRefresh
    @vite(['app/Web/resources/js/app.tsx', "app/Web/resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead

    @isset($content->landing)
        {!! $content->landing->script_head !!}
    @endisset
</head>

{!! $content->page->body ?? '<body>' !!}
@isset($content->landing)
    {!! $content->landing->script_body !!}
@endisset

@inertia
</body>

</html>
