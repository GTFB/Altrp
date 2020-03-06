<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable =
        ['name', 'title', 'data', 'type', 'author', 'parent'];

    function author() {
        return $this->belongsTo(Author::class);
    }
}
