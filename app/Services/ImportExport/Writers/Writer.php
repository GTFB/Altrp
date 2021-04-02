<?php


namespace App\Services\ImportExport\Writers;


use Illuminate\Support\Facades\File;

abstract class Writer implements IWriter
{

    protected function checkDirectoryExist(string $path) {
        if(!File::exists(storage_path($path))) {
            File::makeDirectory(storage_path($path));
        }
    }

    protected function checkFileExist(string $path) {
        if(!File::exists(storage_path($path))) {
            File::delete(storage_path($path));
        }
    }

}
