<?php

namespace App\Http\Controllers;

use App\Altrp\Generators\Schedule\ScheduleFileWriter;
use App\Altrp\Robot;
use App\Helpers\Classes\CurrentEnvironment;
use App\Jobs\RunRobotsJob;
use App\Services\Robots\RobotsService;
use App\Services\Robots\Bots\TelegramBot\TelegramBotService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Str;
use App\CategoryObject;


class RobotController extends Controller
{
    use DispatchesJobs;

    /**
     * @var RobotsService
     */
    private $robotsService;

    /**
     * RobotController constructor.
     * @param RobotsService $robotsService
     */
    public function __construct(RobotsService $robotsService)
    {
        $this->robotsService = $robotsService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        
        $search = $request->get('s');
        $categories = $request->get('categories');
        $page = $request->get('page', 1);
        $orderColumn = $request->get('order_by') ?? 'name';
        $orderColumn = 'altrp_robots.' . $orderColumn;
        $limit = $request->get('pageSize', 10);
        $offset = $limit * ($page - 1);
        $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
        $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);

        $robots = Robot::select('altrp_robots.*')->with(['user', 'categories.category'])
            ->when($categories, function ($query, $categories) {
                if (is_string($categories)) {
                    $categories = explode(",", $categories);
                    $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_robots.guid')
                          ->whereIn('altrp_category_objects.category_guid', $categories);
                }
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('altrp_robots.name','like', '%'.$search.'%')
                          ->orWhere('altrp_robots.id','like', '%'.$search.'%');
                });
            })
            ->when(($offset == 0 || $offset > 0) && $limit, function ($query) use ($offset, $limit) {
                $query->skip($offset)->take($limit);
            })
            ->$sortType($orderColumn)
            ->get()->each(function (Robot $robot) {
                $robot->setAttribute('author',data_get( $robot, 'user.name', ''));
            });

        return \response()->json($robots);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $data['user_id'] = auth()->id();
        $robot = new Robot($data);
        $robot->guid = (string)Str::uuid();
        $result = $robot->save();

        $categories = $request->get( '_categories' );
        if( is_array($categories) && count($categories) > 0 && $robot->guid){
          $insert = [];
          foreach($categories as $key => $category){
            $insert[$key] = [
              "category_guid" => $category['value'],
              "object_guid" => $robot->guid,
              "object_type" => "Robot"
            ];
          }
          CategoryObject::insert($insert);
        }

        //dd($insert);

        return \response()->json([
            'success' => $result,
            'redirect_route' => url("/admin/robots-editor?robot_id=$robot->id")
        ]);
    }

    /**
     * @param Robot $robot
     * @return JsonResponse
     */
    public function show(Robot $robot)
    {
        $robot->categories = $robot->categoryOptions();
        return \response()->json($robot);
    }

    /**
     * @param Robot $robot
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Robot $robot, Request $request)
    {
        if (isset($request->power)){
            $robot->enabled = $robot->enabled ? 0 : 1;
            $result = $robot->save();
            return \response()->json(['success' => $result], $result ? 200 : 500);
        }

        $data = $request->data;

        $sources = isset($request->sources) ? json_decode(collect($request->sources)->toJson()) : [];

        $sourceIds = [];
        $sourceParams = [];

        foreach ($sources as $source) {

            $sourceIds[] = $source->id;
            $sourceParams[$source->id] = $source->parameters;
        }

        $robot->sources()->detach($robot->sources);

        foreach ($sourceIds as $id) {
            $robot->sources()->attach($id, [
                'parameters' => $sourceParams[$id]
            ]);
        }

        $result = $robot->update($data);

        // CategoryObject::where("object_guid", $robot->guid)->delete();
        // $categories = $request->get( '_categories' );
        // if( is_array($categories) && count($categories) > 0 && $robot->guid){
        //   $insert = [];
        //   foreach($categories as $key => $category){
        //     $insert[$key] = [
        //       "category_guid" => $category['value'],
        //       "object_guid" => $robot->guid,
        //       "object_type" => "Robot"
        //     ];
        //   }
        //   CategoryObject::insert($insert);
        // }

        $writer = new ScheduleFileWriter(app_path('Console/Kernel.php'));
        $command = 'robot:run ' . $robot->id;
        if ($writer->scheduleExists($command)) {
            $writer->removeSchedule($command);
        }

        if (isset($data['start_condition']) && $data['start_condition'] == 'cron') {
            $config = is_string($data['start_config'])
                ? json_decode($data['start_config'])
                : json_decode(json_encode($data['start_config']));
            $writer->write(
                'robot:run ' . $robot->id,
                $config->period,
                $config->restrictions
            );
        }

        if (isset($data['start_condition']) && $data['start_condition'] == 'telegram_bot' && $data['start_config']['bot_token'] && $data['enabled'] && !$robot->is_active) {
                $result = $this->dispatch(new RunRobotsJob(
                    [$robot],
                    $this->robotsService,
                    [],
                    'telegram_bot',
                    array_change_key_case( getenv() )
                ));
                return response()->json(['success' => $result], $result ? 200 : 500);
        }
        return \response()->json(['success' => $result], $result ? 200 : 500);
    }

    /**
     * @param Robot $robot
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Robot $robot): JsonResponse
    {
        $result = $robot->delete();
        CategoryObject::where("object_guid", $robot->guid)->delete();

        return \response()->json(['success' => $result], $result ? 200 : 500);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getOptions(Request $request)
    {
        $robots = Robot::with('user')->get()->each(function (Robot $robot) {
            $robot->setAttribute('author',data_get( $robot, 'user.name', ''));
        });

        $options = [];
        foreach ($robots as $robot) {
            $options[] = [
                'value' => $robot->id,
                'label' => $robot->name,
            ];
        }
        return $options;
    }

    /**
     * Запустить робота
     * @param $robot_id
     * @return JsonResponse
     */
    public function runRobot($robot_id)
    {
        $robot = Robot::where([
            ['id', $robot_id],
            ['start_condition', 'action']
        ])->first();


        if ($robot && $robot->enabled) {
//            $result = $this->robotsService->initRobot($robot)->runRobot();
            $result = $this->dispatch(new RunRobotsJob(
                [$robot],
                $this->robotsService,
                [],
                'action',
                CurrentEnvironment::getInstance()
            ));
            return response()->json(['success' => $result], $result ? 200 : 500);
        }
        return response()->json(['success' => false], 404);
    }
}
