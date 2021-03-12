<?php


namespace App\Altrp;
use Illuminate\Database\Eloquent\Model;

class PageSourceParameter extends Model
{
    protected $table = 'altrp_page_source_parameters';

    protected $fillable = [
        'page_source_id',
        'name',
        'pattern',
        'is_required',
        'default_value'
    ];
}
