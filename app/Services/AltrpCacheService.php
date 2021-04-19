<?php 

namespace App\Services;

/**
 * 
 */
class AltrpCacheService
{
	
	const CACHE_PATH = '../storage/app/public/storage/cache/';

	public function put($title, $_frontend_route, $frontend_route, $preload_content, $current_route, $minification = false){

		ob_start(function($html) use ($title, $_frontend_route, $frontend_route, $preload_content, $current_route, $minification ) {

			if ($minification) {
				$html = $this->minification($html);
			}

			if (!is_dir(self::CACHE_PATH)) {
				mkdir(self::CACHE_PATH, 0644);
			}

      $file = file_put_contents(self::CACHE_PATH . md5($html), $html);
      return $html;

    });

	}

	public function minification($html) {

		$search = [
      '/\>[^\S ]+/s',     
      '/[^\S ]+\</s',     
      '/(\s)+/s',         
      '/<!--(.|\s)*?-->/' 
  	];

    $replace = [
      '>',
      '<',
      '\\1',
      ''
    ];

		return preg_replace($search, $replace, $html);
	}

}
