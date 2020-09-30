<?php


namespace App\Altrp\Builders\Traits;


use Illuminate\Support\Facades\DB;

trait DynamicVariables
{
    /**
     * Заменить пользовательские динамические переменные
     *
     * @param $str
     * @param bool $outer
     * @return string|string[]
     */
    protected function replaceDynamicVars($str, $outer = false)
    {
        $pattern = "'?(CURRENT_[A-Z_]+|([A-Z_]+)?REQUEST)(:[a-zA-Z0-9_.]+)?(:[a-zA-Z0-9_.]+)?'?";
        $str = preg_replace_callback(
            "#$pattern#",
            function($matches) use ($outer) {
                $param = $matches[0] ? explode(':',trim($matches[0], '\'')) : null;
                if ($param && $param[0] == 'REQUEST') {
                    return $this->getValue('request()->' . $param[1], $outer);
                }
                if ($param && $param[0] == 'IF_REQUEST') {
                    return $this->getValue( '(request()->' . $param[2] . " ? '{$param[1]} = ' . request()->{$param[2]} : '')", $outer);
                }
                if ($param && $param[0] == 'IF_AND_REQUEST') {
                    return $this->getValue( '(request()->' . $param[2] . " ? ' AND {$param[1]} = ' . request()->{$param[2]} : '')", $outer);
                }
                if ($param && $param[0] == 'CURRENT_USER') {
                    $relations = str_replace('.', '->', $param[1]);
                    return $this->getValue('auth()->user()->' . $relations, $outer);
                }
                if ($param && $param[0] == 'CURRENT_DATE') {
                    return $this->getValue('Carbon::now()->format(\'Y-m-d\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_DAY') {
                    return $this->getValue('Carbon::now()->format(\'d\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_MONTH') {
                    return $this->getValue('Carbon::now()->format(\'m\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_YEAR') {
                    return $this->getValue('Carbon::now()->format(\'Y\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_HOUR') {
                    return $this->getValue('Carbon::now()->format(\'H\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_MINUTE') {
                    return $this->getValue('Carbon::now()->format(\'i\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_SECOND') {
                    return $this->getValue('Carbon::now()->format(\'s\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_TIME') {
                    return $this->getValue('Carbon::now()->format(\'H:i:s\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_DATETIME') {
                    return $this->getValue('Carbon::now()->format(\'Y-m-d H:i:s\')', $outer);
                }
                if ($param && $param[0] == 'CURRENT_DAY_OF_WEEK') {
                    return $this->getValue('Carbon::now()->format(\'l\')', $outer);
                }
                return "''";
            },
            $str
        );
      /**
       * Заменим префикс БД
       */
      $str = str_replace( '{{PREFIX}}', DB::getTablePrefix(), $str );
      return $str;
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
}
