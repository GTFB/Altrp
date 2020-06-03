<?php

namespace App\Constructor;

use App\Area;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Page
 * @package App
 * @property Area $area
 * @property User $user
 */
class Template extends Model
{
  use SoftDeletes;
  protected $fillable =
    [ 'name',
      'title',
      'data',
      'type',
      'area',
      'user_id' ];


  public function user(){
    return $this->belongsTo( User::class, 'user_id' );
  }

  /**
   * @return Area|\Illuminate\Database\Eloquent\Builder
   */
  public function area(){
    return Area::find( $this->area );
  }

}
