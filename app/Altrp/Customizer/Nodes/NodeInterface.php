<?php


namespace App\Altrp\Customizer\Nodes;

use Illuminate\Support\Collection;

/**
 * Interface NodeInterface - описывает методы и свойства нод, используемых в кастомайзере
 * @package App\Altrp\Customizer\Nodes
 */
interface NodeInterface
{
  /**
   * @return string
   */
  public function getContent():string;

  /**
   * @return array
   */
  public function getChildren():array;

  /**
   * @param array $data
   * @return bool
   */
  function parseCustomizerData( Collection $data  ):bool;
}
