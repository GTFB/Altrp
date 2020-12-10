<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Artisan;
use Exception;
use Illuminate\Http\Request;

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
        
        return response()->json(['success'=> $enadled], 200, [],JSON_UNESCAPED_UNICODE);
    }

}
