<?php

use App\Altrp\Table;
use Illuminate\Database\Seeder;

class AltrpTablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $table = [
            'name' => 'users',
            'title' => 'users',
            'user_id' => auth()->user()->id,
        ];

        Table::create($table);
    }
}
