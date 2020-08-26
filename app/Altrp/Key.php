<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    protected $table = 'altrp_keys';
    public $timestamps = false;

    public function fromObject($obj) {

        $this->onDelete = $obj->onDelete;
        $this->onUpdate = $obj->onUpdate;

        $this->target_table = $obj->target_table;
        $this->source_column = $obj->source_column;
        $this->target_column = $obj->target_column;

        return $this;
    }
}
