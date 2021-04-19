<?php

namespace App\Observers;

use App\Page;

class PageObserver
{
  /**
   * Handle the Page "created" event.
   *
   * @param  \App\Page $page
   * @return void
   */
  public function created( Page $page )
  {
    if( ! $page->is_cached ){
      Page::clearAllCacheById( $page->id );
    }
  }

  /**
   * Handle the Page "updated" event.
   *
   * @param  \App\Page $page
   * @return void
   */
  public function updated( Page $page )
  {
    if( ! $page->is_cached ){
      Page::clearAllCacheById( $page->id );
    }
  }

  /**
   * Handle the Page "deleted" event.
   *
   * @param  \App\Page $page
   * @return void
   */
  public function deleted( Page $page )
  {
  }

  /**
   * Handle the Page "restored" event.
   *
   * @param  \App\Page $page
   * @return void
   */
  public function restored( Page $page )
  {
    //
  }

  /**
   * Handle the Page "force deleted" event.
   *
   * @param  \App\Page $page
   * @return void
   */
  public function forceDeleted( Page $page )
  {
    //
  }
}
