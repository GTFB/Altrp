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
        'validations'
    ];

    public function setValidationsAttribute($validationRules)
    {
        $validationArr = [];
        if ((array) $validationRules) {
            foreach ($validationRules as $name => $rules) {
                $rules = (array) $rules;
                if (! empty($rules)) {
                    $validationArr[] = $name . '#' . implode('|', $rules);
                }
            }
        }
        $this->attributes['validations'] = implode(';', $validationArr);
    }

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
