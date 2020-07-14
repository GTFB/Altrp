<?php

namespace App\Exceptions;

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

        if ($exception instanceof RouteGenerateFailedException) {
            return $exception->render($request);
        }

        if ($request->ajax() || $request->isJson() || $request->wantsJson()) {

            if ($exception instanceof QueryException) {
                return response()->json([
                    'message' => $exception->getMessage()
                ], 500, [], JSON_UNESCAPED_UNICODE);
            }

            return response()->json([
                'message' => $exception->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }

        return parent::render($request, $exception);
    }
}
