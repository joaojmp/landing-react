@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ $lead->landing->title }}
        @endcomponent
    @endslot

    <p>
        Segue os dados para contato:
    </p>
    <br>
    @foreach ($lead->data as $title => $value)
        <p>
            <b>{{ $title }}:</b> {{ $value }}
        </p>
    @endforeach

    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            <small>
                <em>
                    Este e-mail foi enviado em {{ now()->format('d/m/Y') }} às {{ now()->format('H:i') }}.
                </em>
                <br>
                © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
            </small>
        @endcomponent
    @endslot
@endcomponent
