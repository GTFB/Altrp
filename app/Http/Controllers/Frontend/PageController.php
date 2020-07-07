<?php


namespace App\Http\Controllers\Frontend;


use App\Page;

class PageController
{

  public function show( $page_id ){
    $res = Page::find( $page_id )->toArray();

    return response()->json($res);
  }
}