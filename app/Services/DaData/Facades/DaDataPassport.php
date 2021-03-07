<?php

namespace App\Services\DaData\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class DaDataPassport
 * @method \App\Services\DaData\DaDataPassport standardization(string $id)
 * @method \App\Services\DaData\DaDataPassport fms(string $passport, int $count)
 */
class DaDataPassport extends Facade
{

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() : string
    {
        return 'da_data_passport';
    }

}
