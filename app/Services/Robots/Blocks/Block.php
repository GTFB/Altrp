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
     * @var string Запись модели
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
            $arr[] = ' (' . $item->operands[0] . ' ' . $item->operator . ' ' . $item->operands[1] . ') ';
        }
        $str .= ' (' . implode($condition->operator, $arr) . ') ';
        $str = 'if(' .$str .') { return true; } else { return false; }';
        return eval($str);
    }

    /**
     * Запустить обработку и выполнение условия
     * @param $node
     * @return mixed
     */
    protected function getBodyForType($conditionBody)
    {
        $body = [];
        foreach ($conditionBody as $item) {
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
