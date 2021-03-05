<?php


namespace App\Traits;

use ErrorException;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Relations\Relation;
use ReflectionClass;
use ReflectionMethod;

trait RelationshipsTrait
{
    /**
     * Получить список всех связей модели
     * @return array
     * @throws \ReflectionException
     */
    public function relationships() {
        $model = new static;
        $relationships = [];
        foreach((new ReflectionClass($model))->getMethods(ReflectionMethod::IS_PUBLIC) as $method)
        {
            if ($method->class != get_class($model) ||
                !empty($method->getParameters()) ||
                $method->getName() == __FUNCTION__) {
                continue;
            }
            try {
                $return = $method->invoke($model);
                if ($return instanceof Relation) {
                    /**
                     * @var $return MorphToMany
                     */
                    $relationships[$method->getName()] = [
                        'type' => (new ReflectionClass($return))->getShortName(),
                        'model' => (new ReflectionClass($return->getRelated()))->getName(),
                        'foreignKey' => (new ReflectionClass($return))->hasMethod('getForeignKey')
                            ? $return->getForeignKey()
                            : ((new ReflectionClass($return))->hasMethod('getForeignKeyName') ? $return->getForeignKeyName() : $return->getForeignPivotKeyName()) ,
                    ];
                }
            } catch(\Exception $e) {
                return [];
            }
        }
        return $relationships;
    }
}
