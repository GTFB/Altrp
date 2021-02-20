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
     * Action constructor.
     * @param $node
     */
    public function __construct($node)
    {
        $this->node = $node;
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
