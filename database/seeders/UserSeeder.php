<?php

namespace Database\Seeders;

use Src\Users\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        $users = [
            [
                'name' => 'Backend',
                'email' => 'backend@agenciakombi.com.br',
                'password' => 'kombidesign',
                'api_token' => Str::random(25),
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
