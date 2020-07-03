<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    protected $table = 'altrp_columns';
    public $timestamps = false;
    
    
    public function tablet() {
        return $this->belongsTo('App\Altrp\Table');
    }
    
    public function getNullAttribute($value) {
        return (bool) $value;
    }
    
    public function getUniqueAttribute($value) {
        return (bool) $value;
    }
    
    /**
     * Проверяем является ли колонка, колонкой с размером
     *
     * @return string
     */
    public function isSizeColumn()
    {
        $types = ['char', 'dateTime', 'dateTimeTz', 'decimal', 'double', 'float', 'string', 'time', 'timeTz','unsignedDecimal'];
        return array_search($this->type, $types);
    }
    
    public function fromObject($obj) {
        //$this->id = $obj->id;
        $this->name = $obj->name;
        $this->title = $obj->title;
        $this->description = $obj->description;
        $this->type = $obj->type;
        $this->size = $obj->size;
        $this->null = (bool) $obj->null;
        $this->default = $obj->default;
        $this->primary = isset($obj->primary) ? $obj->primary : false ;
        $this->unique = (bool) $obj->unique;
        //$this->table_id = $obj->table_id;
        //$this->user_id = $obj->user_id;
        //$this->altrp_migration_id = $obj->altrp_migration_id;
        return $this;
    }
}
