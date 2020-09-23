<?php


namespace App;


use App\Altrp\Source;
use Illuminate\Database\Eloquent\Model;

class PageDatasource extends Model
{
    protected $table = 'page_data_sources';

    protected $fillable = [
        'page_id',
        'source_id',
        'alias',
        'priority',
        'parameters'
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

  /**
   * Ссылка на ресурс
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
    public function source()
    {
        return $this->belongsTo(Source::class);
    }
}
