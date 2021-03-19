<?php


namespace App\Helpers\Classes;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class CurrentEnvironment
{
    private static $instance;

    private $data = [];


    private function __construct()
    {
        $this->setData(altrpUser)
//        $this->currentUser = Auth::user();
//        dump($this->altrptUser);
    }

    /**
     * @return array
     */
    public function getArrayData(): array
    {
        return $this->arrayData;
    }

    /**
     * @param array $arrayData
     */
    public function setData(array $arrayData): void
    {
        data_set();
        $this->arrayData = $arrayData;
    }

    public static function get_instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) self::$instance = new self;

        return self::$instance;
    }
}
