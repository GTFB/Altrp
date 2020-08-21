<?php

use App\Altrp\Model;
use Illuminate\Database\Seeder;

class AltrpModelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $model = [
            'name' => 'User',
            'soft_deletes' => 0,
            'time_stamps' => 0,
            'fillable_cols' => 'name,email,password,last_name',
            'user_cols' => null,
            'path' => null,
            'table_id' => 1,
            'pk' => 'id',
            'desc' => null,
        ];

        Model::create($model);
    }
}
