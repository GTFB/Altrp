<?php

namespace App;

use App\Traits\Paginate;
use App\Traits\Searchable;
use Laratrust\Models\LaratrustRole;

class Role extends LaratrustRole
{
    use Searchable, Paginate;
    //
  protected $fillable = [
    'name',
    'display_name',
  ];

    protected $with = ['notice_settings'];

  /**
   * @deprecated
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
   * @deprecated
   * Импортируем связи роли и permissions
   * @param array $permission_roles
   */
  public static function importPermissionRole( $permission_roles = [] )
  {
    foreach ( $permission_roles as $permission_role ) {
      $role = Role::where( 'name', $permission_role['role_name'] )->first();

    }
  }

    public function notice_settings()
    {
        return $this->morphMany('App\Altrp\NoticeSetting', 'noticed', 'noticed_type', 'noticed_id');
    }
}
