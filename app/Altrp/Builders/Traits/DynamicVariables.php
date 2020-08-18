<?php


namespace App\Altrp\Builders\Traits;


trait DynamicVariables
{
    /**
     * Заменить пользовательские динамические переменные
     *
     * @param $str
     * @return string|string[]
     */
    protected function replaceDynamicVars($str)
    {
        $pattern = "'?(CURRENT_[A-Z_]+|REQUEST)(:[a-z0-9_.]+)?'?";
        $str = preg_replace_callback(
            "#$pattern#",
            function($matches) {
                $param = $matches[0] ? explode(':',trim($matches[0], '\'')) : null;
                if ($param && $param[0] == 'REQUEST') {
                    return 'request()->' . $param[1];
                }
                if ($param && $param[0] == 'CURRENT_USER') {
                    $relations = str_replace('.', '->', $param[1]);
                    return 'auth()->user()->' . $relations;
                }
                if ($param && $param[0] == 'CURRENT_DATE') {
                    return 'Carbon::now()->format(\'Y-m-d\')';
                }
                if ($param && $param[0] == 'CURRENT_DAY') {
                    return 'Carbon::now()->format(\'d\')';
                }
                if ($param && $param[0] == 'CURRENT_MONTH') {
                    return 'Carbon::now()->format(\'m\')';
                }
                if ($param && $param[0] == 'CURRENT_YEAR') {
                    return 'Carbon::now()->format(\'Y\')';
                }
                if ($param && $param[0] == 'CURRENT_HOUR') {
                    return 'Carbon::now()->format(\'H\')';
                }
                if ($param && $param[0] == 'CURRENT_MINUTE') {
                    return 'Carbon::now()->format(\'i\')';
                }
                if ($param && $param[0] == 'CURRENT_SECOND') {
                    return 'Carbon::now()->format(\'s\')';
                }
                if ($param && $param[0] == 'CURRENT_TIME') {
                    return 'Carbon::now()->format(\'H:i:s\')';
                }
                if ($param && $param[0] == 'CURRENT_DATETIME') {
                    return 'Carbon::now()->format(\'Y-m-d H:i:s\')';
                }
                if ($param && $param[0] == 'CURRENT_DAY_OF_WEEK') {
                    return '\Carbon::now()->format(\'l\')';
                }
                return "''";
            },
            $str
        );
        return $str;
    }
}
