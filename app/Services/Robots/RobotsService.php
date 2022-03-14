<?php


namespace App\Services\Robots;


use App\Altrp\Model;
use App\Altrp\Robot;
use App\Chat;
use App\User;
use App\Jobs\SendCurl;
use App\Services\Robots\Blocks\Block;
use App\Services\Robots\Repositories\RobotsRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Str;
use Ixudra\Curl\Facades\Curl;
use App\Services\Robots\Bots\TelegramBot\TelegramBotService;


class RobotsService
{
    use DispatchesJobs;

    protected $data;

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

    protected $robotSources;

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
        $this->robotSources = $robot->sources;
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
            if (isset($item->data->type) && $item->data->type === 'node') {
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


    protected function getDataSources($modelData)
    {
        $arr = [];
        foreach ($this->robotSources as $source) {
            $params = $source->pivot->parameters;
            $params = explode(PHP_EOL, $params);
            $data = [];
            foreach ($params as $param) {
                $paramParts = explode('|', $param);
                $data[trim($paramParts[0], ' ')] = $modelData['app']->request[str_replace(['{{', '}}'], '', trim($paramParts[1], ' '))] ?? null;
            }
            $job = new SendCurl($this->getSourceUrl($source), $source->request_type, $data, [], true);
            $this->dispatchNow($job);
            $res = $job->getResponse();
            $name = Str::snake(strtolower($source->name));
            $arr[$name] = $res;
        }
        return $arr;
    }

    /**
     * Запустить робота
     * @param null $modelData
     * @return bool
     */
    public function runRobot($modelData = [])
    {
        $modelData['sources'] = $this->getDataSources($modelData);

        $this->data = $modelData;  

        $currentAction = $this->getCurrentBlock('start');

        if ($this->robot->start_condition !== 'telegram_bot' && !$currentAction->toStart()) return false;

        if ($this->robot->start_condition === 'telegram_bot') {

                // $start_config = json_decode($this->robot->start_config, true);
                // $bot = new TelegramBotService($start_config['bot_token'], $this);
                // $update = $bot->getUpdates();

                $chat_id = null;
                if (isset($modelData['altrpchat'])) {
                  $chat_id = $modelData['altrpchat']['from']['id'];
                  $user = $this->robot->getUser($modelData['altrpchat']['from']['id'], $modelData['altrpchat']['from']['first_name']);
                  $this->data['altrpuser'] = $user;
                }

                // if (isset($modelData['altrpchat']['data'])) {
                //   $chat = $this->robot->getChat($chat_id);
                //   $currentAction = $this->getCurrentBlock($chat->node_id);
                // }

                if (isset($modelData['altrpchat']['data']) || (isset($modelData['altrpchat']['text']) && $modelData['altrpchat']['text'] !== "/start")) {
                  $chat = $this->robot->getChat($chat_id);
                  $currentAction = $this->getCurrentBlock($chat->node_id);
                }

                do {

                    $currentAction->run();

                    if(!$currentAction->isEnd()){
                      $modelData['altrpchatdata'] = $chat_id ? $this->robot->getChat($chat_id, $currentAction->getCurrentNodeId(), $user ? $user->id : null)->toArray() : null;
                    }
                  
                    $currentAction = $currentAction->next();

                    if ($currentAction->isButtons()) {
                        $currentAction->run();

                        $modelData['altrpchatdata'] = $chat_id ? $this->robot->getChat($chat_id, $currentAction->getCurrentNodeId(), $user ? $user->id : null)->toArray() : null;
                        break;
                    }

                } while(! $currentAction->isEnd());
        } else {
            do {
                $currentAction->run();
                $currentAction = $currentAction->next();
            } while(! $currentAction->isEnd());
        }

        return true;
    }

    /**
     * Получить стартовый блок диаграммы
     * @param $modelData
     * @return Block
     */
    protected function getStartBlock()
    {
        return new Block('start', $this->edges, $this->nodes, $this->data);
    }

    /**
     * Получить текущий блок диаграммы
     * @param $modelData
     * @return Block
     */
    public function getCurrentBlock($id)
    {
        return new Block($id, $this->edges, $this->nodes, $this->data);
    }

    /**
     * @param $source
     * @return string
     */
    public function getSourceUrl($source)
    {
        switch ( $source->sourceable_type ){
            case 'App\SQLEditor':
            case 'App\Altrp\Query':
                return config('app.url') . '/ajax/models/queries' . data_get( $source, 'url' );
            default:
                return $source->type != 'remote'
                    ? config('app.url') . '/ajax/models' . data_get( $source, 'url' )
                    : config('app.url') . '/ajax/models/data_sources/' . $source->model->table->name . '/' . data_get( $source, 'name' );
        }
    }
}
