<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Page;
use Faker\Generator as Faker;

$factory->define(Page::class, function (Faker $faker) {
    $name = 'test' . $faker->randomNumber();
    return [
        'title' => $name,
        'author' => 14,
        'content' => '',
        'path' => '/' . $name,
        'guid' => $faker->uuid
    ];
});
