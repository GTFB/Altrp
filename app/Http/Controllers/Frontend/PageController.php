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

  /**
   * Вернуть js файл скомпилировнный для altrp
   * @param $page_id
   */
  public function app( $page_id ){
    /**
     * @var $page Page
     */
    $page = Page::find( $page_id );

    if ( ! $page ){
      return response()->json( ['success' => false,], 404, [], JSON_UNESCAPED_UNICODE );
    }

    return response( $page->getAppString(), 200, [
      'Content-Type' => 'application/javascript; charset=UTF-8',
    ] );
  }
}
