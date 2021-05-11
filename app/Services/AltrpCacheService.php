<?php 

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Page;
use App\User;

/**
 * 
 */
class AltrpCacheService
{

	public function setUserCookie(){

		$cachePath = storage_path() . '/framework/cache/pages';

	  File::ensureDirectoryExists( $cachePath, 0775);

	  if ( ! File::exists($cachePath . '/users.json') ) {
	    File::put($cachePath . '/users.json', '{}');
	  }

	  $usersJson = File::get($cachePath . '/users.json');
	  $users = json_decode($usersJson, true);

	  if ( ! is_array($users) ) {
	    File::put($cachePath . '/users.json', '{}');
	    $users = [];
	  }

	  $encryption_key = getenv('APP_KEY');
	  $iv_size = 16; // 128 bits
	  $iv = openssl_random_pseudo_bytes($iv_size, $strong);

	  $cipherUserId = openssl_encrypt(
	      Auth::user()->id,
	      'AES-256-CBC',
	      $encryption_key,
	      0,
	      $iv
	  );
	  setcookie("uid", $cipherUserId, time()+3600);

	  $newRelation = [
	    "user_id" => Auth::user()->id,
	    "roles" => Auth::user()->getUserRoles(),
	    "cipher_user_id" => $cipherUserId
	  ];

	  $i = false;
	  foreach ($users as $key => $user) {
	    if ( $user['user_id'] === Auth::user()->id ) {
	      $users[$key]['cipher_user_id'] = $cipherUserId;
	      $i = true;
	      break;
	    }
	  }

	  if (!$i) {
	    array_push($users, $newRelation);
	  }

	  $users = json_encode($users);

	  File::put($cachePath . '/users.json', $users);

	  return true;

	}
		

	public function saveUserJson( $user_id ) {

	  $cachePath = storage_path() . '/framework/cache/pages';

	  File::ensureDirectoryExists( $cachePath, 0775);

	  if ( ! File::exists($cachePath . '/users.json') ) {
	    File::put($cachePath . '/users.json', '{}');
	  }

	  $usersJson = File::get($cachePath . '/users.json');
	  $users = json_decode($usersJson, true);

	  if ( ! is_array($users) ) {
	    File::put($cachePath . '/users.json', '{}');
	    $users = [];
	  }

	  $user = User::find( $user_id );

	  event('auth.logout', [$user]);//logout user

	  $roles = [];
	  if ($user->roles) {
	   $roles = $user->roles->toArray();
	   $roles = array_column($roles, 'id');
	  }

	  //Searching exist user
	  $key = array_search($user->id, array_column($users, 'user_id'));

	  if (gettype($key) === "integer" && array_key_exists($key, $users)) {
	    $users[$key]["roles"] = $roles;
	  } else {
	    array_push($users, [
	      "user_id" => $user->id,
	      "roles" => $roles,
	      "cipher_user_id" => ""
	    ]);
	  }

	  $users = json_encode($users);

	  File::put($cachePath . '/users.json', $users);

	  return true;
	}


	public function removeUserJson( $user_id ) {

	  $cachePath = storage_path() . '/framework/cache/pages';

	  File::ensureDirectoryExists( $cachePath, 0775);

	  if ( ! File::exists($cachePath . '/users.json') ) {
	    File::put($cachePath . '/users.json', '{}');
	  }

	  $usersJson = File::get($cachePath . '/users.json');
	  $users = json_decode($usersJson, true);

	  if ( ! is_array($users) ) {
	    File::put($cachePath . '/users.json', '{}');
	    $users = [];
	  }

	  $user = User::find( $user_id );

	  $key = array_search($user->id, array_column($users, 'user_id'));

	  if (gettype($key) === "integer" && array_key_exists($key, $users)) {
	    unset($users[$key]);
	  }

	  $users = json_encode($users);

	  File::put($cachePath . '/users.json', $users);

	  return true;
	}

}
