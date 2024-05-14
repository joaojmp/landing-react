@php
    $today = \Carbon\Carbon::today()->toDateString();
    $views = ['sobre', 'blog', 'contato', 'links'];
@endphp

<?= '<?xml version="1.0" encoding="UTF-8"?>' ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>{{ url('') }}</loc>
        <lastmod>{{ $today }}</lastmod>
        <changefreq>weekly</changefreq>
    </url>

    @foreach ($views as $view)
        <url>
            <loc>{{ url($view) }}</loc>
            <lastmod>{{ $today }}</lastmod>
            <changefreq>weekly</changefreq>
        </url>
    @endforeach

    @foreach ($policies as $policy)
        <url>
            <loc>{{ route('web.policy', $policy->slug) }}</loc>
            <lastmod>{{ $policy->updated_at ? $policy->updated_at->tz('UTC')->toAtomString() : $today }}</lastmod>
            <changefreq>weekly</changefreq>
        </url>
    @endforeach
</urlset>
