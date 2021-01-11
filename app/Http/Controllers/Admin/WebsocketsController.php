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
        $reset = $request->get('reset');

        // сброс соединения (на всякий случай)
        $exit_code = Artisan::call('websockets:restart');        

        if($reset) $this->resetCount(); 

        if ($enadled){
            try{
                $checkPusher = $this->checkPusher();
                $checkKey = $this->checkKey();

                if(!$checkPusher) return response()->json(['error'=> "Ошибка записи данных пушера в env"], 500, [],JSON_UNESCAPED_UNICODE);
                if(!$checkKey) return response()->json(['error'=> "Ошибка проверки ключа"], 500, [],JSON_UNESCAPED_UNICODE);
                
                // очистка кэша
                $exit_code = Artisan::call('config:clear');

                $item_port = "ALTRP_SETTING_WEBSOCKETS_PORT";
                $port = false;

                // получение значений порта
                if( DotenvEditor::keyExists( $item_port ) ) $port = DotenvEditor::getValue( $item_port );

                if(empty($port)){
                    try{
                        // При отсутствии порта, ему присваивается дефолтное значение (6001)
                        DotenvEditor::setKey( $item_port, "6001" );
                        DotenvEditor::save();
                        $exit_code = Artisan::call('config:clear');
                  
                    } catch (Exception $e){
                        return response()->json(['error'=> "Ошибка записи $item_port"], 500, [],JSON_UNESCAPED_UNICODE);
                    }
                    
                    $exit_code1 = Artisan::call( 'websockets:serve' );

                } else {
                    $exit_code1 = Artisan::call( 'websockets:serve --port=' . $port );
                }

            }
            catch(Exception $e){
                return response()->json(['error'=> true], 500, [],JSON_UNESCAPED_UNICODE);
            }    
        } else {
            try{
                $exit_code1 = Artisan::call('websockets:restart');
            }
            catch(Exception $e){
                return response()->json(['error'=> "Ошибка остановки вебсокет-сервера"], 500, [],JSON_UNESCAPED_UNICODE);
            }
        }        
        return response()->json(['success'=> true, 'checked'=> !$enadled], 200, [],JSON_UNESCAPED_UNICODE);
    }

    // Сброс настроек и очистка кеша
    public function resetCount(){
        try{
            DotenvEditor::setKey( "ALTRP_SETTING_WEBSOCKETS_PORT", "6001" );
            DotenvEditor::setKey( "ALTRP_SETTING_PUSHER_APP_KEY", "12345678" );
            DotenvEditor::save();
            $exit_code = Artisan::call('config:clear');
        }
        catch(Exception $e){
            return response()->json(['error'=> "Ошибка сброса"], 500, [],JSON_UNESCAPED_UNICODE);
        }
    }

    // Проверка ключа
    public function checkKey(){

        $item_key = "ALTRP_SETTING_PUSHER_APP_KEY";
        $key = false;

        // Получение значения ключа
        if( DotenvEditor::keyExists( $item_key ) ) $key = DotenvEditor::getValue( $item_key );

        // При отсутствии ключа, ему присваивается дефолтное значение (12345678)
        if(empty($key)) {
            try{
                DotenvEditor::setKey( $item_key, "12345678" );
                DotenvEditor::save();          
            } catch (Exception $e){
                return false;
            }          
        }
        return true;
    }

    // Проверка наличия id и secret пушера
    public function checkPusher(){

        $app_id = 'PUSHER_APP_ID';
        $app_secret = 'PUSHER_APP_SECRET';
        $app_cluster = 'PUSHER_APP_CLUSTER';
     
        if( !DotenvEditor::keyExists( $app_id ) ){
            try{
                DotenvEditor::setKey( $app_id, time() );
                DotenvEditor::save();          
            } catch (Exception $e){
                return false;
            }
        }
        if( !DotenvEditor::keyExists( $app_secret ) ){
            try{
                DotenvEditor::setKey( $app_secret, time() );
                DotenvEditor::save();          
            } catch (Exception $e){
                return false;
            }
        }
        if( !DotenvEditor::keyExists( $app_cluster ) ){
            try{
                DotenvEditor::setKey( $app_cluster, 'mt1' );
                DotenvEditor::save();          
            } catch (Exception $e){
                return false;
            }
        }        
        return true;
    }

}
