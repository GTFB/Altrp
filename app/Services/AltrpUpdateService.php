<?php

namespace App\Services;


use GuzzleHttp\Client;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AltrpUpdateService
{
  const UPDATE_DOMAIN = 'https://up.altrp.com/';
  const PRODUCT_NAME = 'altrp';
  private $client;
  public function __construct()
  {
    $this->client = new Client();
  }

  /**
   * @return string
   */
  public function get_version(){

    $res =  $this->client->post( self::UPDATE_DOMAIN . 'version/' . self::PRODUCT_NAME )->getBody()->getContents();
    $res = json_decode( $res, true );
    if( ! isset( $res['product_version'] ) ){
      throw new NotFoundHttpException( 'Не возможно прочитать версию с сервиса обновления Альтерпи' );
    }
    return $res['product_version'];
  }
}