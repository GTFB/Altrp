<?php


namespace App\Altrp\Customizer\Nodes;

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
  function parseData( array $data  ):bool;
}
