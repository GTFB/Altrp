<?php

namespace App\Http\Controllers\Constructor;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;

use App\Constructor\GlobalElement;

class GlobalElements extends ApiController
{
    
    /**
     * Получение списка глобальных элементов
     * @return type
     */
    function getElements() {
        $elements = GlobalElement::all();
        return response()->json($elements, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Получение глобального элемента по идентификатору
     * @param Request $request
     * @return type
     */
    function getElement(Request $request) {
        
        $id = $request->element;
        $element = GlobalElement::find($id);
        
        if(!$element) {
            return response()->json(trans("responses.not_found.global_element"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($element, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Добавление глобального элемента
     * @param Request $request
     * @return type
     */
    function insert(ApiRequest $request) {
        
        $request->validate([
            "name" => ["string", "required"],
            "title" => ["string", "required"],
            "data" => ["string", "required"],
        ]);
        
        $element = new GlobalElement();
        $element->name = $request->name;
        $element->title = $request->title;
        $element->data = $request->data;
        $element->user_id = auth()->user()->id;
        
        if($element->save()){
            return response()->json($element, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Обновление глобального элемента
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request) {
        
        $request->validate([
            "name" => ["string", "required"],
            "title" => ["string", "required"],
            "data" => ["string", "required"],
        ]);
        
        $element = GlobalElement::find($request->element);
        
        if(!$element) {
            return response()->json(trans("responses.not_found.global_element"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $element->name = $request->name;
        $element->title = $request->title;
        $element->data = $request->data;
        $element->user_id = auth()->user()->id;
        
        if($element->save()){
            return response()->json($element, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Удаление глобального элемента
     * @param ApiRequest $request
     * @return type
     */
    function trashed(ApiRequest $request) {
        
        $element = GlobalElement::find($request->element);
        
        if(!$element) {
            return response()->json(trans("responses.not_found.global_element"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        if($element->delete()) {
            return response()->json(trans("responses.delete.global_element"), 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("deleteerror"), 400, [],JSON_UNESCAPED_UNICODE);
    }
    
}
