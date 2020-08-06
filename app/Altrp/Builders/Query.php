<?php


namespace App\Altrp\Builders;


class Query
{
    protected $columns;

    protected $aggregates;

    protected $conditions;

    protected $relations;

    protected $orderBy;

    protected $groupBy;

    protected $offset;

    protected $limit;

    protected $distinct;

    public function __get($name)
    {
        if (property_exists($this, $name)) {
            return $this->name;
        }
    }

    public function __set($name, $value)
    {
        if (property_exists($this, $name)) {
            return $this->name = $value;
        }
    }
}
