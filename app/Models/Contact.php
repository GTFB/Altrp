<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'contacts';

    /**
    * The database primary key value.
    *
    * @var string
    */
    protected $primaryKey = 'id';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name','table_id','soft_deletes','fillable'];

    public function medias()
    {
        return $this->hasMany('App\Media', 'media_id');
    }
    
    public function area()
    {
        return $this->hasOne('App\Area', 'area_id', 'id');
    }
    
}
