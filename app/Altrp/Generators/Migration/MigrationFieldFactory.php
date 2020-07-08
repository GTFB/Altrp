<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Altrp\Generators\Migration;

use App\Altrp\Generators\Migration\Fields\MigrationFieldId;
use App\Altrp\Generators\Migration\Fields\MigrationFieldString;
/**
 * Description of MigrationFieldFactory
 *
 * @author aco
 */
class MigrationFieldFactory {
    
    protected $column_types = [
        'id' => 'MigrationFieldId',
        'string' => 'MigrationFieldString',
        
        /*
        'foreignId' => 'foreignId',
        'boolean' => 'boolean',
        'char' => 'char',
        'date' => 'date',
        'datetime' => 'dateTime',
        'integer' => 'integer',
        'mediumtext' => 'mediumText',
        'longtext' => 'longText',
        
        'text' => 'text',
        'bigint' => 'bigInteger',
        'decimal' => 'decimal',*/
    ];
    
    
    public function getField($column, $oldcolumn = null) {
        
        $className = $this->column_types[$column->type];
        
        if(!$className) {
            throw new Exception("asd");
        }
        
        return new $className($column, $oldcolumn);
    }
    
}
