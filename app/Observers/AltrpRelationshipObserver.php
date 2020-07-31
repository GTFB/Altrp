<?php

namespace App\Observers;

use App\Altrp\Relationship;
use App\Altrp\Model;
use App\Altrp\Migration;
use App\Altrp\Generators\KeyMigrationGenerator;
use App\Altrp\Generators\NewMigrationGenerator;

use App\Exceptions\AltrpMigrationRunExceptions;

class AltrpRelationshipObserver
{
    /**
     * Вызываем после создания колонки
     * @param Column $column
     */
    public function creating(Relationship $relationship)
    {
        $generator = new KeyMigrationGenerator($relationship);
        $file = $generator->createKeyGenerate();
        $name = $generator->getMigrationName();
        
        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }
        
        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $relationship->altrp_model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();
        
        $relationship->altrp_migration_id = $migration->id;
        $relationship->table_id = $relationship->altrp_model->altrp_table->id;
    }
    
    /**
     * Вызываем после обновления колонки
     * @param Column $column
     */
    /*public function updating(Column $column)
    {
        $model = Model::find($column->model_id);
        $old_column = Column::find($column->id);
        
        $generator = new ColumnMigrationGenerator($column);
        $file = $generator->updateColumnGenerate($old_column);
        $name = $generator->getMigrationName();
       
        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }
        
        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $column->altrp_model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();
        
        $column->altrp_migration_id = $migration->id;
        
    }*/
    
    /**
     * Вызываем после удаления колонки
     * @param Column $column
     */
    public function deleting(Relationship $relationship)
    {
        
        $generator = new KeyMigrationGenerator($relationship);
        $file = $generator->deleteKeyGenerate();
        $name = $generator->getMigrationName();
        
        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }
        
        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $relationship->altrp_model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();
        
        
    }
}
