<?php


namespace App\Altrp\Relationships;


interface IRelationship
{
    public function createForeignKeyMigration();
    public function updateForeignKeyMigration();
    public function deleteForeignKeyMigration();
}
