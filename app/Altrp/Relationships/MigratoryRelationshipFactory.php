<?php


namespace App\Altrp\Relationships;

use App\Altrp\Relationship;
use App\Altrp\Relationships\BelongsToMany;
use App\Altrp\Relationships\HasMany;
use App\Altrp\Relationships\BelongsTo;
use App\Altrp\Relationships\HasOne;

class MigratoryRelationshipFactory
{
    public $type;
    public $relationship;

    const DEFAULT_CLASS = MigratoryRelationship::class;

    const TYPES = [
        'hasOne' => 'App\Altrp\Relationships\HasOne',
        'belongsTo' => 'App\Altrp\Relationships\BelongsTo',
        'hasMany' => 'App\Altrp\Relationships\HasMany',
        'belongsToMany' => 'App\Altrp\Relationships\BelongsToMany',

    ];

    public static function getMigratoryRelationship(IRelationship $relationship) {
        $class = self::TYPES[$relationship->type] ?? self::DEFAULT_CLASS;
        return new $class($relationship);
    }

}
