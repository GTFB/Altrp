<?php


namespace App\Services\ApiFns\Providers;


class ApiFnsProvider
{
    use Client;

    /**
     * @var string
     */
    protected $api = 'https://api-fns.ru/api';

    /**
     * @var string
     */
    protected $secret;

    /**
     * ApiFnsProvider constructor.
     * @param string $secret
     */
    public function __construct(string $secret)
    {
        $this->secret = $secret;
    }

    /**
     * @param string $method
     * @param array $data
     * @return array|object
     */
    public function post(string $method, array $data = [])
    {
        $headers = [
            'Content-Type' => 'application/json',
        ];
        $url = sprintf('%s/%s', $this->api, $method);
        return $this->postData($headers, $url, $data);
    }

    /**
     * @param string $method
     * @param array $data
     * @return array
     */
    public function get(string $method, array $data = []) : array
    {
        $headers = [
            'Content-Type' => 'application/json',
        ];
        $url = sprintf('%s/%s', $this->api, $method);
        return $this->postData($headers, $url, $data);
    }

    /**
     * @param string $method
     * @param array $data
     * @return array
     */
    public function getFile(string $method, array $data = [])
    {
        $headers = [
            'Content-Type' => 'application/json',
        ];
        $url = sprintf('%s/%s', $this->api, $method);
        return $this->saveFile($headers, $url, $data);
    }
}
