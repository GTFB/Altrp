<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Altrp\Table;

class Controller extends EloquentModel
{
    protected $table = 'altrp_controllers';

    public function model()
    {
        return $this->belongsTo(Model::class);
    }
    
    public function table()
    {
        return $this->belongsTo(Table::class);
    }
}
