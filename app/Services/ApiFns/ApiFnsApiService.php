<?php


namespace App\Services\ApiFns;

use App\Services\ApiFns\Facades\ApiFns;

class ApiFnsApiService
{
    /**
     * @param string $query
     * @param int $page
     * @param string $filter
     * @return \App\Services\ApiFns\ApiFns
     */
    public function search(string $query, int $page, string $filter)
    {
        return ApiFns::search($query, $page, $filter);
    }

    /**
     * @param string $req
     * @return \App\Services\ApiFns\ApiFns
     */
    public function egr(string $req)
    {
        return ApiFns::egr($req);
    }

    /**
     * @param $req
     * @return \App\Services\ApiFns\ApiFns
     */
    public function multinfo($req)
    {
        return ApiFns::multinfo($req);
    }

    /**
     * @param $req
     * @return \App\Services\ApiFns\ApiFns
     */
    public function multcheck($req)
    {
        return ApiFns::multcheck($req);
    }

    /**
     * @param string $req
     * @return \App\Services\ApiFns\ApiFns
     */
    public function check(string $req)
    {
        return ApiFns::check($req);
    }

    /**
     * @param string $inn
     * @return \App\Services\ApiFns\ApiFns
     */
    public function nalogbi(string $inn)
    {
        return ApiFns::nalogbi($inn);
    }

    /**
     * @param string $req
     * @param string $dat
     * @return \App\Services\ApiFns\ApiFns
     */
    public function changes(string $req, string $dat)
    {
        return ApiFns::changes($req, $dat);
    }

    /**
     * @param string $cmd
     * @param string $req
     * @param string $dat
     * @param string $type
     * @return \App\Services\ApiFns\ApiFns
     */
    public function mon(string $cmd, string $req, string $dat, string $type)
    {
        return ApiFns::mon($cmd, $req, $dat, $type);
    }

    /**
     * @param string $req
     * @return \App\Services\ApiFns\ApiFns
     */
    public function vyp(string $req)
    {
        return ApiFns::vyp($req);
    }

    /**
     * @param string $req
     * @return \App\Services\ApiFns\ApiFns
     */
    public function bo(string $req)
    {
        return ApiFns::bo($req);
    }

    /**
     * @param string $req
     * @param int $yaer
     * @param int $xls
     * @return \App\Services\ApiFns\ApiFns
     */
    public function bo_file(string $req, int $yaer, int $xls)
    {
        return ApiFns::bo_file($req, $yaer, $xls);
    }

    /**
     * @param string $fam
     * @param string $nam
     * @param string $otch
     * @param string $bdate
     * @param string $doctype
     * @param string $docno
     * @return \App\Services\ApiFns\ApiFns
     */
    public function innfl(string $fam, string $nam, string $otch, string $bdate, string $doctype, string $docno)
    {
        return ApiFns::innfl($fam, $nam, $otch, $bdate, $doctype, $docno);
    }

    /**
     * @param string $docno
     * @return \App\Services\ApiFns\ApiFns
     */
    public function mvdpass(string $docno)
    {
        return ApiFns::mvdpass($docno);
    }

    /**
     * @param string $inn
     * @param string $status
     * @param string $kpp
     * @return \App\Services\ApiFns\ApiFns
     */
    public function fsrar(string $inn, string $status, string $kpp)
    {
        return ApiFns::fsrar($inn, $status, $kpp);
    }

    /**
     * @return \App\Services\ApiFns\ApiFns
     */
    public function stat()
    {
        return ApiFns::stat();
    }
}
