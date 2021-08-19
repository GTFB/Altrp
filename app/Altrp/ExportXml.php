<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;


class ExportXml extends Model
{
    const TEMPLATES_ROOT = 'modules/reports/templates/';

    public $data;

    public $filename;

    public function __construct($data, $filename)
    {
        //$this->data = iconv('windows-1251', 'UTF-8', $data);
        $this->data = json_decode($data, true);
        $this->filename = 'report.xml';
        if ($filename)
            $this->filename = $filename;
    }

    public function arrayToXML($array, \SimpleXMLElement $xml, $child_name)
    {
      //dd($array);
	  foreach ($array as $k => $v) {
		  
        if(is_array($v)) {
			if (is_int($k)) {
				$this->arrayToXML($v, $xml->addChild($child_name), $v);
			} else {
				$k = str_replace("\n", '', $k);
				$k = str_replace("select some...", '', strtolower($k));
				$k = str_replace("№", 'number', $k);
				$k = str_replace(" ", '', $k);
				$this->arrayToXML($v, $xml->addChild(strtolower($k)), $child_name);
			}
        } else {
			if (is_int($k)) { 
				$xml->addChild($child_name, $v); 
			} else {
				$k = str_replace("\n", '', $k);
				$k = str_replace("select some...", '', strtolower($k));
				$k = str_replace("№", 'number', $k);
				$k = str_replace(" ", '', $k);
				$xml->addChild(strtolower($k), $v);
			}	
        }
      }

      return $xml->asXML();
    }

    public function export()
    {
        try {
            $xml = $this->arrayToXML($this->data, new \SimpleXMLElement('<?xml version="1.0" encoding="utf-8"?><catalog></catalog>'), 'product');
            $dom = new \DOMDocument;
            $dom->preserveWhiteSpace = FALSE;
            $dom->loadXML($xml);
            $filename = storage_path() . '/app/public/' . $this->filename . '.xml';
            $dom->save($filename);
			
			
            //unlink($filename);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }
}
