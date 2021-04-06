<?php


namespace App\Services\ImportExport\Readers;


use Illuminate\Support\Facades\File;

class JsonDecodeReader implements IReader
{

    /**
     * @param string $path
     * @return mixed
     */
    public function readJsonFile(string $path)
    {
        $data = File::get( $path );
        return json_decode( $data, true );
    }
}
