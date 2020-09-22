<?php

namespace App\Observers;

use App\Altrp\Source;

class AltrpSourceObserver
{
    /**
     * Handle the source "creating" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function creating(Source $source)
    {
        if ($source->type == 'remote') {

        }
    }

    /**
     * Handle the source "created" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function created(Source $source)
    {
        //
    }

    /**
     * Handle the source "updated" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function updated(Source $source)
    {
        //
    }

    /**
     * Handle the source "deleted" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function deleted(Source $source)
    {
        //
    }

    /**
     * Handle the source "restored" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function restored(Source $source)
    {
        //
    }

    /**
     * Handle the source "force deleted" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function forceDeleted(Source $source)
    {
        //
    }
}
