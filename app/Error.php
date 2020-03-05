<?php
namespace App;

/**
 * Класс ошибки для ответа на запрос
 *
 * @author aco
 */
class Error {
    
    public $code;
    
    public $message;
    
    public $http_code;
    
    public $data;
    
    function __construct($code, $message, $http_code = 400, $data = null) {
        
        $this->code = $code;
        $this->message = $message;
        $this->http_code = $http_code;
        $this->data = $data;
        
    }
    
}
