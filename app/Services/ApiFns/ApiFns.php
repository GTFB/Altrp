<?php


namespace App\Services\ApiFns;

/**
 * Class ApiFns
 * @package App\Services\ApiFns
 */
class ApiFns extends ApiFnsService
{
    /**
     * @param string $query
     * @param int $page
     * @param string $filter
     * @return array
     */
    public function search(string $query, int $page = 1, string $filter = '')
    {
        return $this->api()->get('search', [
            'q' => $query,
            'page' => $page,
            'filter' => $filter
        ]);
    }

    /**
     * @param string $req
     * @return array
     */
    public function egr(string $req)
    {
        return $this->api()->get('egr', [
            'req' => $req
        ]);
    }

    /**
     * @param string $req
     * @return array
     */
    public function multinfo($req)
    {
        return $this->api()->get('multinfo', [
            'req' => $req
        ]);
    }

    /**
     * @param string $req
     * @return array
     */
    public function multcheck($req)
    {
        return $this->api()->get('multcheck', [
            'req' => $req
        ]);
    }

    /**
     * @param string $req
     * @return array
     */
    public function check(string $req)
    {
        return $this->api()->get('check', [
            'req' => $req
        ]);
    }

    /**
     * @param string $inn
     * @return array
     */
    public function nalogbi(string $inn)
    {
        return $this->api()->get('nalogbi', [
            'inn' => $inn
        ]);
    }

    /**
     * @param string $req
     * @param string $dat
     * @return array
     */
    public function changes(string $req, string $dat)
    {
        return $this->api()->get('changes', [
            'req' => $req,
            'dat' => $dat
        ]);
    }

    /**
     * @param string $cmd
     * @param string $req
     * @param string $dat
     * @param string $type
     * @return array
     */
    public function mon(string $cmd, string $req, string $dat, string $type)
    {
        return $this->api()->get('mon', [
            'cmd' => $cmd,
            'req' => $req,
            'dat' => $dat,
            'type' => $type,
        ]);
    }

    /**
     * @param string $req
     * @return array
     */
    public function vyp(string $req)
    {
        return $this->api()->getFile('vyp', [
            'req' => $req
        ]);
    }

    /**
     * @param string $req
     * @return array
     */
    public function bo(string $req)
    {
        return $this->api()->get('bo', [
            'req' => $req
        ]);
    }

    /**
     * @param string $req
     * @param int $year
     * @param int $xls
     * @return array
     */
    public function bo_file(string $req, int $year, int $xls)
    {
        return $this->api()->getFile('bo_file', [
            'req' => $req,
            'year' => $year,
            'xls' => $xls,
        ]);
    }

    /**
     * @param string $fam
     * @param string $nam
     * @param string $otch
     * @param string $bdate
     * @param string $doctype
     * @param string $docno
     * @return array
     */
    public function innfl(string $fam, string $nam, string $otch, string $bdate, string $doctype, string $docno)
    {
        return $this->api()->get('innfl', [
            'fam' => $fam,
            'nam' => $nam,
            'otch' => $otch,
            'bdate' => $bdate,
            'doctype' => $doctype,
            'docno' => $docno,
        ]);
    }

    /**
     * @param string $docno
     * @return array
     */
    public function mvdpass(string $docno)
    {
        return $this->api()->get('mvdpass', [
            'docno' => $docno
        ]);
    }

    /**
     * @param string $inn
     * @param string $status
     * @param string $kpp
     * @return array
     */
    public function fsrar(string $inn, string $status, string $kpp)
    {
        return $this->api()->get('fsrar', [
            'inn' => $inn,
            'status' => $status,
            'kpp' => $kpp,
        ]);
    }

    /**
     * @return array
     */
    public function stat()
    {
        return $this->api()->get('stat', []);
    }
}
