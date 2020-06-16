<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Основные сущности программы
 */
class Table extends Model
{
    use SoftDeletes;
    
    public function migrations() {
        return $this->hasMany('App\Altrp\Migration');
    }
    
    public function columns() {
        return $this->hasMany('App\Altrp\Column');
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
        return $this->columns()->where('altrp_migration_id','=',$migration->id);
    }
    
    public function actual_keys() {
        $migration = $this->actual_migration();
        return $this->source_keys()->where('altrp_migration_id','=',$migration->id);
    }
}
