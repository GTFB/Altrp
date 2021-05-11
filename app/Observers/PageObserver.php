<?php

namespace App\Observers;

use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteWriter;
use App\Page;
use App\Services\PageService;

class PageObserver
{
    protected $pageService;

    /**
     * PageObserver constructor.
     * @param PageService $pageService
     */
    public function __construct(PageService $pageService)
    {
        $this->pageService = $pageService;
    }

    /**
     * Handle the Page "created" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function created(Page $page)
    {
        $this->pageService->updatePageRoutes($page);
    }

    /**
     * Handle the Page "updated" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function updated(Page $page)
    {
        $this->pageService->updatePageRoutes($page);
    }

    /**
     * Handle the Page "deleted" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function deleted(Page $page)
    {
        $this->pageService->updatePageRoutes($page);
    }

    /**
     * Handle the Page "restored" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function restored(Page $page)
    {
        //
    }

    /**
     * Handle the Page "force deleted" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function forceDeleted(Page $page)
    {
        //
    }
}
