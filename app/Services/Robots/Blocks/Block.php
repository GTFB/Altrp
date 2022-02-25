<?php
namespace App\Services\Robots\Blocks;

use Illuminate\Database\Eloquent\Model;

class Block
{
    /**
     * @var string Тип узла
     */
    protected $type;

    /**
     * @var array Связи узла
     */
    protected $edges;

    /**
     * @var array Список всех узлов
     */
    protected $nodes;

    /**
     * @var array Запись модели
     */
    protected $modelData;

    protected $botData;

    /**
     * @var object Текущий узел
     */
    protected static $currentNode;

    /**
     * @var object Следующий узел
     */
    protected static $nextNode;

    protected static $completedActions = [];

    /**
     * Block constructor.
     * @param string $type
     * @param $edges
     * @param $nodes
     * @param null $modelData
     */
    public function __construct(string $type, $edges, $nodes, $modelData = null)
    {
        $this->type = $type;
        $this->edges = $edges;
        $this->nodes = $nodes;
        $this->modelData = $modelData;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @return array
     */
    public function getBots()
    {
        return collect($this->nodes)->where('data.props.type', 'bot')->toArray();
    }

    /**
     * Запустить узел и выполнить действие
     */
    public function run($updateBot = false)
    {
        if ($this->type == 'start') $currentNode = collect($this->nodes)->where('data.props.type', $this->type)->first();
        else $currentNode = collect($this->nodes)->where('id', $this->type)->first();

        if($updateBot) $this->botData = $updateBot;
                
        $currentNode = self::$nextNode ?: $currentNode;
        $currentNodeEdgesSources = collect($this->edges)->where('source', $currentNode->id)->values()->all();

        $currentNodeEdgesSource = $this->getCurrentNodeEdgesSource($currentNode, $currentNodeEdgesSources);

        if (
            $currentNode->data->props->type === 'documentAction' ||
            $currentNode->data->props->type === 'crudAction' ||
            $currentNode->data->props->type === 'apiAction' ||
            $currentNode->data->props->type === 'messageAction' ||
            $currentNode->data->props->type === 'bot'
        ) {
            $prevAction = $this->doAction($currentNode);

            if (isset($prevAction['record'])) {
                $this->modelData['crudrecord'] = $prevAction['record'];
            }

            $this->savePrevAction($prevAction);
        } elseif ($currentNode->data->props->type == 'robot') {
            $this->runRobot($currentNode);
        }

        if ($currentNodeEdgesSource) {
            self::$nextNode = collect($this->nodes)->where('id', $currentNodeEdgesSource->target)->first();
        }

        if(isset(self::$completedActions['api'])) $this->modelData['altrpapi'] = self::$completedActions['api'];
        if(isset(self::$completedActions['bot'])) $this->modelData['altrpbot'] = self::$completedActions['bot'];

        return self::$completedActions;
    }

    protected function savePrevAction($action)
    {
//        if ($action instanceof Model) {
//            $className = (new \ReflectionClass($action))->getShortName();
//            self::$completedActions[strtolower(get_class($className))] = $action;
//        }
        self::$completedActions[strtolower($action['name'])] = $action['value'];
    }

    /**
     * Получить связь, которая будет выполняться следующей
     * @param $node
     * @param $nodeEdges
     * @return mixed
     */
    protected function getCurrentNodeEdgesSource($node, $nodeEdges)
    {
        $nodeEdges = collect($nodeEdges);
        $source = null;
        if ($node->data->props->type == 'condition') {
            $source = $this->runCondition($node)
                ? $nodeEdges->where('sourceHandle', 'yes')->first()
                : $nodeEdges->where('sourceHandle', 'no')->first();
        } else {
            $source = $nodeEdges->first();
        }
        return $source;
    }

    /**
     * Запустить обработку и выполнение условия
     * @param $node
     * @return mixed
     */
    protected function runCondition($node)
    {
        $condition = $node->data->props->nodeData;
        $conditionBody = $condition->body;
        if (isset($node->data->props->type) && $node->data->props->type === "start")
            $conditionBody = $this->getBodyForType($conditionBody);
        $str = '';
        $arr = [];
        foreach ($conditionBody as $item) {
            $arr[] = $this->formExpression($item);
        }
        $str .= ' (' . implode($condition->operator, $arr) . ') ';
        $str = 'if(' .$str .') { return true; } else { return false; }';

        try {
            return eval($str);
        }
        catch (\Exception $e){
            \Log::info($e->getMessage());
        }
    }

    /**
     * @param $str
     * @return int|string
     */
    protected function parseModelData($str)
    {
        if (!$this->modelData) return $this->checkIsNumeric($str);
        $str = setDynamicData($str, $this->modelData);
        return $this->checkIsNumeric($str);
    }

    /**
     * @param $condPart
     * @return string
     */
    protected function formExpression($condPart)
    {
        $result = '';
        switch ($condPart->operator) {
            case '==':
            case '!=':
            case '<>':
            case '>':
            case '<':
            case '>=':
            case '<=':
                $result = ' (' . $this->parseModelData($condPart->operands[0]) . ' ' . $condPart->operator . ' ' . $this->checkIsNumeric($condPart->operands[1]) . ') ';
                break;
            case 'empty':
            case 'not_empty':
                $operatorBegin = $condPart->operator == 'empty' ? $condPart->operator . '(' : '!empty(';
                $operatorEnd = ')';
                $result = ' (' . $operatorBegin . $this->parseModelData($condPart->operands[0]) . $operatorEnd . ') ';
                break;
            case 'in':
            case 'not_in':
                $operatorBegin = $condPart->operator == 'in' ? '\Str::contains(' : '!\Str::contains(';
                $operatorEnd = ')';
                $result = ' (' . $operatorBegin . $this->parseModelData($condPart->operands[0]) . ', ' . $this->parseModelData($condPart->operands[1]) . $operatorEnd . ') ';
                break;
            case 'null':
            case 'not_null':
                $operator = $condPart->operator == 'null' ? '==' : '!=';
                $result = ' (' . $this->parseModelData($condPart->operands[0]) . ' ' . $operator . ' null' . ') ';
                break;
        }
        return $result;
    }

    /**
     * Проверить, является ли строка числом
     * @param $value
     * @return int|string
     */
    protected function checkIsNumeric($value)
    {
        return (is_numeric($value)) ? $value : "'" . $value . "'";
    }

    /**
     * @param $conditionBody
     * @return array
     */
    protected function getBodyForType($conditionBody)
    {
        $body = [];
        foreach ($conditionBody as $item) {
            $operand1 = $item->operands[0];
            if (is_object($this->modelData["record"])) $item->operands[0] = $this->modelData["record"]->$operand1;
            $body[] = $item;
        }
        return $body;
    }

    /**
     * Выполнить действие
     * @param $node
     * @return bool|mixed|null
     */
    protected function doAction($node)
    {
        $action = new Action($node, $this->modelData);
        return $action->runAction($this->botData);
    }

    /**
     * Выполнить робота
     * @param $node
     */
    protected function runRobot($node)
    {
        $robot = new Robot($node, $this->modelData);
        $robot->runRobot();
    }

    /**
     * @return mixed
     */
    public function getCurrentNode()
    {
        return self::$nextNode->data->props->type ?? 'onstart';
    }

    /**
     * @return mixed
     */
    public function getNextNode()
    {
        return self::$nextNode;
    }

    /**
     * Получить следующий блок
     * @return Block
     */
    public function next()
    {
        return new self(self::$nextNode->data->props->type, $this->edges, $this->nodes, $this->modelData);
    }

    /**
     * Проверить, является ли блок конечным
     * @return bool
     */
    public function isEnd($type = false)
    {
        if ($type) return (self::$nextNode->data->props->type == 'finish' || self::$nextNode->data->props->type == $type);
        else return self::$nextNode->data->props->type == 'finish';
    }


    /**
     * Проверить, Есть ли в блоке кнопки
     * @return bool
     */
    public function isButtons()
    {   
        if (isset(self::$nextNode->data->props->nodeData->data->content)) {
            $content = self::$nextNode->data->props->nodeData->data->content;
            if (is_array($content) && count($content) > 0) {
                foreach ($content as $key => $item) {
                    if ($item->type == "button") {
                        return true;
                    }
                }
            }
        }
        return false;
    }


    /**
     * @return mixed
     */
    public function getCurrentNodeId()
    {
        return self::$nextNode->id;
    }

    /**
     * Проверить условия старта робота
     * @return bool
     */
    public function toStart()
    {
        if (is_array($this->nodes)){
            foreach($this->nodes as $node) {
                if ($node->data->props->type === 'start') {
                    if(empty($node->data->props->nodeData->body)) return true;
                    else return $this->runCondition($node);
                }
            }
        }
        return false;
    }
}
