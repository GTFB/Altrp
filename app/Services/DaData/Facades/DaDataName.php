<?php

namespace App\Services\DaData\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class DaDataName
 * @method \App\Services\DaData\DaDataName standardization(string $name)
 * @method \App\Services\DaData\DaDataName prompt(string $name, int $count, int $gender, array $parts)
 */
class DaDataName extends Facade
{

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() : string
    {
        return 'da_data_name';
    }

}
