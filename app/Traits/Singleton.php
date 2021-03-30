<?php


namespace App\Traits;


trait Singleton
{
    /**
     * @var static
     */
    private static $instance;

    /**
     * @var array
     */
    protected $appData = [];

    /**
     * @return mixed
     */
    public static function getInstance()
    {
        if (static::$instance === null) {
            static::$instance = new static;
        }
        return self::$instance;
    }

    protected function __construct()
    {

    }

    public function __get($name)
    {
        return $this->appData[$name] ?? null;
    }

    private function __clone() { }
}
