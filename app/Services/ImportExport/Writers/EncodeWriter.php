<?php


namespace App\Services\ImportExport\Writers;

use Illuminate\Support\Facades\File;

/**
 * Class StreamWriter
 * @package App\Services\ImportExport\Writers
 */
class EncodeWriter extends Writer implements IWriter
{
    /**
     * @param string $path
     * @param string $filename
     * @param $data
     * @return bool|int
     */
    public function createJsonFile(string $path, string $filename, $data)
    {
        $file_path = $path."/".$filename;
        $this->checkDirectoryExist($path);
        $this->checkFileExist($file_path);
        $content = json_encode( $data );
        try{
            File::put( storage_path( $file_path ), $content);
        }
        catch(\Exception $e) {
            return false;
        }

        return true;
    }
}
