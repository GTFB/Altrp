<?php


namespace App\Services\Robots;


use App\Altrp\Model;
use App\Altrp\Robot;
use App\Services\Robots\Blocks\Block;
use App\Services\Robots\Repositories\RobotsRepository;

class RobotsService
{
    /**
     * @var Robot объект робота
     */
    protected $robot;

    /**
     * @var array Список блоков диаграммы робота
     */
    protected $robotChartList;

    /**
     * @var array Список узлов диаграммы
     */
    protected $nodes;

    /**
     * @var array Список связей диаграммы
     */
    protected $edges;

    /**
     * @var RobotsRepository Хранилище для управления роботами в БД
     */
    protected $robotsRepo;

    /**
     * RobotsService constructor.
     * @param RobotsRepository $robotsRepo
     */
    public function __construct(RobotsRepository $robotsRepo)
    {
        $this->robotsRepo = $robotsRepo;
    }

    /**
     * Получить всех роботов текущей модели
     * @param Model|null $model
     * @return mixed
     */
    public function getCurrentModelRobots(Model $model = null)
    {
        return $this->robotsRepo->getByModelRobots($model);
    }

    /**
     * Получить всех роботов, которые привязаны к опредлённому условию запуска
     * @param string $condition
     * @return mixed
     */
    public function getStartConditionRobots(string $condition)
    {
        return $this->robotsRepo->getRobotsByStartConditionType($condition);
    }

    /**
     * Инициализировать робота
     * @param $robot
     * @return $this
     */
    public function initRobot($robot)
    {
        $this->robot = $robot;
        $this->robotChartList = json_decode($robot->chart);
        $this->appointChartItems();
        return $this;
    }

    /**
     * @return Robot Получить робота
     */
    public function getRobot()
    {
        return $this->robot;
    }

    /**
     * Сформировать узлы и связи диаграммы роботов
     */
    protected function appointChartItems()
    {
        $nodes = [];
        $edges = [];
        foreach ($this->robotChartList as $item) {
            if (isset($item->data->props)) {
                $nodes[] = $item;
            } else {
                $edges[] = $item;
            }
        }
        $this->nodes = $nodes;
        $this->edges = $edges;

    }

    /**
     * Получить свойства узла
     * @param $node
     * @return mixed
     */
    protected function getNodeProperties($node)
    {
        return $node->data->props;
    }

    /**
     * Запустить робота
     * @return bool
     */
    public function runRobot($modelData = null)
    {
        $currentAction = $this->getStartBlock($modelData);

        do {
            $currentAction->run();
            $currentAction = $currentAction->next();
        } while(! $currentAction->isEnd());

        return true;
    }

    /**
     * Получить стартовый блок диаграммы
     * @return Block
     */
    protected function getStartBlock($modelData)
    {
        return new Block('begin', $this->edges, $this->nodes, $modelData);
    }
}
