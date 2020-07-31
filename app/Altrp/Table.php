<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Основные сущности программы
 * @property Relationship[] $relationships
 * @property [] $actual_columns
 */
class Table extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'title',
        'description',
        'user_id'
    ];

    public function migrations() {
        return $this->hasMany('App\Altrp\Migration');
    }

    public function columns() {
        return $this->hasMany('App\Altrp\Column');
    }

    public function models() {
        return $this->hasMany('App\Altrp\Model');
    }

    public function controllers()
    {
        return $this->hasMany('App\Altrp\Controller');
    }

    public function source_keys() {
        return $this->hasMany('App\Altrp\Key', 'source_table_id');
    }

    public function target_keys() {
        return $this->hasMany('App\Altrp\Key', 'target_table_id');
    }


    public function actual_migration() {
        return $this->migrations()->where('status','=','complete')->latest()->first();
    }

    public function actual_columns() {
        $migration = $this->actual_migration();

        if(is_null($migration)) {
            return $this->columns();
        }

        return $this->columns()->where('altrp_migration_id','=',$migration->id);
    }

    public function actual_keys() {
        $migration = $this->actual_migration();

        if(is_null($migration)) {
            return $this->source_keys();
        }

        return $this->source_keys()->where('altrp_migration_id','=',$migration->id);
    }

    public function relationships() {
        return $this->hasMany('App\Altrp\Relationship');
    }

  /**
   * @param boolean $with_relations
   * @return []
   */
  public function get_all_columns( $with_relations = false ){
    $columns = $this->actual_columns;
    if( ! $with_relations ){
      return $columns;
    }

    return $columns;
  }
}
