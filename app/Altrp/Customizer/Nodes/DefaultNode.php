<?php


namespace App\Altrp\Customizer\Nodes;


use Illuminate\Support\Collection;

class DefaultNode extends BaseNode implements NodeInterface
{
  public $data = null;



  public function getChildren(): array
  {
    // TODO: Implement getChildren() method.
    return [];
  }
  public function getContent(): string
  {
    // TODO: Implement getContent() method.
    return '';
  }
  function parseCustomizerData( Collection $data  ): bool
  {
    // TODO: Implement parseData() method.
    if( ! $data ) {
      $data = [];
    }
    $data = collect( $data );
    $this->data = $data->filter( function ( $item ) {
      return data_get( $item, 'type' ) === 'start';
    })->first();
    return true;
  }


  /**
   * парсим  массив в строку
   * @return string
   */
  public function parseArray($data = []){
    $php_content = '';

    foreach( $data as $item ){
      $_php_content = data_get( $item, 'php_content' );
      if( ! is_string($php_content) || ! $php_content ) {
        continue;
      }

      preg_match_all("/{{([\s\S]+?)(?=}})/", $_php_content, $matches);
      if( ! isset( $matches ) || ! isset( $matches[1] )){
        $php_content .= $_php_content;
        continue;
      }
      $matches = $matches[1];

      foreach ($matches as $path) {
        $item = data_get( $item, $path);
        if(is_array( $item ) && isset($item[0]) ){
          $item = $this->parseArray($item);
        } elseif ( is_array( $item ) ) {
          $item = $this->parseObject($item);
        }
        $_php_content = str_replace("{{{$path}}}", $item, $_php_content);

      }
      $php_content .= $_php_content;
    }
    return $php_content;
  }

  /**
   * парсим ассоциативный массив в строку
   * @return string
   */
  public function parseObject( $item ){
    $php_content = data_get( $item, 'php_content' );
    if( ! is_string($php_content) || ! $php_content ) {
      return '';
    }
    preg_match_all("/{{([\s\S]+?)(?=}})/", $php_content, $matches);
    if( ! isset( $matches ) || ! isset( $matches[1] )){
      return $php_content;
    }
    $matches = $matches[1];

    foreach ($matches as $path) {
      $item = data_get( $item, $path );
      if(is_array( $item ) && isset($item[0]) ){
        $item = $this->parseArray($item);

      } elseif ( is_array( $item ) ){
        $item = $this->parseObject($item);
      }
      $php_content = str_replace("{{{$path}}}", $item, $php_content);
    }
    return $php_content;
  }

  /**
   * Если тип ноды отсутствует на бэкенде, то в нем должно быть свойство php_content,
   * которое является шаблоном php-кода
   * @return string
   */
  public function getPHPContent(): string
  {
    return $this->parseObject( $this->data );
  }
}
