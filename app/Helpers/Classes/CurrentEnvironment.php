<?php


namespace App\Helpers\Classes;

use App\Traits\Singleton;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;


class CurrentEnvironment
{
    use Singleton;

    private $data = [];

    private function __construct()
    {
        $this->appData['request'] = $this->filterFilesInRequest(request()->all());
        $this->appData['current_user'] = Auth::user();
    }

    /**
     * Исключить все файлы из запроса
     * @param $data
     * @return array
     */
    protected function filterFilesInRequest($data)
    {
        $requestData = [];
        foreach ($data as $key => $value) {
            if (is_array($value) && !empty($value) && $value[0] instanceof UploadedFile) {
                continue;
            }
            $requestData[$key] = $value;
        }
        return $requestData;
    }

    /**
     * Пустой ли массив данных
     * @return boolean
     */
    public function isEmpty(): bool
    {
        return empty($this->data);
    }

    /**
     * Возваращает массив данных
     * @return array
     */
    public function getData(): array
    {
        return $this->data;
    }

    /**
     * @param array $data
     */
    public function setData(array $data): void
    {
        $this->data = $data;
    }

    /**
     * Запись значения по пути в массив данных
     * @param  string|array  $path
     * @param  mixed  $value
     * @param  bool  $overwrite
     */
    public function setProperty( $path, $value, $overwrite = true): void
    {
        data_set( $this->data, $path, $value, $overwrite );
    }

    /**
     * Получение значения по пути в массиве даных
     * @param  string|array  $path
     * @param  mixed  $default
     * @return mixed
     */
    public function getProperty( $path, $default = null)
    {
        return data_get( $this->data, $path, $default );
    }

    /**
     * Возвращает созданный объект класса, если такого нет, то создаёт его и возвращает
     * @return  mixed $instance
     */
    public static function getInstance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) self::$instance = new self;

        return self::$instance;
    }
}
