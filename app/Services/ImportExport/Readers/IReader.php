<?php


namespace App\Services\ImportExport\Readers;


interface IReader
{
    public function readJsonFile(string $path);
}
