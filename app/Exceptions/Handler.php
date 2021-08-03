<?php

namespace App\Exceptions;

use App\Exceptions\Controller\ControllerFileException;
use App\Exceptions\Repository\RepositoryFileException;
use App\Exceptions\Route\RouteFileException;
use App\Page;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Exception $exception)
    {

        if ($exception instanceof TableNotFoundException) {
            return $exception->render($request);
        }

        if ($exception instanceof RelationshipNotInsertedException) {
            return $exception->render($request);
        }

        if ($exception instanceof PermissionNotWrittenException) {
            return $exception->render($request);
        }

        if ($exception instanceof ModelNotWrittenException) {
            return $exception->render($request);
        }

        if ($exception instanceof AccessorNotFoundException) {
            return $exception->render($request);
        }

        if ($exception instanceof AccessorNotWrittenException) {
            return $exception->render($request);
        }

        if ($exception instanceof ColumnNotFoundException) {
            return $exception->render($request);
        }

        if ($exception instanceof ParseFormulaException) {
            return $exception->render($request);
        }

        if ($exception instanceof CommandFailedException) {
            return $exception->render($request);
        }

        if ($exception instanceof ControllerNotWrittenException) {
            return $exception->render($request);
        }

        if ($exception instanceof ControllerFileException) {
            return $exception->render($request);
        }

        if ($exception instanceof RouteGenerateFailedException) {
            return $exception->render($request);
        }

        if ($exception instanceof RouteFileException) {
            return $exception->render($request);
        }

        if ($exception instanceof RepositoryFileException) {
            return $exception->render($request);
        }

      if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException)
      {

        $not_found_page = Page::firstWhere( 'not_found', 1 );
        if( $not_found_page && strpos( $request->url(), 'favicon.ico' ) === false
          && strpos( $request->url(), '/ajax' ) === false
          && strpos( $request->url(), '/%7B%7BURL%7D%7D' ) === false
          && strpos( $request->url(), '/storage/' ) === false
          && strpos( $request->url(), '/modules/admin/' ) === false
          && strpos( $request->url(), '/modules/editor/' ) === false
          && strpos( $request->url(), '/modules/front-app/' ) === false
        ){
          logger('URL:' . $request->url());
          global $altrp_env;
          global $altrp_current_page;
          $altrp_current_page = $not_found_page;
          $preload_content = Page::getPreloadPageContent( $not_found_page['id'] );
          $lazy_sections = [];
          $preload_content['content'] = replaceContentWithData( $preload_content['content'] );
          $page_areas = Page::get_areas_for_page( $not_found_page['id'] );
          $elements_list = extractElementsNames( $page_areas );
          $altrp_settings = getAltrpSettings( $not_found_page['id'] );

          return response( view( 'front-app', [
            'page_areas' => json_encode( $page_areas ),
            'page_id' => $not_found_page['id'],
            'lazy_sections' => json_encode( $lazy_sections ),
            'elements_list' => json_encode( $elements_list ),
            'title' => $not_found_page['title'],
            '_frontend_route' => $not_found_page,
            'preload_content' => $preload_content,
            'altrp_settings' => json_encode( $altrp_settings ),
            'pages'=>Page::get_pages_for_frontend( true ),
            'model_data' => null,
            'is_admin' => isAdmin(),
          ]), 200 );
        }
      }

        if ($request->ajax() || $request->isJson() || $request->wantsJson()) {

            if ($exception instanceof QueryException) {
                return response()->json([
                    'message' => $exception->getMessage()
                ], 500, [], JSON_UNESCAPED_UNICODE);
            }

//            return response()->json([
//                'message' => $exception->getMessage()
//            ], 500, [], JSON_UNESCAPED_UNICODE);
        }

        return parent::render($request, $exception);
    }
}
