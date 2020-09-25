<?php

namespace App;

use Laratrust\Models\LaratrustRole;

class Role extends LaratrustRole
{
    //
  protected $fillable = [
    'name',
    'display_name',
  ];

  /**
   * Импортируем роли
   * @param array $imported_roles
   */
  static public function import( $imported_roles = [] ){
    foreach ( $imported_roles as $imported_role ) {
      if( self::where( 'name', $imported_role['name'] )->first() ){
        continue;
      }
      $new_role = new self( $imported_role );
      $new_role->save();
    }
  }

  /**
   * Импортируем связи роли и permissions
   * @param array $permission_roles
   */
  public static function importPermissionRole( $permission_roles = [] )
  {
    foreach ( $permission_roles as $permission_role ) {
      $role = Role::where( 'name', $permission_role['role_name'] )->first();

    }
  }
}
