<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Ixudra\Curl\Facades\Curl;

class SendCurl implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $url;

    protected $method;

    protected $headers;

    protected $data;

    protected $asJson;

    private $response;


    /**
     * Create a new job instance.
     *
     * @param $url
     * @param $method
     * @param array $data
     * @param array $headers
     * @param bool $asJson
     */
    public function __construct($url, $method, $data = [], $headers = [], $asJson = false)
    {
        $this->url = $url;
        $this->method = $method;
        $this->data = $data;
        $this->headers = $headers;
        $this->asJson = $asJson;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $method = $this->method;
        $this->response = Curl::to($this->url)
            ->withData($this->data)
            ->withHeaders($this->headers)
            ->asJson($this->asJson)
            ->asJsonResponse(true)
            ->$method();
    }

    /**
     * @return mixed
     */
    public function getResponse()
    {
        return $this->response['data'] ?? $this->response;
    }
}
