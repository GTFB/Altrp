<?php

namespace App\Altrp;

use App\Page;
use App\PageDatasource;
use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    use Searchable;

    protected $table = 'altrp_sources';

  protected $casts = [
    'web_url' => 'string',
    'headers' => 'array',
    'bodies' => 'array'
  ];

    protected $fillable = [
        'model_id',
        'controller_id',
        'url',
        'api_url',
        'type',
        'request_type',
        'name',
        'title',
        'auth',
        'sourceable_id',
        'sourceable_type',
        'description',
        'headers',
        'bodies',
        'updated_at',
        'need_all_roles',
    ];

    protected $appends = [
      'web_url'
    ];

    protected $with = ['notice_settings'];

    public function sourceable()
    {
        return $this->morphTo();
    }

    public function model()
    {
        return $this->belongsTo(\App\Altrp\Model::class);
    }

    public function source_roles()
    {
        return $this->hasMany(SourceRole::class,'source_id');
    }

    public function source_permissions()
    {
        return $this->hasMany(SourcePermission::class,'source_id');
    }

    public function page_data_sources()
    {
        return $this->hasMany(PageDatasource::class,'source_id');
    }

    public function notice_settings()
    {
        return $this->belongsToMany(NoticeSetting::class, 'altrp_notice_setting_source', 'source_id', 'notice_setting_id');
    }

    public static function getBySearchWithPaginate($search, $offset, $limit, $fieldName = 'name', $orderColumn = 'id', $orderType = 'Desc', $with = [])
    {
        $sortType = 'sortBy';
        $descending = $orderType == 'Asc' ? true : false;
        return self::with($with)
            ->where($fieldName,'like', "%{$search}%")
            ->orWhere('id', $search)
            ->skip($offset)
            ->take($limit)
            ->get()->$sortType($orderColumn,SORT_REGULAR,$descending)->values();
    }

    public static function getWithPaginate($offset, $limit, $orderColumn = 'id', $orderType = 'Desc', $with = [])
    {
        $sortType = 'sortBy';
        $descending = $orderType == 'Asc' ? true : false;
        return self::with($with)
            ->skip($offset)
            ->take($limit)
            ->get()->$sortType($orderColumn,SORT_REGULAR,$descending)->values();
    }

    public static function getCount()
    {
        return self::toBase()->count();
    }

    public static function getCountWithSearch($search)
    {
        return self::where('name','like', "%{$search}%")
            ->orWhere('id', $search)
            ->toBase()
            ->count();
    }

  /**
   * URL для фронтенда
   * @return string
   */
  public function getWebUrlAttribute(){
    switch ( $this->sourceable_type ){
      case 'App\SQLEditor':
      case 'App\Altrp\Query':
        return config('app.url') . '/ajax/models/queries' . data_get( $this, 'url' );
      case 'App\Altrp\Customizer':
        return config('app.url') . '/ajax/models/'. \Str::plural($this->model->name) .'/customizers' . data_get( $this, 'url' );
      default:
        return $this->type != 'remote'
            ? config('app.url') . '/ajax/models' . data_get( $this, 'url' )
            : config('app.url') . '/ajax/models/data_sources/' . $this->model->table->name . '/' . data_get( $this, 'name' );
    }
  }
}
