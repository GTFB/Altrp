<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;

use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use LaratrustUserTrait;
    use Notifiable;
    use HasApiTokens;

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
    
    
    protected $appends = ['full_name'];
    
    /**
     * Получение данных о пользователе
     * @return type
     */
    function usermeta() {
        return $this->hasOne(UserMeta::class);
    }
    
    /**
     * Получение данных о пользователе
     * @return type
     */
    public function getFullNameAttribute() {
        if(!$this->usermeta) return "";
        
        return $this->usermeta->first_name." ".$this->usermeta->second_name;
    }
}
