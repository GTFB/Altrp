<?php

namespace App\Constructor;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable =
        ['name', 'title', 'data', 'type', 'user_id'];
    
    
    public function history() {
        return $this->hasMany(TemplateHistory::class);
    }
}
