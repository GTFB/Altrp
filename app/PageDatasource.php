<?php


namespace App;


use App\Altrp\Source;
use Illuminate\Database\Eloquent\Model;

class PageDatasource extends Model
{
    protected $table = 'page_data_sources';

    protected $fillable = [
        'page_id',
        'page_guid',
        'source_id',
        'alias',
        'priority',
        'parameters'
    ];

  /**
   * Связь со страницей
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
    public function page()
    {
      return $this->belongsTo( Page::class, 'page_guid', 'guid' );
    }
  /**
   * Связь со страницей через ид
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
    public function page_trough_id()
    {
      return $this->belongsTo( Page::class, 'page_id'  );
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
