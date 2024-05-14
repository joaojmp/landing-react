<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Src\Posts\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::truncate();

        $posts = [
            [
                'slug' => 'teste-post-1',
                'title' => 'Teste post 1',
                'short_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor posuere metus ac tincidunt. Maecenas lacus ex, venenatis eu pharetra nec, volutpat ut magna.',
                'source' => 'Fonte',
                'image' => 'teste-post-1-783b17b2-8b81-4f66-a1f3-f2fe1814073e.webp',
                'date' => now(),
                'subject_id' => 1,
            ],
            [
                'slug' => 'teste-post-2',
                'title' => 'Teste post 2',
                'short_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor posuere metus ac tincidunt. Maecenas lacus ex, venenatis eu pharetra nec, volutpat ut magna.',
                'source' => 'Fonte',
                'image' => 'teste-post-2-6d9814e1-aad2-42dd-a902-069424dfb620.webp',
                'date' => now(),
                'subject_id' => 2,
            ],
            [
                'slug' => 'teste-post-3',
                'title' => 'Teste post 3',
                'short_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor posuere metus ac tincidunt. Maecenas lacus ex, venenatis eu pharetra nec, volutpat ut magna.',
                'source' => 'Fonte',
                'image' => 'teste-post-3-3e8e9529-ada9-4220-8cfc-3784e4a6cb07.webp',
                'date' => now(),
                'subject_id' => 2,
            ]
        ];

        foreach ($posts as $post) {
            Post::insert($post);
        }
    }
}
