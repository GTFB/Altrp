<?php


namespace App\Services;


use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteWriter;
use App\Page;

class PageService
{
  /**
   * Обновить все маршруты пользовательских страниц
   * @param Page $page
   */
  public function updatePageRoutes(Page $page)
  {
    $frontend_routes = Page::get_frontend_routes();
    $content = ['<?php'];

    $routeFile = new RouteFile($page, config('altrp.admin.page_routes'));
    $stubFile = app_path('Altrp/Commands/stubs/routes/create_page_route.stub');
    $writer = new RouteWriter($routeFile, $stubFile);

    foreach ( $frontend_routes as $_frontend_route ) {
      $path = $_frontend_route['path'];
      $title = $_frontend_route['title'];
      $pattern1 = '/:(.+)((\/)|$)/U';
      $replacement1 = '{$1}/';
      $frontend_route = preg_replace( $pattern1, $replacement1, $path );
      $pattern2 = '/:(.+)((\/)|$)/U';
      preg_match_all( $pattern2, $path, $matches );
      $argument_index = false;
      foreach ($matches[0] as $idx => $item) {
        if( strpos( $item, ':id') !== false ) {
          $argument_index = $idx;
        }
      }

      if( $argument_index !== false && $_frontend_route['model'] ) {
        $model = $_frontend_route['model']->toArray();
        if( isset( $model['namespace'] ) ){
          try {
            $model = new $model['namespace'];
            $model_data = $model->find( func_get_arg( $argument_index ) )->toArray();
          } catch( \Exception $e ) {
            $model_data = [];
          }
        }
      } else {
        $model_data = [];
      }

      $preload_content = Page::getPreloadPageContent( $_frontend_route['id'] );

      $page_areas = Page::get_areas_for_page( $_frontend_route['id'] );
      $lazy_sections = Page::get_lazy_sections_for_page( $_frontend_route['id'] );
      $elements_list = extractElementsNames( $page_areas );

      if (Page::isCached( $_frontend_route['id'] )) {

        global $altrp_need_cache;
        $altrp_need_cache = true;
        global $altrp_route_id;
        $altrp_route_id = $_frontend_route['id'];

      }

      $data = [
        'view_data' => [
          'page_areas' => $page_areas,
          'lazy_sections' => $lazy_sections,
          'elements_list' => $elements_list,
          'page_id' => $_frontend_route['id'],
          'title' => $title,
          '_frontend_route' => $_frontend_route,
          'pages' => Page::get_pages_for_frontend( true ),
          'preload_content' => $preload_content,
          'model_data' => $model_data,
          'is_admin' => 'isAdmin()',
        ],
        'frontend_route' => $frontend_route
      ];

      $content[] = $writer->getWritableContent($data);
    }

    $writer->writeToFile($routeFile->getFile(), implode(PHP_EOL, $content));

    if ($page) {
      if (!$page->is_cached) {
        Page::clearAllCacheById($page->id);
      }
    }
  }


}
