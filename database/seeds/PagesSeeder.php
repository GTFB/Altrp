<?php

use Illuminate\Database\Seeder;
use App\Page;

class PagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::withoutEvents(function () {
            factory(\App\Page::class, 400)->create();
        });
    }
}
