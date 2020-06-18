<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;


class ModelsController extends Controller
{
  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function models_list()
  {
    $test_res = [
      [
        'name' => 'post',
        'title' => 'Post',
        'ordering_fields' => [
          ['title' => 'Title',],
          ['date' => 'Date',],
          ['random' => 'Random',],
        ],
      ],
      [
        'name' => 'model1',
        'title' => 'Model 1',
        'ordering_fields' => [
          ['name' => 'Name',],
          ['date' => 'Date',],
          ['random' => 'Random',],
        ],
      ],
    ];
    return response()->json( $test_res );
  }
}