<?php


namespace App\Services\ApiFns\Providers;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Ixudra\Curl\Facades\Curl;
use Symfony\Component\HttpFoundation\Response as ResponseCode;

trait Client
{
    /**
     * @param $headers
     * @param string $url
     * @param array $data
     * @return array|object
     */
    public function postData(array $headers, string $url, array $data)
    {
        $data['key'] = $this->secret;
        $response = Curl::to($url)
            ->withHeaders($headers)
            ->withData($data)
            ->asJson()
            ->returnResponseObject()
            ->get();

        return $this->data($response);
    }

    /**
     * @param array $headers
     * @param string $url
     * @param array $data
     * @return array
     */
    public function saveFile(array $headers, string $url, array $data)
    {
        $data['key'] = $this->secret;
        $response = Curl::to($url)
            ->withHeaders($headers)
            ->withData($data)
            ->containsFile()
            ->returnResponseObject()
            ->get();

        return $this->data($response);
    }

    /**
     * @param $response
     * @return array
     */
    protected function data($response)
    {
        if(!isset($response->content)) return $response;

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
