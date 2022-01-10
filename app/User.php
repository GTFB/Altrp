<?php

namespace App;

use App\Altrp\Notification;
use App\Altrp\SocialInteraction;
use App\Traits\Searchable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;

use Laravel\Passport\HasApiTokens;

use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use LaratrustUserTrait;
    use Notifiable;
    use HasApiTokens;
    use Searchable;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'name',
      'email',
      'password',
      'last_name',
      'notice_data',
      'telegram_user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Always with relations
     * @var string[]
     */
    protected $with = ['notice_settings',];


    protected $appends = ['full_name'];


    /**
     * Получение данных о пользователе
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    function usermeta() {
        return $this->hasOne(UserMeta::class, 'user_id');
    }

    /**
     * Получение данных о пользователе
     * @return string
     */
    public function getFullNameAttribute() {
        if(!$this->usermeta) return "";

        return $this->usermeta->first_name." ".$this->usermeta->second_name;
    }

    /**
     * Связь пользователей с ролями
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    /**
     * Проверять, является ли пользователь админом
     * @return bool
     */
    public function isAdmin()
    {
        foreach ($this->roles()->get() as $role) {
            if ($role->name == 'admin') {
                return true;
            }
        }
        return false;
    }

    public function notice_settings()
    {
        return $this->morphMany('App\Altrp\NoticeSetting', 'noticed', 'noticed_type', 'noticed_id');
    }

    /**
     * Get the entity's notifications.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable')->orderBy('created_at', 'desc');
    }


    public function social_interactions()
    {
        return $this->hasMany(SocialInteraction::class, 'user_id');
    }


    public function getUserRoles(){

      $roles_ = DB::table( 'role_user' )->where( 'user_id', $this->id )
        ->select('role_id')->get();

      $roles = [];
      if ($roles_) {
        foreach ($roles_ as $key => $role) {
          $roles[$key] = $role->role_id;
        }
      }
      return $roles;
    }

}
