<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Model extends EloquentModel
{
    protected $table = 'altrp_models';

    public function table()
    {
        return $this->belongsTo(Table::class);
    }
}
