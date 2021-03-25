<?php

namespace App\Http\Controllers;

use App\Altrp\Robot;
use App\Services\Robots\RobotsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RobotController extends Controller
{
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
        $robots = Robot::with('user')->get()->each(function (Robot $robot) {
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
        $result = $robot->save();

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
        return \response()->json($robot);
    }

    /**
     * @param Robot $robot
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Robot $robot, Request $request)
    {
        $data = $request->data;
        $sources = $request->sources;
        $sourceIds = [];

        foreach ($sources as $source) {
            $sourceIds[] = $source->id;
        }

        $robot->sources()->detach($robot->sources);

        foreach ($sourceIds as $id) {
            $robot->sources()->attach($id);
        }

        $result = $robot->update($data);

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
            $result = $this->robotsService->initRobot($robot)->runRobot();
            return response()->json(['success' => $result], $result ? 200 : 500);
        }
        return response()->json(['success' => false], 404);
    }
}
