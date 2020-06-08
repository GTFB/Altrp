<?php
/**
 * ALTRP - Framework for every purpose
 */

$valid = true;
$error = '';

// Check the server components to prevent error during the installation process.
if ( ! version_compare( PHP_VERSION, '7.1.3', '>=' ) ) {
  $error .= "<strong>ERROR:</strong> PHP 7.1.3 or higher is required.<br />";
  $valid = false;
}
if ( ! extension_loaded( 'mbstring' ) ) {
  $error .= "<strong>ERROR:</strong> The requested PHP extension mbstring is missing from your system.<br />";
  $valid = false;
}

if ( ! empty( ini_get( 'open_basedir' ) ) ) {
  $error .= "<strong>ERROR:</strong> Please disable the <strong>open_basedir</strong> setting to continue.<br />";
  $valid = false;
}

if ( ! $valid ) {
  echo '<pre>';
  echo $error;
  echo '</pre>';
  exit();
}

// Load Laravel Framework
require 'main.php';