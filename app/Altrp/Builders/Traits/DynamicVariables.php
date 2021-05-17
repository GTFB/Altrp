<?php


namespace App\Altrp\Builders\Traits;


use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

trait DynamicVariables
{
    /**
     * @var
     */
    protected $str;

    /**
     * @var string
     */
    protected $pattern = '#\{\{[^\{]*\}\}#';

    /**
     * @var
     */
    protected $matches;

    /**
     * @var
     */
    protected $match;

    /**
     * @var
     */
    protected $outer;

    /**
     * Заменить пользовательские динамические переменные
     *
     * @param $str
     * @param bool $outer
     * @return string|string[]
     */
    protected function replaceDynamicVars($str, $outer = false)
    {
        $this->str = $str;
        $this->outer = $outer;
        $this->pregMatches();
        foreach ($this->matches as $match) {
            $this->match = $match;
            $this->replacePrefix()
                ->replaceCurrentUser()
                ->replaceRequest()
                ->replaceAndRequest()
                ->replaceIfAndRequest('_AND')
                ->replaceCurrentDate()
                ->replaceCurrentDay()
                ->replaceCurrentDayOfWeek()
                ->replaceCurrentDateTime()
                ->replaceCurrentMonth()
                ->replaceCurrentYear()
                ->replaceCurrentHour()
                ->replaceCurrentMinute()
                ->replaceCurrentSecond()
                ->replaceCurrentTime();
        }
        return $this->str;
    }

    /**
     * Найти совпадения
     */
    public function pregMatches()
    {
        preg_match_all($this->pattern, $this->str, $matches);
        $this->matches = array_unique($matches[0]);
    }

    /**
     * Заменить переменные на данные HTTP запроса
     * @return $this
     */
    public function replaceRequest()
    {
        if (Str::contains($this->match, 'REQUEST') && !Str::contains($this->match, 'IF_')) {
            $trimedMatch = trim($this->match, '{}');
            $parts = explode(':', $trimedMatch);
            $relations = $this->getNesting(explode('.', $parts[1]));
            $this->str = str_replace(
                $this->match,
                $this->getValue('request()->' . $relations, $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * @param string $and
     * @return $this
     */
    protected function replaceAndRequest($and = '')
    {
        if (Str::contains($this->match, 'IF' . $and . '_REQUEST')) {
            $trimedMatch = trim($this->match, '{}');
            $parts = explode(':', $trimedMatch);
            $parts[3] = $parts[3] ?? '=';
            list($wrapStart, $value, $wrapEnd) = $this->checkUnixTime($parts[2]);
            list($startLike, $endLike, $operator) = isset($parts[3]) && \Str::contains($parts[3], 'LIKE')
                ? $this->getSqlLikeExp($parts[3])
                : ['','',$parts[3]];
            $parts[3] = $operator;
            $wrapStart = $wrapStart ? $wrapStart : "'\'{$endLike}' .";
            $wrapEnd = $wrapEnd ? $wrapEnd : ". '{$startLike}\''";
            $parts[2] = $value;
            $request = "request()->{$parts[2]}";
            if (Str::contains($parts[3], 'IN')) {
                $wrapStart = '';
                $parts[3] .= '(';
                $wrapEnd = " . ')'";
                $request = "'\"' . implode('\",\"', explode(',', request()->name )). '\"'";
            }
            $this->str = str_replace($this->match,
                $this->getValue( '(request()->' . $parts[2]
                . " ? ' " . ($and ? ' ' . trim($and, '_') : '')
                . " {$parts[1]} {$parts[3]} ' . {$wrapStart}{$request}{$wrapEnd} : '')", $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * @param $and
     * @return $this
     */
    protected function replaceIfAndRequest($and)
    {
        return $this->replaceAndRequest($and);
    }

    /**
     * Заменить на данные текущего пользователя
     * @return $this
     */
    public function replaceCurrentUser()
    {
        if (Str::contains($this->match, 'CURRENT_USER')) {
            $trimedMatch = trim($this->match, '{}');
            $parts = explode(':', $trimedMatch);
            $relations = $this->getNesting(explode('.', $parts[1]));
            $this->str = str_replace(
                $this->match,
                stripslashes($this->getValue('auth()->user()->' . $relations, $this->outer)),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на префикс к таблицам в БД
     * @return $this
     */
    public function replacePrefix()
    {
        if (Str::contains($this->match, 'PREFIX')) {
            $this->str = str_replace($this->match, DB::getTablePrefix(), $this->str);
        }
        return $this;
    }

    /**
     * Заменить текущую дату
     * @return $this
     */
    protected function replaceCurrentDate()
    {
        if (Str::contains($this->match, 'CURRENT_DATE')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'Y-m-d\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущий день
     * @return $this
     */
    protected function replaceCurrentDay()
    {
        if (Str::contains($this->match, 'CURRENT_DAY')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'d\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущий месяц
     * @return $this
     */
    protected function replaceCurrentMonth()
    {
        if (Str::contains($this->match, 'CURRENT_MONTH')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'m\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущий год
     * @return $this
     */
    protected function replaceCurrentYear()
    {
        if (Str::contains($this->match, 'CURRENT_YEAR')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'Y\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущий год
     * @return $this
     */
    protected function replaceCurrentHour()
    {
        if (Str::contains($this->match, 'CURRENT_HOUR')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'H\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущий год
     * @return $this
     */
    protected function replaceCurrentMinute()
    {
        if (Str::contains($this->match, 'CURRENT_MINUTE')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'i\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущий год
     * @return $this
     */
    protected function replaceCurrentSecond()
    {
        if (Str::contains($this->match, 'CURRENT_SECOND')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'s\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущее время
     * @return $this
     */
    protected function replaceCurrentTime()
    {
        if (Str::contains($this->match, 'CURRENT_TIME')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'H:i:s\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на текущий таймстемп
     * @return $this
     */
    protected function replaceCurrentDateTime()
    {
        if (Str::contains($this->match, 'CURRENT_DATETIME')) {
            $this->str = str_replace(
                $this->match,
                $this->getValue('Carbon::now()->format(\'Y-m-d H:i:s\')', $this->outer),
                $this->str
            );
        }
        return $this;
    }

    /**
     * Заменить на название текущего дня недели
     * @return $this
     */
    protected function replaceCurrentDayOfWeek()
    {
        if (Str::contains($this->match, 'CURRENT_DAY_OF_WEEK')) {
            $this->str = str_replace($this->match, $this->getValue('Carbon::now()->format(\'l\')', $this->outer), $this->str);
        }
        return $this;
    }

    /**
     * Получить отформатированную строку с замененными значениями
     * @return mixed
     */
    public function getStr()
    {
        return $this->str;
    }

    /**
     * Получить и сформировать вложенность элементов
     * @param $elements
     * @return string
     */
    protected function getNesting($elements)
    {
        $nesting = '';
        for ($i = 0; $i < count($elements); $i++) {
            if (isset($elements[$i]) && $i != 0 && is_numeric($elements[$i])) {
                $nesting .= '[' . $elements[$i] . ']';
            } elseif ($i == 0) {
                $nesting .= $elements[$i];
            } else {
                $nesting .= '->' . $elements[$i];
            }
        }
        return $nesting;
    }

    /**
     * Получить значение
     *
     * @param $value
     * @param $outer
     * @return string
     */
    protected function getValue($value, $outer)
    {
        if ($outer) return '" . ' . $value . ' . "';
        return $value;
    }

    /**
     * Прооверить наличие временнОго UNIX выражения в запросе
     * и обернуть request в это выражение
     *
     * @param $value
     * @return array
     */
    protected function checkUnixTime($value)
    {
        $value = str_replace(';', ':', str_replace('\"', '"', $value));
        $wrapStart = '';
        $wrapEnd = '';
        if (Str::contains($value, 'FROM_UNIXTIME')) {
            $result = explode('|', $value);
            $wrapStart = "'{$result[0]}' . ";
            $value = $result[1];
            $wrapEnd = " . '{$result[2]}'";
        }
        if (Str::contains($value, 'IN')) {
            \Log::info($value);
        }
        return [$wrapStart, $value, $wrapEnd];
    }

    /**
     * Сформировать и получить выражение для SQL оператора LIKE
     * @param $operator
     * @return string[]
     */
    protected function getSqlLikeExp($operator)
    {
        $startLike = '';
        $endLike = '';
        if ($operator == 'START_LIKE' || $operator == 'LIKE') {
            $startLike = '%';
        }
        if ($operator == 'END_LIKE' || $operator == 'LIKE') {
            $endLike = '%';
        }
        $operator = 'LIKE';
        return [$startLike, $endLike, $operator];
    }
}
