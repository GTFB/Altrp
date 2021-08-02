<?php

use Illuminate\Database\Seeder;

class SocialTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('social_networks')->insert([
            ['name' => "telegram"],
            ['name' => "google"],
            ['name' => "vkontakte"],
            ['name' => "instagram"],
            ['name' => "twitter"],
            ['name' => "discord"],
            ['name' => "facebook"],
        ]);
    }
}
