<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mails\SendEmail;
class UserObserver
{
    /**
     * Handle the user "created" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function created(User $user)
    {
        try {
            if(config('altrp.admin.send_email_new_users') && config('mail.username'))
               Mail::to($user->email)->send(new SendEmail(request()->all()));
        } catch (\Exception $e) {
            dump($e);
        }
    }

    /**
     * Handle the user "updated" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function updated(User $user)
    {
//        if(config('altrp.admin.send_email_new_users')) Mail::to($user)->send(new SendEmail($user));
    }

    /**
     * Handle the user "deleted" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function deleted(User $user)
    {
        broadcast(new NotificationEvent($user));
    }

    /**
     * Handle the user "restored" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function restored(User $user)
    {
        //
    }

    /**
     * Handle the user "force deleted" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function forceDeleted(User $user)
    {
        //
    }
}
