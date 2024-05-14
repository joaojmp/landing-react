<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Src\Banners\Banner;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Banner::truncate();

        $banners = [
            [
                'title' => 'Banner 1',
                'link' => 'https://agenciakombi.com.br',
                'desktop' => 'banner-1-jzsy4a1bzu9recq.webp',
                'tablet' => null,
                'mobile' => null
            ]
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}
