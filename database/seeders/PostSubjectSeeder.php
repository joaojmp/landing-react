<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Src\Posts\Models\Subject;

class PostSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Subject::truncate();

        $subjects = [
            [
                'slug' => 'teste-assunto-1',
                'title' => 'Teste assunto 1',
            ],
            [
                'slug' => 'teste-assunto-2',
                'title' => 'Teste assunto 2',
            ]
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }
    }
}
