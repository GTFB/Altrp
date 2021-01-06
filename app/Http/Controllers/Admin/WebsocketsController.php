<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Artisan;
use Exception;
use Illuminate\Http\Request;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class WebsocketsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $enadled = $request->get('enabled');

        if ($enadled){
            try{
                // $value = time();
                // DotenvEditor::setKey( "PUSHER_APP_KEY", $value );
                // DotenvEditor::save();
                $exit_code = Artisan::call('config:clear');              
                $exit_code = Artisan::call('websockets:serve');
            }
            catch(Exception $e){
                return response()->json(['error'=> true], 500, [],JSON_UNESCAPED_UNICODE);
            }    
        } else {
            try{
                $exit_code = Artisan::call('websockets:restart');
            }
            catch(Exception $e){
                return response()->json(['error'=> true], 500, [],JSON_UNESCAPED_UNICODE);
            }
        }        
        return response()->json(['success'=> true, 'checked'=> !$enadled], 200, [],JSON_UNESCAPED_UNICODE);
    }
}
