<?php

namespace App\Http\Controllers\Constructor;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;

use App\Constructor\Template;
use App\Constructor\TemplateHistory;

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
        
        $template->history;
        
        if(!$template) {
            return response()->json(trans("responses.not_found.template"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($template, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Добавление права действия
     * @param Request $request
     * @return type
     */
    function insert(ApiRequest $request) {
        
        $request->validate([
            "name" => ["string", "required"],
            "title" => ["string", "required"],
            "data" => ["string", "required"],
            "type" => ["integer", "required"],
        ]);
        
        $template = new Template();
        $template->name = $request->name;
        $template->title = $request->title;
        $template->data = $request->data;
        $template->type = $request->type; //1
        $template->user_id = auth()->user()->id;
        
        if($template->save()){
            
            $history = $template->history()->create([
                "name" => $template->name,
                "title" => $template->title,
                "data" => $template->data,
                "type" => $template->type,
                "user_id" => auth()->user()->id,
                "template_id" => $template->id
            ]);
            
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
            "data" => ["string", "required"],
            "type" => ["integer", "required"],
        ]);
        
        $template = Template::find($request->template);
        
        if(!$template) {
            return response()->json(trans("responses.not_found.template"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $template->name = $request->name;
        $template->title = $request->title;
        $template->data = $request->data;
        $template->type = $request->type; //1
        $template->user_id = auth()->user()->id;
        
        if($template->save()){
            
            $history = $template->history()->create([
                "name" => $template->name,
                "title" => $template->title,
                "data" => $template->data,
                "type" => $template->type,
                "user_id" => auth()->user()->id,
                "template_id" => $template->id
            ]);
            
            return response()->json($template, 200, [],JSON_UNESCAPED_UNICODE);
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
