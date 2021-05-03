<?php


namespace App\Altrp\Generators\Schedule;


use App\Altrp\Generators\BaseFileWriter;
use Illuminate\Support\Str;

class ScheduleFileWriter extends BaseFileWriter
{
    protected $kernelFile;

    protected $kernelFileContent;

    protected $stubFile;

    public function __construct($kernelFile)
    {
        $this->kernelFile = $kernelFile;
        $this->kernelFileContent = file($this->kernelFile, 2);
        $this->stubFile = $this->getStubFile('Altrp/Commands/stubs/schedules/create_schedule.stub');
        parent::__construct();
    }

    public function write($command, $period, $restrictions)
    {
        $period = $this->getPeriod($period, $restrictions);
        $restrictions = $this->getRestrictions($restrictions);
        $stubContent = $this->getStubFileContent($this->stubFile);
        $this->replaceCommand($stubContent, $command)
            ->replacePeriod($stubContent, $period)
            ->replaceRestrictions($stubContent, $restrictions);
        return $this->writeToKernel($stubContent);
    }

    protected function getPeriod($period, $restrictions) {
        $start = '->';
        $end = '()';
        if ($period->name == 'hourlyAt') {
            $end = '(' . $period->time . ')';
        } elseif ($period->name == 'dailyAt' || $period->name == 'timezone') {
            $end = "('" . $period->time . "')";
        }

        if (!$restrictions) {
            $end .= ';';
        }

        return $start . $period->name . $end;
    }

    protected function getRestrictions($restrictions) {
        if (!$restrictions) return '';
        $start = '->';
        $end = '()';

        $restrictionList = '';

        foreach ($restrictions as $restriction) {
            if ($restriction->name == 'between') {
                if (is_object($restriction->time)) {
                    $end = "('" . $restriction->time->start . "', '" . $restriction->time->end . "')";
                }

                $restrictionList .= $start . $restriction->name . $end;
            } elseif ($restriction->name == 'when') {
                $restrictionList .= $start . $restriction->name . '(function () { return ' . $restriction->time->condition . ';})';
            } else {
                $restrictionList .= $start . $restriction->name . $end;
            }

        }

        return $restrictionList . ';';
    }

    public function removeSchedule($schedule)
    {
        $kernelFileContent = file($this->kernelFile, 2);
        if ($line = $this->scheduleExists($schedule)) {
            unset($kernelFileContent[$line]);
        }
        return \File::put(
            $this->kernelFile,
            implode(PHP_EOL, $kernelFileContent)
        );
    }

    public function scheduleExists($schedule)
    {
        $kernelFileContent = file($this->kernelFile, 2);
        foreach ($kernelFileContent as $line => $content) {
            if (Str::contains($content, "command('{$schedule}')")) {
                return $line;
            }
        }
        return false;
    }

    protected function writeToKernel($stubContent)
    {
        $kernelFileContent = file($this->kernelFile, 2);
        foreach ($kernelFileContent as $line => $content) {
            if (Str::contains($content, 'CUSTOM_SCHEDULES_END')) {
                if (! $stubContent) break;

                foreach ($stubContent as $l => $c) {
                    array_splice($kernelFileContent, $line, 0, $c);
                }
            }
        }
        return file_put_contents(
                $this->kernelFile,
                implode(PHP_EOL, $kernelFileContent)
            ) !== false;
    }

    protected function replaceCommand(&$stubContent, $command)
    {
        $stubContent = str_replace('{{command}}', $command, $stubContent);
        return $this;
    }

    protected function replacePeriod(&$stubContent, $period)
    {
        $stubContent = str_replace('{{period}}', $period, $stubContent);
        return $this;
    }

    protected function replaceRestrictions(&$stubContent, $restrictions)
    {
        $stubContent = str_replace('{{restrictions}}', $restrictions, $stubContent);
        return $this;
    }
}
