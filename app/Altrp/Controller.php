<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Controller extends EloquentModel
{
    protected $table = 'altrp_controllers';

    protected $fillable = [
        'description',
        'namespace',
        'prefix',
        'relations',
        'model_id',
    ];

    protected $hidden = [
        'validations'
    ];

    public function model()
    {
        return $this->belongsTo(Model::class, 'model_id', 'id');
    }

    public function table()
    {
        return $this->model->table;
    }

    public function sources()
    {
        return $this->hasMany(Source::class);
    }
}
