<?php

namespace App\Http\Controllers\Constructor;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;

use App\Constructor\Template;
use Illuminate\Support\Str;

class Templates extends ApiController
{

    /**
     * Получение списка прав действия
     * @return type
     */
    function getTemplates() {
        $templates = Template::all();
        return response()->json($templates, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение права доступа по идентификатору
     * @param Request $request
     * @return type
     */
    function getTemplate(Request $request) {

        $id = $request->template;
        $template = Template::find($id);

        if(!$template) {
            return response()->json(trans("responses.not_found.template"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json($template, 200, [],JSON_UNESCAPED_UNICODE);

    }

  /**
   * Добавление права действия
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
    function insert(ApiRequest $request) {

        $request->validate([
            "name" => ["string", "required"],
            "title" => ["string", "required"],
            "data" => ["array", "required"],
        ]);

        $template = new Template();
        $template->name = $request->name;
        $template->title = $request->title;
        $template->data = json_encode( $request->data );
        $template->type = 'template'; //1
        $template->user_id = auth()->user()->id;
        $template->guid = (string)Str::uuid();

        if($template->save()){
            return response()->json($template, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Обновление права действия
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request) {

      $request->validate([
        "name" => ["string", "required"],
        "title" => ["string", "required"],
        "data" => ["array", "required"],
      ]);

      $old_template = Template::find( $request->template );

      if( ! $old_template ) {
        return response()->json(trans("responses.not_found.template"), 404, [],JSON_UNESCAPED_UNICODE);
      }

      $review = new Template( $old_template->toArray() );
      $review->parent_template = $old_template->id;
      $review->type = 'review';
      if( ! $review->save() ){
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
      }
      $old_template->name = $request->name;
      $old_template->title = $request->title;
      $old_template->data = json_encode( $request->data );
      $old_template->type = 'template'; //1
      $old_template->user_id = auth()->user()->id;

      if( $old_template->save() ){
          return response()->json($old_template, 200, [],JSON_UNESCAPED_UNICODE);
      }

      return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Удаление права действеия
     * @param ApiRequest $request
     * @return type
     */
    function delete(ApiRequest $request) {

        $template = Template::find($request->template);

        if(!$template) {
            return response()->json(trans("responses.not_found.template"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        if($template->delete()) {
            return response()->json(trans("responses.delete.template"), 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("deleteerror"), 400, [],JSON_UNESCAPED_UNICODE);
    }

}
