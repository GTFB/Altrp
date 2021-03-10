<?php

namespace App\Services\ApiFns\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class ApiFns
 * @method \App\Services\ApiFns\ApiFns search(string $query, int $page, string $filter)
 * @method \App\Services\ApiFns\ApiFns egr(string $req)
 * @method \App\Services\ApiFns\ApiFns multinfo($req)
 * @method \App\Services\ApiFns\ApiFns multcheck($req)
 * @method \App\Services\ApiFns\ApiFns check(string $req)
 * @method \App\Services\ApiFns\ApiFns nalogbi(string $inn)
 * @method \App\Services\ApiFns\ApiFns changes(string $req, string $dat)
 * @method \App\Services\ApiFns\ApiFns mon(string $cmd, string $req, string $dat, string $type)
 * @method \App\Services\ApiFns\ApiFns vyp(string $req)
 * @method \App\Services\ApiFns\ApiFns bo(string $req)
 * @method \App\Services\ApiFns\ApiFns bo_file(string $req, int $year, int $xls)
 * @method \App\Services\ApiFns\ApiFns innfl(string $fam, string $nam, string $otch, string $bdate, string $doctype, string $docno)
 * @method \App\Services\ApiFns\ApiFns mvdpass(string $docno)
 * @method \App\Services\ApiFns\ApiFns fsrar(string $inn, string $status, string $kpp)
 * @method \App\Services\ApiFns\ApiFns stat()
 */
class ApiFns extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() : string
    {
        return 'api_fns';
    }

}

