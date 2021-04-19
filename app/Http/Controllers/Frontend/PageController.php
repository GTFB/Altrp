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
    $page = Page::find( $page_id );

    if( ! $page ){
      return response()->json( [
        'message'=> 'Not Found'
      ], 404, [], JSON_UNESCAPED_UNICODE );
    }
    $res = [
      'areas' => Page::get_areas_for_page( $page_id )
    ];

    return response()->json( $res );
  }
  /**
   * @param string $template_id
   * @return \Illuminate\Http\JsonResponse
   */
  public function cardTemplate( $template_id ){


//    $page = Page::find( $page_id );
//
//    if( ! $page ){
//      return response()->json( [
//        'message'=> 'Not Found'
//      ], 404, [], JSON_UNESCAPED_UNICODE );
//    }
//    $res = [
//      'areas' => Page::get_areas_for_page( $page_id )
//    ];
//
//    return response()->json( $res );
  }

}