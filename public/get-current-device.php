<?php
/*
 * @return string
 */
function get_current_device() {

  if( isset( $_COOKIE['__altrp_current_device'] ) && $_COOKIE['__altrp_current_device']){
    return $_COOKIE['__altrp_current_device'];
  }
  require_once __DIR__ .'/../app/Helpers/Classes/MobileDetect.php';
  $detector = new App\Helpers\Classes\MobileDetect();

  if($detector->isTablet()){
    return 'Tablet';
  }
  if($detector->isMobile()){
    return 'Small-Phone';
  }
  return'DEFAULT_BREAKPOINT';
}
