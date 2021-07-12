<?php


namespace App\Altrp;

use App\User;
use Illuminate\Database\Eloquent\Model;

class SocialInteraction extends Model
{
    protected $table = 'social_interactions';

    protected $fillable = [
        'user_id',
        'type_id',
        'value',
        'data',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
