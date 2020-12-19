<?php

namespace App\Http\Controllers;

use App\Constructor\Robot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RobotController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $robots = Robot::with('user')->get()
            ->each(function (Robot $robot): void {
                $robot->setAttribute('author', $robot->user->name);
            });

        return \response()->json($robots);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $robot = Robot::query()->create([
            'name' => $request->name,
            'data' => json_encode([
                'offset' => [
                    'x' => 0,
                    'y' => 0
                ],
                'scale' => 1,
                'nodes' => [],
                'links' => [],
                'selected' => [],
                'hovered' => []
            ], JSON_FORCE_OBJECT),
            'user_id' => auth()->id()
        ]);

        return \response()->json([
            'redirect_route' => url("/admin/robots-editor?robot_id=$robot->id")
        ]);
    }

    public function show(Robot $robot)
    {
        return \response()->json($robot);
    }

    public function update(Robot $robot, Request $request)
    {
        $robot->update([
            'data' => $request->data
        ]);

        return \response()->json([]);
    }

    public function destroy(Robot $robot): JsonResponse
    {
        $robot->delete();

        return \response()->json([]);
    }
}
