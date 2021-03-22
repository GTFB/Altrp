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

        // Проверка существования файла env
        $file = base_path('.env');
        if (!file_exists($file)) return response()->json(['error'=> "File .env not found!"], 500, [],JSON_UNESCAPED_UNICODE);

        // сброс соединения (на всякий случай)
        $exit_code = Artisan::call('websockets:restart');

        if($reset) $this->resetCount();
        try {
            if ($enadled) {
                $checkAppKey = $this->checkEnv("ALTRP_SETTING_PUSHER_APP_KEY", '12345678');
                $checkHost = $this->checkEnv("ALTRP_SETTING_PUSHER_HOST", '127.0.0.1');
                $checkAppId = $this->checkEnv("PUSHER_APP_ID", time());
                $checkAppSecret = $this->checkEnv("PUSHER_APP_SECRET", time());
                $checkAppCluster = $this->checkEnv("PUSHER_APP_CLUSTER", 'mt1');

                if (!$checkAppKey) return response()->json(['error' => "Ошибка проверки ключа пушера в env"], 500, [], JSON_UNESCAPED_UNICODE);
                if (!$checkHost) return response()->json(['error' => "Ошибка проверки хоста пушера в env"], 500, [], JSON_UNESCAPED_UNICODE);
                if (!$checkAppId) return response()->json(['error' => "Ошибка проверки ID пушера в env"], 500, [], JSON_UNESCAPED_UNICODE);
                if (!$checkAppSecret) return response()->json(['error' => "Ошибка проверки SECRET пушера в env"], 500, [], JSON_UNESCAPED_UNICODE);
                if (!$checkAppCluster) return response()->json(['error' => "Ошибка проверки CLUSTER пушера в env"], 500, [], JSON_UNESCAPED_UNICODE);

                // очистка кэша
                $exit_code = Artisan::call('config:clear');

                $item_port = "ALTRP_SETTING_WEBSOCKETS_PORT";
                $port = false;

                // получение значений порта
                if (DotenvEditor::keyExists($item_port)) $port = DotenvEditor::getValue($item_port);
                $host = config('websockets.apps.0.host');


                if (empty($port)) {
                    // При отсутствии порта, ему присваивается дефолтное значение (6001)
                    DotenvEditor::setKey($item_port, "6001");
                    DotenvEditor::save();
                    $exit_code = Artisan::call('config:clear');

                    return response()->json(['error' => "Ошибка записи $item_port"], 500, [], JSON_UNESCAPED_UNICODE);

                    $exit_code1 = Artisan::call('websockets:serve --host=' . $host);

                } else {
                    $exit_code = Artisan::call('config:clear');
                    $exit_code1 = Artisan::call('websockets:serve --port=' . $port . ' --host=' . $host);

                }

                return response()->json(['error' => "Ошибка запуска вебсокет-сервера"], 500, [], JSON_UNESCAPED_UNICODE);
            } else {
                $exit_code1 = Artisan::call('websockets:restart');

                return response()->json(['error' => "Ошибка остановки вебсокет-сервера"], 500, [], JSON_UNESCAPED_UNICODE);
            }
            return response()->json(['success'=> true, 'checked'=> !$enadled], 200, [],JSON_UNESCAPED_UNICODE);
        }
        catch (\Exception $e){
            return response()->json(['error'=> $e], 500, [],JSON_UNESCAPED_UNICODE);
        }
    }

    // Сброс настроек и очистка кеша
    public function resetCount(){
        try{
            DotenvEditor::setKey( "ALTRP_SETTING_PUSHER_HOST", "127.0.0.1" );
            DotenvEditor::setKey( "ALTRP_SETTING_WEBSOCKETS_PORT", "6001" );
            DotenvEditor::setKey( "ALTRP_SETTING_PUSHER_APP_KEY", "12345678" );
            DotenvEditor::save();
            $exit_code = Artisan::call('config:clear');
        }
        catch(Exception $e){
            return response()->json(['error'=> "Ошибка сброса"], 500, [],JSON_UNESCAPED_UNICODE);
        }
    }

    // Проверка параметров в env
    public function checkEnv($item, $defaultValue)
    {
        $tempItem = false;

        // Получение значения ключа
        if( DotenvEditor::keyExists( $item ) ) $tempItem = DotenvEditor::getValue( $item );

        // При отсутствии ключа или при пустом значении, ему присваивается дефолтное значение ($defaultValue)
        if(empty($tempItem)) {
            try{
                DotenvEditor::setKey( $item, $defaultValue );
                DotenvEditor::save();
            } catch (Exception $e){
                return false;
            }
        }
        return true;
    }
}
