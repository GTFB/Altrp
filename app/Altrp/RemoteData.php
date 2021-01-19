<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class RemoteData extends Model
{
    protected $table = 'altrp_remote_data';

    protected $fillable = [
        'name',
        'column_id',
        'column_name',
        'remote_find_column',
        'remote_need_column',
        'as_object',
        'single_source_id',
        'list_source_id',
        'remotable_id',
        'remotable_type',
        'enabled'
    ];

    public function column()
    {
        return $this->belongsTo(Column::class);
    }

    public function remotable()
    {
        return $this->morphTo();
    }

    public function single_source()
    {
        return $this->belongsTo(Source::class, 'single_source_id');
    }

    public function list_source()
    {
        return $this->belongsTo(Source::class, 'list_source_id');
    }
}
