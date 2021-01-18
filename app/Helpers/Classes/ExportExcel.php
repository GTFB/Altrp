<?php

namespace App\Helpers\Classes;

class ExportExcel {

    public $data;

    public $template;

    public $filename;

    public function __construct($data, $template, $filename) {
        $this->data = json_decode($data, true);
        $this->template = false;
        if (file_exists($template))
            $this->template = $template;
        $this->filename = 'report.xlsx';
        if ($filename)
            $this->filename = $filename;
    }

    protected function getDelimiter($file)
    {
        $delimiters = [";" => 0, "," => 0, "\t" => 0, "|" => 0];
        $handle = fopen($file, "r");
        $firstLine = fgets($handle);
        fclose($handle);
        foreach ($delimiters as $delimiter => &$count) {
            $count = count(str_getcsv($firstLine, $delimiter));
        }
        return array_search(max($delimiters), $delimiters);
    }

    protected function getStartRow($worksheet) {
        $row = false;
        for ($i = 0; $i < count($worksheet); $i++) {
            if (!array_filter($worksheet[$i])) {
                if ($row === false)
                    $row = $i;
            }
        }
        if ($row === false)
            $row = 1;
        $row++;
        return $row;
    }

    public function export()
    {
        if ($this->template) {

            $inputFileType = \PhpOffice\PhpSpreadsheet\IOFactory::identify($this->template);
            $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputFileType);
            if ($inputFileType == 'Csv') {
                $reader->setDelimiter($this->getDelimiter($this->template));
            }
            $reader->setReadDataOnly(false);

            $spreadsheet = $reader->load($this->template);

            $sheet = $spreadsheet->getActiveSheet();

            $worksheet = $sheet->toArray();

            $startRow = $this->getStartRow($worksheet);

            $sheet->insertNewRowBefore($startRow + 1, count($this->data) - 1);

        } else {
            $startRow = 1;
            $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        }

        $sheet = $spreadsheet->getActiveSheet();
        $sheet->fromArray($this->data, NULL, 'A' . $startRow);

        // redirect output to client browser
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="'.$this->filename.'"');
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, "Xlsx");
        $writer->save('php://output');

    }

}
