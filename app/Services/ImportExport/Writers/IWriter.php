<?php


namespace App\Services\ImportExport\Writers;


interface IWriter
{
    public function createJsonFile(string $path, string $filename, $data);
}
