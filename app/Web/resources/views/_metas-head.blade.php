<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="utf-8">
<base href="{{ config('app.url') }}">

<title inertia>{{ config('app.name', 'Laravel') }}</title>

<link rel="shortcut icon" href="{{ asset('images/favicon.webp') . '?id=' . time() }}">
<link rel="apple-touch-icon" href="{{ asset('images/favicon.webp') . '?id=' . time() }}" />

<link rel="canonical" href="{{ request()->url() }}">
<meta name="csrf-token" content="{{ csrf_token() }}">

<meta name="rating" content="general" />
<meta name="classification" content="website" />
<meta name="robots" content="all" />
<meta name="googlebot" content="all" />
<meta name="content-language" content="pt-br" />
<meta name="revisit-after" content="10 days" />
<meta name="DC.author" content="{{ config('app.name') }}" />
<meta name="DC.publisher" content="{{ config('app.name') }}" />
<meta name="twitter:card" content="summary">

<meta property="og:type" content="website" />
<meta property="og:url" content="{{ request()->url() }}" />
<meta property="og:site_name" content="{{ config('app.name') }}" />

<meta property="business:contact_data:website" content="{{ config('app.url') }}" />
