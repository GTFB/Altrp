<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;


class ExportXml extends Model
{
    const TEMPLATES_ROOT = 'modules/reports/templates/';

    public $data;

    public $filename;

    public function __construct($data, $filename)
    {
        $this->data = iconv('windows-1251', 'UTF-8', $data);
        $this->data = json_decode($this->data, true);
        $this->filename = 'report.xml';
        if ($filename)
            $this->filename = $filename;
    }

    public function arrayToXML($array, \SimpleXMLElement $xml, $child_name)
    {
      foreach ($array as $k => $v) {
        if(is_array($v)) {
          (is_int($k)) ? $this->arrayToXML($v, $xml->addChild($child_name), $v) : $this->arrayToXML($v, $xml->addChild(strtolower($k)), $child_name);
        } else {
          (is_int($k)) ? $xml->addChild($child_name, $v) : $xml->addChild(strtolower($k), $v);
        }
      }

      return $xml->asXML();
    }

    public function export()
    {
        try {
            $xml = $this->arrayToXML($this->data, new \SimpleXMLElement('<root/>'), 'product');
            $dom = new \DOMDocument;
            $dom->preserveWhiteSpace = FALSE;
            $dom->loadXML($xml);
            $filename = storage_path() . '/tmp/' . $this->filename . '.xml';
            $dom->save($filename);
            readfile($filename);
            unlink($filename);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }
}
