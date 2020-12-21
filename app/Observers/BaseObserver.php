<?php


namespace App\Observers;

use App\Notifications\CommonNotification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Notification;

class BaseObserver
{
    /**
     * Отправить уведомления в зависимости от переданных настроек
     * @param Model $model
     * @param $noticeSettings
     * @param $otherData
     */
    protected function sendNotifications(Model $model, $noticeSettings, $otherData)
    {
        if ($noticeSettings) {
            foreach ($noticeSettings as $setting) {
                foreach ($setting->conditions as $condition) {
                    if ($condition->enabled) {
                        $type = $condition->type == 'All' ? '&&' : '||';
                        $compares = [];
                        foreach ($condition->compares as $compare) {
                            if ($compare->enabled) {
                                if (! in_array($compare->name, $otherData['columns'])) {
                                    continue;
                                }
                                $compares[] = $this->getCompared($model, $compare);
                            }
                        }
                        $str = "return " . implode(" $type ", $compares) . ";";
                        $cond = eval($str);
                        if ($cond) {
                            $this->send($setting->noticed, $model, $setting, $otherData);
                        }
                    }
                }
            }
        }
    }

    /**
     * Отправить уведомление
     * @param $noticed
     * @param $model
     * @param $settings
     * @param $otherData
     */
    protected function send($noticed, $model, $settings, $otherData)
    {
        Notification::send($noticed, new CommonNotification($model, $settings, $otherData));
    }

    /**
     * Сфоримровать и получить сопоставимое условие
     * @param $model
     * @param $compare
     * @return string
     */
    protected function getCompared($model, $compare)
    {
        $name = $compare->name;
        $operator = $compare->operator;
        $value = is_numeric($compare->value) ? $compare->value : "'{$compare->value}'";
        $result = '';
        switch ($operator) {
            case '==':
            case '!=':
            case '<>':
            case '>':
            case '<':
            case '>=':
            case '<=':
                $result = '$model->' . $name . ' ' . $operator . ' ' . $value;
                break;
            case 'empty':
            case 'not_empty':
                $operatorBegin = $operator == 'empty' ? $operator . '(' : '!empty(';
                $operatorEnd = ')';
                $result = $operatorBegin . '$model->' . $name . $operatorEnd;
                break;
            case 'in':
            case 'not_in':
                $operatorBegin = $operator == 'in' ? '\Str::contains(' : '!' . '!\Str::contains(';
                $operatorEnd = ')';
                $result = $operatorBegin . '$model->' . $name . ', ' . $value . $operatorEnd;
                break;
            case 'null':
            case 'not_null':
                $operator = $operator == 'null' ? '==' : '!=';
                $result = '$model->' . $name . ' ' . $operator . ' null';
                break;
        }

        return $result;
    }
}
