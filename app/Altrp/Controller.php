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
        'table_id',
    ];

    protected $hidden = [
        'validations'
    ];

    public function model()
    {
        return $this->table()->first()->models()->first();
    }

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function sources()
    {
        return $this->hasMany(Source::class);
    }
}
