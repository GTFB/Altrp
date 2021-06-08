<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ExportWord extends Model
{
    const TEMPLATES_ROOT = 'modules/reports/templates/';

    public $data;

    public $template;

    public $filename;

    public function __construct($data, $template, $filename)
    {
        $this->data = json_decode($data, true);
        $this->template = false;
        if (file_exists($template))
            $this->template = $template;
        $this->filename = 'report.docx';
        if ($filename)
            $this->filename = $filename;
        //echo $this->filename;
    }

    public function export($type = false)
    {
        try {
            if ($this->template) {

                if (!empty($this->data)) {
                    $_doc = new \PhpOffice\PhpWord\TemplateProcessor($this->template);
                    foreach ($this->data as $key => $dd) {
                        if (is_array($dd)) {
                            $firstKey = array_key_first($dd[0]);
                            $_doc->cloneRowAndSetValues($firstKey, $dd);
                        } else {
                            $_doc->setValue($key, $dd);
                        }
                    }
                } else {
                    return new \Exception('Не переданы данные');
                }

            } else {
                return new \Exception('Не выбран шаблон');
            }
            /*
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $this->filename . '"');
            header('Cache-Control: max-age=0');
            */
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($this->filename).'.docx"');

            if (!file_exists(storage_path() . '/tmp/')) mkdir(storage_path() . '/tmp/');
            $filename = storage_path() . '/tmp/' . $this->filename . '.docx';

            if ($type === 'robot') {
                if (!file_exists(storage_path() . '/document/')) mkdir(storage_path() . '/document/');
                $filename = storage_path() . '/document/' . $this->filename . '.docx';
            }

            $_doc->saveAs($filename);
            readfile($filename);

            if ($type !== 'robot') unlink($filename);

        } catch (\Exception $e) {
            \Log::info($e->getMessage());
        }
    }
}
