<?php

namespace App\Http\Controllers;

use App\Altrp\Robot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RobotController extends Controller
{
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
}
