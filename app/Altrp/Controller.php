<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Controller extends EloquentModel
{
    protected $table = 'altrp_controllers';

    public function model()
    {
        return $this->belongsTo(Model::class);
    }
}
