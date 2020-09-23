<?php

namespace App\Altrp;

use App\Page;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    protected $table = 'altrp_sources';

  protected $casts = [
    'web_url' => 'string',
  ];

    protected $fillable = [
        'model_id',
        'controller_id',
        'url',
        'api_url',
        'type',
        'name',
    ];

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

    public static function getBySearch($search)
    {
        return self::where('name','like', "%{$search}%")
            ->orWhere('id', $search)
            ->get();
    }

    public static function getBySearchWithPaginate($search, $offset, $limit)
    {
        return self::where('name','like', "%{$search}%")
            ->orWhere('id', $search)
            ->skip($offset)
            ->take($limit)
            ->get();
    }

    public static function getWithPaginate($offset, $limit)
    {
        return self::skip($offset)
            ->take($limit)
            ->get();
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
   */
  public function getWebUrlAttribute(){
    switch ( $this->sourceable_type ){
      case 'App\SQLEditor':{
        return '/ajax/models/queries' . data_get( $this, 'url' );
      }
    }
    return '/ajax/models' . data_get( $this, 'url' );
  }
}
