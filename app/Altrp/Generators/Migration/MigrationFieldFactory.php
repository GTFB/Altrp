<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Altrp\Generators\Migration;

use App\Altrp\Generators\Migration\Fields\MigrationFieldId;
use App\Altrp\Generators\Migration\Fields\MigrationFieldString;
use App\Altrp\Generators\Migration\IMigrationField;
/**
 * Description of MigrationFieldFactory
 *
 * @author aco
 */
class MigrationFieldFactory {
    
    protected $column_types = [
        'id' => 'App\Altrp\Generators\Migration\Fields\MigrationFieldId',
        'string' => 'App\Altrp\Generators\Migration\Fields\MigrationFieldString',
        'foreignId' => 'App\Altrp\Generators\Migration\Fields\MigrationFieldForeignId',
        'boolean' => 'App\Altrp\Generators\Migration\Fields\MigrationFieldBoolean',
        'date' => 'App\Altrp\Generators\Migration\Fields\MigrationFieldDate',
        'integer' => 'App\Altrp\Generators\Migration\Fields\MigrationFieldInteger',
        
        /*
        'char' => 'char',
        'datetime' => 'dateTime',
        'mediumtext' => 'mediumText',
        'longtext' => 'longText',
        
        'text' => 'text',
        'bigint' => 'bigInteger',
        'decimal' => 'decimal',*/
    ];
    
    
    public function getField($column, $oldcolumn = null) {
        
        if(!array_key_exists($column->type, $this->column_types)) {
            return new MigrationField($column, $oldcolumn);
        }
        
        $className = $this->column_types[$column->type];
        return new $className($column, $oldcolumn);
    }
    
    public function getOldField($oldcolumn, $column = null) {
        
        if(!array_key_exists($oldcolumn->type, $this->column_types)) {
            return new MigrationField($column, $oldcolumn);
        }
        
        $className = $this->column_types[$oldcolumn->type];
        return new $className($column, $oldcolumn);
    }
}
