<?php

namespace App\Observers;

use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Relationship;
use App\Altrp\Model;
use App\Altrp\Migration;
use App\Altrp\Generators\KeyMigrationGenerator;

use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\CommandFailedException;
use App\Exceptions\AltrpRelationshipNotFoundInverseRelationshipExceptions;
use App\Exceptions\Migration\AltrpForeignKeyExistException;
use App\Exceptions\Migration\AltrpForeignKeyColumnsCompareException;
use App\Exceptions\Migration\AltrpForeignKeyChildRowsException;
use App\Exceptions\Migration\AltrpForeignKeyNotFoundException;

class AltrpRelationshipObserver
{
    /**
     * Вызываем после создания связи
     * @param Relationship $relationship
     * @return bool|void
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function creating(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $dbal_key = $relationship->getDBKey();

        //Cвязь belongsTo создается на существующую связь hasOne или hasMany
        //Миграция не нужна, она уже выполнялась при добавлении связи hasOne или hasMany
        if($relationship->type === "belongsTo") {
            //Перед добавлением связи belongsTo проверяем есть ли уже обратная связь
            if(!$relationship->getInverseRelationship()) {
                throw new AltrpRelationshipNotFoundInverseRelationshipExceptions("Not Found Inverse Relationship");
            }
            return;
        }

        //Проверка существует ли такой ключ в БД
        if($dbal_key) {
            throw new AltrpForeignKeyExistException("Foreign Key ".$dbal_key->getLocalColumns()[0]." -
            ".$dbal_key->getForeignColumns()[0]." in table ".$dbal_key->getForeignTableName()." already exists", 500);
        }

        $compare = $relationship->compareColumnsAttributes();
        //Проверка колонок по аттрибутам
        if(count($compare) > 0) {
            throw new AltrpForeignKeyColumnsCompareException(implode(", ",$compare), 500);
        }

        //Проверка пододят ли строки в таблицах
        if(!$relationship->checkDBRowsConstraint()) {
            throw new AltrpForeignKeyChildRowsException("Cannot add or update a child row: a foreign key constraint fails", 500);
        }

        //Проверяем есть ли уже такая связь или обратная связь
        //Если есть, то внешний ключ уже был создан
        if(!$relationship->checkForeignExist()) {
            return;
        }

        $generator = new KeyMigrationGenerator($relationship);
        $file = $generator->createKeyGenerate();
        $name = $generator->getMigrationName();

        //Возвращаем ошибку если не удалось создать файл миграции
        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        //Создаем и выполняем миграцию (выполнение в MigrationObserver)
        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

        //Указываем у связи идентификатор миграции
        $relationship->altrp_migration_id = $migration->id;
    }

    /**
     * @param Relationship $relationship
     * @throws CommandFailedException
     * @throws \App\Exceptions\TableNotFoundException
     * @throws \Exception
     */
    public function created(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new ModelGenerator($model);

        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }

        //После создания связи belongsTo нужно поставить галочку в обратной связи hasOne или hasMany
        if($relationship->type === "belongsTo") {
            $inverse_relationship = $relationship->getInverseRelationship();
            $inverse_relationship->add_belong_to = true;

            Relationship::withoutEvents(function () use ($inverse_relationship) {
                $inverse_relationship->save();
            });

            return;
        }

        //Добавление обратной связи если стоит галочка Add Reverse Relation
        if ($relationship->add_belong_to && $relationship->target_model_id ) {

            $targetModel = Model::find($relationship->target_model_id);
            $model_class = '\App\AltrpModels\\' . $model->name;

            $relation_name = strtolower($model->name);

            $local_key = $relationship->foreign_key;
            $foreign_key = $relationship->local_key;

            $relation = new Relationship([
                "title" => $relation_name,
                "description" => "",
                "type" => $this->getInverseRelationType($relationship->type),
                "model_id" => $relationship->target_model_id,
                "add_belong_to" => false,
                "foreign_key" => $foreign_key,
                "local_key" => $local_key,
                "onDelete" => "restrict",
                "onUpdate" => "restrict",
                "name" => $relation_name,
                "target_model_id" => $model->id,
                'model_class' => $model_class
            ]);
            Relationship::withoutEvents(function () use ($relation) {
                $relation->save();
            });
            $generator = new ModelGenerator($targetModel);
            if (! $generator->updateModelFile()) {
                throw new CommandFailedException('Failed to update model file', 500);
            }
        }
    }

    /**
     * Вызываем после обновления колонки
     * @param Relationship $relationship
     * @return bool|void
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function updating(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $dbal_key = $relationship->getDBKey();
        $old_dbal_key = $relationship->getDBKey(true);

        //Cвязь belongsTo создается на существующую связь hasOne или hasMany
        //Миграция не нужна, она уже выполнялась при добавлении связи hasOne или hasMany
        if($relationship->type === "belongsTo") {
            return;
        }

        //Проверка существует ли старый ключ в БД
        if(!$old_dbal_key) {
            throw new AltrpForeignKeyNotFoundException("Foreign Key not found. Check database.", 500);
        }

        //Проверка существует ли новый ключ в БД
        if($dbal_key) {
            throw new AltrpForeignKeyExistException("Foreign Key ".$dbal_key->getLocalColumns()[0]." -
            ".$dbal_key->getForeignColumns()[0]." in table ".$dbal_key->getForeignTableName()." already exists", 500);
        }

        $compare = $relationship->compareColumnsAttributes();
        //Проверка колонок по аттрибутам
        if(count($compare) > 0) {
            throw new AltrpForeignKeyColumnsCompareException(implode(", ",$compare), 500);
        }

        //Проверка пододят ли строки в таблицах
        if(!$relationship->checkDBRowsConstraint()) {
            throw new AltrpForeignKeyChildRowsException("Cannot add or update a child row: a foreign key constraint fails", 500);
        }

        //Проверяем есть ли уже такая связь или обратная связь
        //Если есть, то внешний ключ уже был создан
        if(!$relationship->checkForeignExist()) {
            return;
        }

        $old_key = Relationship::find($relationship->id);
        $generator = new KeyMigrationGenerator($relationship);
        $file = $generator->updateKeyGenerate($old_key);
        $name = $generator->getMigrationName();

        //Возвращаем ошибку если не удалось создать файл миграции
        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        //Создаем и выполняем миграцию (выполнение в MigrationObserver)
        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

        //Указываем у связи идентификатор миграции
        $relationship->altrp_migration_id = $migration->id;

        /*if (($model->altrp_relationships->contains('name', $relationship->name)
            && $relationship->getOriginal('name') != $relationship->name)
            || ($model->altrp_relationships->contains('foreign_key', $relationship->foreign_key)
            && $relationship->getOriginal('foreign_key') != $relationship->foreign_key)) {
            return false;
        }*/

        //Cвязь belongsTo создается на существующую связь hasOne или hasMany
        //Миграция не нужна, она уже выполнялась при добавлении связи hasOne или hasMany
        /*if($relationship->type === "belongsTo") {
            return;
        }




        //Возвращаем ошибку если не удалось создать файл миграции
        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        //Создаем и выполняем миграцию (выполнение в MigrationObserver)
        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();*/


        /*
        if($relationship->checkForeignExist()) {


            if ($relationship->type === 'hasOne') {
                $column = Column::where([['model_id',$relationship->model_id],['name',$relationship->getOriginal('foreign_key')]]);
                Column::withoutEvents(function () use ($column, $relationship, $model, $migration){
                    $column->update([
                        'name' => $relationship->foreign_key,
                        'title' => $relationship->foreign_key,
                        'type' => 'bigInteger',
                        'null' => false,
                        'table_id' => $model->altrp_table->id,
                        'altrp_migration_id' => $migration->id,
                        'user_id' => auth()->user()->id,
                        'is_label' => false,
                        'is_title' => false,
                        'indexed' => false,
                        'editable' => $relationship->editable,
                        'hidden' => false,
                        'model_id' => $relationship->model_id
                    ]);
                });
            }
        }*/



    }

    /**
     * @param Relationship $relationship
     * @throws CommandFailedException
     * @throws \Exception
     */
    public function updated(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new ModelGenerator($model);
        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }
        if ($relationship->getOriginal('add_belong_to')) {
            $targetModel = Model::find($relationship->target_model_id);
            $relation = Relationship::where([
                ['model_id', $relationship->target_model_id],
                ['target_model_id', $relationship->model_id],
                ['name', $relationship->getOriginal('name')]
            ]);
            Relationship::withoutEvents(function () use ($relation, $relationship) {
                $relation->update([
                    'name' => $relationship->name,
                    'foreign_key' => $relationship->foreign_key
                ]);
            });
            $generator = new ModelGenerator($targetModel);
            if (! $generator->updateModelFile()) {
                throw new CommandFailedException('Failed to update model file', 500);
            }
        }

        if ($relationship->getOriginal('add_belong_to') != $relationship->add_belong_to
            && $relationship->add_belong_to && $relationship->target_model_id) {
            $targetModel = Model::find($relationship->target_model_id);
            $model_class = '\App\AltrpModels\\' . $model->name;
            $relation = new Relationship([
                "title" => "Inverse " . $relationship->title,
                "description" => "",
                "type" => $this->getInverseRelationType($relationship->type),
                "model_id" => $targetModel->id,
                "add_belong_to" => false,
                "foreign_key" => $relationship->foreign_key,
                "local_key" => $relationship->local_key,
                "onDelete" => "restrict",
                "onUpdate" => "restrict",
                "name" => $relationship->name,
                "target_model_id" => $model->id,
                'model_class' => $model_class
            ]);
            Relationship::withoutEvents(function () use ($relation) {
                $relation->save();
            });
            $generator = new ModelGenerator($targetModel);
            if (! $generator->updateModelFile()) {
                throw new CommandFailedException('Failed to update model file', 500);
            }
        } elseif ($relationship->getOriginal('add_belong_to') != $relationship->add_belong_to
            && !$relationship->add_belong_to) {
            $targetModel = Model::find($relationship->target_model_id);
            $relation = Relationship::where([
                ['model_id', $relationship->target_model_id],
                ['target_model_id', $relationship->model_id],
                ['name', $relationship->name]
            ]);
            Relationship::withoutEvents(function () use ($relation) {
                $relation->delete();
            });
            $generator = new ModelGenerator($targetModel);
            if (! $generator->updateModelFile()) {
                throw new CommandFailedException('Failed to update model file', 500);
            }
        }
    }

    /**
     * Вызываем после удаления колонки
     * @param Relationship $relationship
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function deleting(Relationship $relationship)
    {
        //Cвязь belongsTo создается на существующую связь hasOne или hasMany
        //Миграция не нужна, она уже выполнялась при добавлении связи hasOne или hasMany
        if($relationship->type === "belongsTo") {
            return;
        }

        $model = Model::find($relationship->model_id);
        $dbal_key = $relationship->getDBKey();

        //Проверка существует ли такой ключ в БД
        if(!$dbal_key) {
            throw new AltrpForeignKeyNotFoundException("Foreign Key not found. Check database.", 500);
        }

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
        $migration->table_id = $model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

    }

    /**
     * @param Relationship $relationship
     * @throws CommandFailedException
     */
    public function deleted(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new ModelGenerator($model);
        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }

        //После удаления связи belongsTo нужно убрать галочку в обратной связи hasOne или hasMany
        if($relationship->type === "belongsTo") {
            $inverse_relationship = $relationship->getInverseRelationship();
            $inverse_relationship->add_belong_to = false;

            Relationship::withoutEvents(function () use ($inverse_relationship) {
                $inverse_relationship->save();
            });
        }
        else {
            $inverse_relationship = $relationship->getInverseRelationship();

            if($inverse_relationship) {
                Relationship::withoutEvents(function () use ($inverse_relationship) {
                    $inverse_relationship->delete();
                });
            }
        }

        $targetModel = Model::find($relationship->target_model_id);
        $relation = Relationship::where([
            ['model_id', $relationship->target_model_id],
            ['target_model_id', $relationship->model_id],
            ['name', $relationship->name]
        ]);
        Relationship::withoutEvents(function () use ($relation) {
            $relation->delete();
        });
        $generator = new ModelGenerator($targetModel);
        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }
    }

    protected function getInverseRelationType($type)
    {
        $inverseType = null;
        switch ($type) {
            case 'hasOne':
            case 'hasMany':
                $inverseType = 'belongsTo';
                break;
            case 'belongsToMany':
                $inverseType = 'belongsToMany';
                break;
        }
        return $inverseType;
    }
}
