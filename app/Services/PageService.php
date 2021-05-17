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
      if ($frontend_route != '/')
        $frontend_route = rtrim($frontend_route, '/');
      $pattern2 = '/:(.+)((\/)|$)/U';
      preg_match_all( $pattern2, $path, $matches );
      $argument_index = false;
      foreach ($matches[0] as $idx => $item) {

        if( strpos( $item, ':id') !== false ) {
          $argument_index = true;
        }
      }

      preg_match_all('/\{[a-z0-9_]+\}/', $frontend_route, $matches);
      $params = '';
      $id = null;
      foreach ($matches[0] as $i => $param) {
        $parameter = str_replace(['{', '}'], '', $param);
        $params .= '$' . $parameter;
        if ($parameter == 'id')
          $id = '$' . $parameter;
        if ($i != count($matches[0] ) - 1) $params .= ', ';
      }

      $data = [
        'frontend_route_id' => $_frontend_route['id'],
        'title' => "'$title'",
        'frontend_route' => "'$frontend_route'",
        'argument_index' => $argument_index ? $argument_index : 'false',
        'params' => $params,
        'model_id'  => $id ?: '0'
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
