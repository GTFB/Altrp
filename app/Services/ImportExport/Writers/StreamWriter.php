<?php


namespace App\Services\ImportExport\Writers;

use Violet\StreamingJsonEncoder\StreamJsonEncoder;

/**
 * Class StreamWriter
 * @package App\Services\ImportExport\Writers
 */
class StreamWriter extends Writer implements IWriter
{

    /**
     * @param string $path
     * @param string $filename
     * @param $data
     * @return mixed
     */
    public function createJsonFile(string $path, string $filename, $data)
    {
        $file_path = $path."/".$filename;
        $this->checkDirectoryExist($path);
        $this->checkFileExist($file_path);
        $fp = fopen(storage_path( $file_path ), 'wb');
        $encoder = new StreamJsonEncoder(
            $data,
            function ($json) use ($fp) {
                fwrite($fp, $json);
            }
        );

        $encoder->encode();
        fclose($fp);
        return $file_path;
    }
}
