<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class AltrpDiagram extends Model
{
    protected $table = 'altrp_diagrams';

    public $timestamps = false;

    protected $fillable = [
        'settings',
        'author',
        'title'
    ];
}
