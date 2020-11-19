<?php

namespace App\Http\Middleware;

use App\Services\AltrpInputStreamService;
use Closure;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ParseMultipartFormDataInputForNonPostRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->method() == 'POST' OR $request->method() == 'GET') {
            return $next($request);
        }

        if (preg_match('/multipart\/form-data/', $request->headers->get('Content-Type')) or
            preg_match('/multipart\/form-data/', $request->headers->get('content-type'))
        ) {
            $params = [];
            new AltrpInputStreamService($params);
            $files = $params['file'];
            $parameters = $params['post'];
            if ($files) {
                foreach ($files as $key => $param) {
                    $file = new UploadedFile($param['tmp_name'], $param['name'], $param['type'], $param['error']);
                    if ($file instanceof UploadedFile) {
                        $files[$key] = [$file];
                    }
                }
            }
            if (count($files) > 0) {
                $request->files->add($files);
            }
            if (count($parameters) > 0) {
                $request->request->add($parameters);
            }
        }
        return $next($request);
    }
}
