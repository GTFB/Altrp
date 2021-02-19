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

    public function index(Request $request): JsonResponse
    {
        $robots = Robot::with('user')->get()->each(function (Robot $robot) {
            $robot->setAttribute('author', $robot->user->name);
        });
        return \response()->json($robots);
    }

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

    public function show(Robot $robot)
    {
        return \response()->json($robot);
    }

    public function update(Robot $robot, Request $request)
    {
        $result = $robot->update([
            'chart' => $request->data
        ]);

        return \response()->json(['success' => $result], $result ? 200 : 500);
    }

    public function destroy(Robot $robot): JsonResponse
    {
        $result = $robot->delete();

        return \response()->json(['success' => $result], $result ? 200 : 500);
    }

    public function getOptions(Request $reques)
    {
        $robots = Robot::with('user')->get()->each(function (Robot $robot) {
            $robot->setAttribute('author', $robot->user->name);
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
