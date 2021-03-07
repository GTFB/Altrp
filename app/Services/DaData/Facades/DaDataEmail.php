<?php

namespace App\Services\DaData\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class DaDataEmail
 * @method \App\Services\DaData\DaDataEmail standardization(string $email)
 * @method \App\Services\DaData\DaDataEmail prompt(string $email, int $count)
 */
class DaDataEmail extends Facade
{

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() : string
    {
        return 'da_data_email';
    }

}
