<?php
namespace App\Services\Robots\Blocks;

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

    /**
     * @var object Следующий узел
     */
    protected static $nextNode;

    /**
     * Block constructor.
     * @param string $type
     * @param $edges
     * @param $nodes
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
     * Запустить узел и выполнить действие
     */
    public function run()
    {
        $currentNode = collect($this->nodes)->where('data.props.type', $this->type)->first();

        $currentNode = self::$nextNode ?: $currentNode;
        $currentNodeEdgesSources = collect($this->edges)->where('source', $currentNode->id)->values()->all();

        $currentNodeEdgesSource = $this->getCurrentNodeEdgesSource($currentNode, $currentNodeEdgesSources);

        if ($currentNode->data->props->type == 'action') {
            $this->doAction($currentNode);
        } elseif ($currentNode->data->props->type == 'robot') {
            $this->runRobot($currentNode);
        }

        if ($currentNodeEdgesSource) {
            self::$nextNode = collect($this->nodes)->where('id', $currentNodeEdgesSource->target)->first();
        }
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
        if ($condition->type === "model_field") $conditionBody = $this->getBodyForType($conditionBody);
        $str = '';
        $arr = [];
        foreach ($conditionBody as $item) {
            $arr[] = $this->formExpression($item);
        }
        $str .= ' (' . implode($condition->operator, $arr) . ') ';
        $str = 'if(' .$str .') { return true; } else { return false; }';
        return eval($str);
    }

    /**
     * @param $str
     * @return int|string
     */
    protected function parseModelData($str)
    {
        if (!$this->modelData) return $this->checkIsNumeric($str);
        preg_match_all("#\{\{altrpdata\.(?<fields>[\w]+)\}\}#", $str, $matches);
        if ($matches) {
            $matches = $matches['fields'];
            foreach ($matches as $field) {
                if (in_array($field, $this->modelData['columns'])) {
                    $str = str_replace("{{altrpdata.{$field}}}", $this->modelData['record']->$field, $str);
                }
            }
        }
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
     */
    protected function doAction($node)
    {
        $action = new Action($node, $this->modelData);
        $action->runAction();
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
        return self::$nextNode->data->props->type;
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
    public function isEnd()
    {
        return self::$nextNode->data->props->type == 'end';
    }
}
