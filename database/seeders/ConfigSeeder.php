<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Src\Configs\Config;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Config::truncate();

        $configs = [
            [
                'name' => 'maintenance_secret',
                'content' => null
            ],
            [
                'name' => 'cms_auth_time',
                'content' => 5
            ],
            [
                'name' => 'policy',
                'content' => false
            ],
            [
                'name' => 'contact_email',
                'content' => 'backend@agenciakombi.com.br'
            ],
            [
                'name' => 'whatsapp_active',
                'content' => true
            ],
            [
                'name' => 'whatsapp_icon',
                'content' => 'whatsapp_icon.webp'
            ],
            [
                'name' => 'whatsapp_numbers',
                'content' => '+55 (15) 6556-76576'
            ],
            [
                'name' => 'scripts_head',
                'content' => null
            ],
            [
                'name' => 'scripts_body',
                'content' => null
            ],
            [
                'name' => 'logo',
                'content' => 'logo.webp'
            ],
            [
                'name' => 'favicon',
                'content' => 'favicon.webp'
            ],
            [
                'name' => 'sharing_image',
                'content' => 'sharing_image.webp'
            ],
            [
                'name' => 'links_logo',
                'content' => null,
            ],
            [
                'name' => 'links_background',
                'content' => null,
            ],
            [
                'name' => 'links_background_color',
                'content' => '#cccccc',
            ],
            [
                'name' => 'links_button_border',
                'content' => 0,
            ],
            [
                'name' => 'links_button_color',
                'content' => '#ebebeb',
            ],
            [
                'name' => 'links_button_hover_color',
                'content' => '#ffffff',
            ],
            [
                'name' => 'links_button_font_color',
                'content' => '#ffffff',
            ],
            [
                'name' => 'links_button_font_hover_color',
                'content' => '#ebebeb',
            ],
            [
                'name' => 'links_description',
                'content' => null,
            ],
            [
                'name' => 'links_description_color',
                'content' => '#ffffff',
            ],
        ];

        foreach ($configs as $config) {
            Config::create($config);
        }
    }
}
