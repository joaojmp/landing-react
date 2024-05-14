<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\PostSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\BannerSeeder;
use Database\Seeders\ConfigSeeder;
use Database\Seeders\PolicySeeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\PostSubjectSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $this->call(ConfigSeeder::class);
        $this->call(BannerSeeder::class);
        $this->call(PolicySeeder::class);
        $this->call(PostSubjectSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(UserSeeder::class);

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
