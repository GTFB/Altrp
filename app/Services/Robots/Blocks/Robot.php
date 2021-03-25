<?php


namespace App\Services\Robots\Blocks;


use App\Jobs\SendGetCurl;
use Illuminate\Foundation\Bus\DispatchesJobs;

class Robot
{
    use DispatchesJobs;

    /**
     * @var object Узел диаграммы
     */
    protected $node;

    /**
     * @var object Узел диаграммы
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
     * Запусить робота
     */
    public function runRobot()
    {
        $robotId = $this->getNodeProperties()->nodeData->id;
        $this->dispatch(new SendGetCurl('http://altrp.nz/altrp_run_robot/' . $robotId));
//        $robot = \App\Altrp\Robot::where([
//            ['id', $robotId],
//            ['start_condition', 'action']
//        ])->first();
//        $robotsService->initRobot($robot)->runRobot();
    }

    /**
     * Получить свойства узла
     * @return mixed
     */
    protected function getNodeProperties()
    {
        return $this->node->data->props;
    }
}
