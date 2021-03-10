<?php


namespace App\Services\ApiFns;


use App\Services\ApiFns\Providers\ApiFnsProvider;

class ApiFnsService
{
    /**
     * @var string
     */
    protected $secret;

    /**
     * @var
     */
    protected $api;

    /**
     * ApiFnsService constructor.
     */
    public function __construct()
    {
        if (file_exists(config_path('/fns-api.php'))) {
            $this->secret = config('fns-api.secret');
        } else {
            $this->secret = env('API_FNS_SECRET', null);
        }
    }

    /**
     * @return string
     */
    public function getSecret()
    {
        return $this->secret;
    }

    /**
     * @return ApiFnsProvider
     */
    public function api(): ApiFnsProvider
    {
        if (! $this->api instanceof ApiFnsProvider)
        {
            $this->api = new ApiFnsProvider($this->secret);
        }
        return $this->api;
    }
}
