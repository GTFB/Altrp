<?php


namespace App\Altrp\Generators;


use App\Altrp\Generators\Request\RequestFile;

class RequestGenerator
{
    public function generate(RequestFile $request)
    {
        dump($request->getFile());
    }
}
