<?php


namespace App\Services\ImportExport\Readers;


use JsonStreamingParser\Listener\InMemoryListener;
use JsonStreamingParser\Parser;

class JsonStreamingReader implements IReader
{

    /**
     * @param string $path
     * @return mixed
     */
    public function readJsonFile(string $path)
    {
        $listener = new InMemoryListener();
        $stream = fopen( $path, 'r');
        try {
            $parser = new Parser($stream, $listener);
            $parser->parse();
            fclose($stream);
        } catch (Exception $e) {
            fclose($stream);
            throw $e;
        }

        return $listener->getJson();
    }
}
