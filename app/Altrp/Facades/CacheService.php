<?php 

namespace App\Altrp\Facades;

use Illuminate\Support\Facades\Facade;


/**
 * 
 */
class CacheService extends Facade
{
	
	protected static function getFacadeAccessor() {
		return 'altrpCache';
	}
}



