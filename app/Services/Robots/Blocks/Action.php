<?php


namespace App\Services\Robots\Blocks;


use App\Altrp\ExportExcel;
use App\Altrp\ExportWord;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Jobs\SendCurl;
use App\Notifications\RobotNotification;
use App\User;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class Action
{
    use DispatchesJobs;

    /**
     * @var object Узел диаграммы
     */
    protected $node;

    /**
     * @var string Запись модели
     */
    protected $modelData;

    /**
     * Action constructor.
     * @param $node
     * @param null $modelData
     */
    public function __construct($node, $modelData = null)
    {
        $this->node = $node;
        $this->modelData = $modelData;
    }

    /**
     * Запустить действие в зависимости от типа
     */
    public function runAction($botData = null)
    {
        $res = [
            'name' => '',
            'value' => '',
            'record' => '',
        ];
        switch ($this->getNodeProperties()->nodeData->type) {
            case 'crud':
                $res = $this->execCrud();
                break;
            case 'send_notification':
                $res = $this->sendNotification();
                break;
            case 'api':
                $res = $this->sendApiRequest();
                break;
            case 'document':
                $res = $this->generateDocument();
                break;
            case 'bot':
                $res = $this->execBot($botData);
                break;
        }
        return $res;
    }

    /**
     * Отправить API запрос
     * @return array
     */
    protected function sendApiRequest()
    {
        $source = Source::find($this->getNodeProperties()->nodeData->data->source);
        $res = [];
        if ($source) {
            $url = $source->url;
            $method = $source->request_type;
            $name = $source->name;
        } else {
            $url = $this->getNodeProperties()->nodeData->data->url;
            $method = $this->getNodeProperties()->nodeData->data->method;
            $name = $this->getNodeProperties()->nodeData->data->name;
        }

        $params = $this->getNodeProperties()->nodeData->data->data;
        $data = [];

        if ($params) {
            $params = explode(PHP_EOL, $params);
            foreach ($params as $param) {
                $paramParts = explode('|', $param);
                $val = setDynamicData(trim($paramParts[1], ' '), $this->modelData);
                $default = $paramParts[2] ?? null;
                $data[trim($paramParts[0], ' ')] = $val != null ? $val : $default; // $modelData['app']->request[str_replace(['{{', '}}'], '', trim($paramParts[1], ' '))] ?? null;
            }
        }

        $job = new SendCurl($url, $method, $data, [], true);
        $job->delay(2);
        $this->dispatchNow($job);
        $res = $job->getResponse();

        $source = strtolower(implode('_', explode(' ', $name)));

        return [
            'name' => 'api',
            'value' => [ $source => $res]
        ];
    }

    protected function getLabelForBot($shortcode)
    {
        $result = false;
        if (is_array($this->getNodeProperties()->nodeData->data->content)){
            foreach ($this->getNodeProperties()->nodeData->data->content as $item){
                if (isset($item->data->shortcode) && $item->data->shortcode === $shortcode) $result = $item->data->text;
            }
        }
        return $result;
    }

    protected function execBot($botData)
    {
        $res = [];
        if ($botData){
            $value = setDynamicData($botData->callback_query->data, $this->modelData);
            $label = setDynamicData($this->getLabelForBot($botData->callback_query->data), $this->modelData);
            $key = setDynamicData($this->getNodeProperties()->nodeData->data->shortcode, $this->modelData);

            if ($key) {
                $res[$key]['value'] = $value;
                $res[$key]['label'] = $label;
            }
        }
        return [
            'name' => 'bot',
            'value' => $res
        ];
    }

    /**
     * Выполнить операцию в базе данных (CRUD)
     * @return mixed
     */
    protected function execCrud()
    {
        $data = json_decode(json_encode($this->node->data->props->nodeData->data->body), true);
        $custom = $this->node->data->props->nodeData->data->custom ?? false;
        $custom_data = $this->node->data->props->nodeData->data->custom_data ?? false;

        $newData = [];
        if ($custom && $custom_data) {

            $params = preg_split('/\r\n|\r|\n/', $custom_data);
            foreach ($params as $param) {
                $paramParts = explode('|', $param);

                $key = trim($paramParts[0]);
                $value = setDynamicData(trim($paramParts[1]), $this->modelData);
                if ($value === "null") $value = null;

                $newData[$key] = $value;
            }
        }
        foreach ($data as $key => $value) {
            $newData[$key] = setDynamicData($value, $this->modelData);
        }

        $model = Model::find($this->node->data->props->nodeData->data->model_id);
        $modelNamespace = $model->parent ? $model->parent->namespace : $model->namespace;
        $modelClass = '\\' . $modelNamespace;

        $method = $this->node->data->props->nodeData->data->method;
        $result = false;

        if ($method == 'create') {
            $entity = new $modelClass($newData);
            $result = $entity->$method($newData);
        } elseif ($method == 'delete') {
            $entity = $this->getRecord($modelClass);
            if ($entity) $result = $entity->$method();
        } else {
            $entity = $this->getRecord($modelClass);
            if ($entity) $result = $entity->$method($newData);
        }

        return [
            'name' => $model->name,
            'value' => $result,
            'record' => $entity ? $entity->first()->toArray() : '',
        ];
    }

    /**
     * Получить запись модели
     * @return mixed
     */
    protected function getRecord($model)
    {
        $result = false;
        $params = setDynamicData($this->node->data->props->nodeData->data->record, $this->modelData);

        if ($params) {
            $params = preg_split('/\r\n|\r|\n/', $params);
            $data = [];
            foreach ($params as $param) {
                $paramParts = explode('|', $param);

                $key = trim($paramParts[0]);

                $value = trim($paramParts[1]);
                if ($value === "null") $value = null;

                if (isset($paramParts[2])) $operator = trim($paramParts[2]);
                else $operator = '=';

                $data[] = [$key, $operator, $value];
            }
            $result = $model::where($data);
        }

        return $result;
    }

    /**
     * Отправить уведомление
     * @return array
     */
    protected function sendNotification()
    {
        $entitiesData = $this->getNodeProperties()->nodeData->data->entitiesData;
        $entities = $this->getNodeProperties()->nodeData->data->entities;
        $users = $this->getRequiredUsers($entities, $entitiesData);

        if ((is_array($users) && empty($users)) || !$users->isEmpty()) {
            Notification::send($users, new RobotNotification($this->node, $this->modelData));
        } else {
            Notification::route('user', 'anonymous')->notify(new RobotNotification($this->node, $this->modelData));
        }
        return [
            'name' => 'notice',
            'value' => true
        ];
    }

    /**
     * Сгенерировать документ
     * @return array
     */
    protected function generateDocument()
    {
        $docData = $this->getNodeProperties()->nodeData->data->docData;
        $resultData = [];

        try {
            if ($docData) {
                preg_match("#\{\{([^{}]+):([^{}]+)\}\}#", $docData, $matches);
                if ($matches[1] === 'altrpmodel') {
                    $model = Model::where('name', $matches[2])->first();
                    $modelNamespace = $model->parent ? $model->parent->namespace : $model->namespace;
                    $modelClass = '\\' . $modelNamespace;
                    $resultData = [
                        'data' => $modelClass::all()->toArray()
                    ];

                    $resultData = json_encode($resultData);
                }
                if ($matches[1]  === 'altrpsource') {
                    $source = Source::where('name', $matches[2])->first();
                    $url = $source->url;
                    $method = $source->request_type;

                    $job = new SendCurl($url, $method, [], [], true);
                    $job->delay(2);
                    $this->dispatchNow($job);
                    $resultData = [
                        'data' => $job->getResponse()
                    ];

                    $resultData = json_encode($resultData);
                }
            }
        } catch (\Exception $e) {
            \Log::info($e->getMessage());
        }

        $fileName = $this->getNodeProperties()->nodeData->data->fileName;
        $type = $this->getNodeProperties()->nodeData->data->type;
        $template = $this->getNodeProperties()->nodeData->data->template;

        if ($type === 'excel') {
            $document = new ExportExcel($resultData, $template, $fileName);
            $document->export('robot');

            return ['name' => 'document', 'value' => true];
        }

        if ($type === 'word') {
            $document = new ExportWord($resultData, $template, $fileName);
            $document->export('robot');

            return ['name' => 'document', 'value' => true];
        }
        if ($type === 'presentation') {
        }

        return [
            'name' => 'document',
            'value' => false
        ];
    }

    /**
     * Получить свойства узла
     * @return mixed
     */
    protected function getNodeProperties()
    {
        return $this->node->data->props;
    }

    /**
     * Получить пользователей, которых нужно уведомить
     * @param $type
     * @param $entities
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    protected function getRequiredUsers($type, $entities)
    {
        if ($type == 'dynamic') {
            $field = $entities->dynamicValue;
            $columnName = 'id';
            $users = collect();
            $value = setDynamicData($entities->dynamicValue, $this->modelData);
            if (isset($this->modelData['record']) && !Str::contains($field, "{{"))
                $value = $this->modelData['record']->$field;
            if (Str::contains($field, "|")) {
                $field = explode('|', $field);
                $fieldOne = str_replace(' ', '', $field[1]);
                $value = setDynamicData($fieldOne, $this->modelData);
                $columnName = str_replace(' ', '', $field[0]);
            }
            $users = User::where($columnName, $value)->get();
        } else {
            if (is_object($entities) && $type != 'all') {
                $users = isset($entities->users) && !empty($entities->users) ? User::whereIn('id', $entities->users) : null;
                if (isset($entities->roles) && !empty($entities->roles)) {
                    $roles = $entities->roles;
                    $users = $users ? $users->whereHas('roles', function ($q) use ($roles) {
                        $q->whereIn('roles.id', $roles);
                    }) : User::whereHas('roles', function ($q) use ($roles) {
                        $q->whereIn('roles.id', $roles);
                    });
                }
                $users = isset($users) ? $users->get() : [];
            } else {
                $users = User::all();
            }
        }
        return $users;
    }
}
