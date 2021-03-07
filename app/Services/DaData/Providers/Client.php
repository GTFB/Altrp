<?php

namespace App\Services\DaData\Providers;

use Ixudra\Curl\Facades\Curl;
use Symfony\Component\HttpFoundation\Response as ResponseCode;

/**
 * Trait Client
 */
trait Client
{

    /**
     * @param array $headers
     * @param string $url
     * @param array $data
     * @param int $timeout
     * @return array
     * @throws \Exception
     */
    public function postData(array $headers, string $url, array $data, int $timeout) : array
    {
        $response   = Curl::to($url)
            ->withHeaders($headers)
            ->withData($data)
            ->withTimeout($timeout)
            ->asJson()
            ->returnResponseObject()
            ->post();

        return $this->data($response);
    }

    /**
     * @param array $headers
     * @param string $url
     * @param array $data
     * @param int $timeout
     * @return array
     * @throws \Exception
     */
    public function getData(array $headers, string $url, array $data, int $timeout) : array
    {
        $response   = Curl::to($url)
            ->withHeaders($headers)
            ->withData($data)
            ->withTimeout($timeout)
            ->asJson()
            ->returnResponseObject()
            ->get();

        return $this->data($response);
    }

    /**
     * @param $response
     * @return array
     * @throws \Exception
     */
    protected function data($response) : array
    {
        $data = $response->content;

        if ($response->status != ResponseCode::HTTP_OK) {
            $data = isset($data->message)
                ? ['message' => $data->message]
                : ['message' => ResponseCode::$statusTexts[$response->status]];
        }

        $data = [
            'data' => $data,
            'status' => $response->status
        ];

        return $data;
    }


}
