<?php


namespace App\Http\Controllers\Frontend;


use App\Page;

class PageController
{
  /**
   * Отдает данные страницы как модели для динамического контента
   * @param $page_id
   * @return \Illuminate\Http\JsonResponse
   */
  public function show( $page_id ){
    $res = Page::find( $page_id )->toArray();

    return response()->json($res);
  }

  /**
   * @param string $page_id
   * @return \Illuminate\Http\JsonResponse
   */
  public function pageForRoutes( $page_id ){
    $res = Page::find( $page_id );

    if( ! $res ){
      return response()->json( $res, 404, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json($res);
  }
}