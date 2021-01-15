<?php

namespace App\Observers;

use App\Notifications\CommonNotification;
use Exception;
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
    protected function sendNotifications(Model $model, $noticeSettings, $otherData){

        if (is_object($noticeSettings)) {
            
            foreach ($noticeSettings as $setting) {

                if (is_array($setting->conditions)) {
                    
                    $array_enabled_conditions = [];
                    
                    foreach ($setting->conditions as $condition) {
                        
                        if ($condition->enabled) {
                            
                            $type = $condition->type == 'all' ? '&&' : '||';
                            $compares = [];

                            foreach ($condition->compares as $compare) {
                                if ($compare->enabled && in_array($compare->name, $otherData['columns'])) $compares[] = $this->getCompared($model, $compare);
                            }
                            if (!empty($compares)) $array_enabled_conditions[] = implode(" $type ", $compares);
                        }                     
                    }

                    // если conditions нет или активных conditions нет, то сообщение отправляется
                    if (count($setting->conditions) === 0 || count($array_enabled_conditions) === 0) {
                        $this->send($model, $setting, $otherData);
                    } else {
                        $str = "return (" . implode(" ) && ( ", $array_enabled_conditions) . ");";

                        try { $result = eval($str); }
                        catch( Exception $e){ response()->json(['success' => false, 'message' => $e->getMessage()], 500); }

                        if ($result) $this->send($model, $setting, $otherData);                       
                    }    
                }                
            }
        }
    }

    /**
     * Отправить уведомление
     * @param $noticed
     * @param $model
     * @param $setting
     * @param $otherData
     */
    protected function send($model, $setting, $otherData){
        Notification::send($setting->noticed, new CommonNotification($model, $setting, $otherData));
    }

    /**
     * Сформировать и получить сопоставимое условие
     * @param $model
     * @param $compare
     * @return string
     */
    protected function getCompared($model, $compare){
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
                $operatorBegin = $operator == 'in' ? '\Str::contains(' : '!\Str::contains(';
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
