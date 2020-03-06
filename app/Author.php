<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable =
        ['name'];

    public function template() {
        return $this->hasMany(Template::class);
    }

}
