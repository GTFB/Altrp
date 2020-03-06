<?php

namespace App\Constructor;

use Illuminate\Database\Eloquent\Model;

class TemplateHistory extends Model
{
    
    protected $fillable =
        ['name', 'title', 'data', 'type', 'user_id', 'template_id'];
    
    public function template() {
        return $this->belongsTo(Template::class);
    }
    
}
