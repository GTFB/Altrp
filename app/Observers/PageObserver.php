<?php

namespace App\Observers;

use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteWriter;
use App\Page;

class PageObserver
{
    /**
     * Handle the Page "created" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function created(Page $page)
    {
        $this->updatePageRoutes($page);
    }

    /**
     * Handle the Page "updated" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function updated(Page $page)
    {
        $this->updatePageRoutes($page);
    }

    /**
     * Handle the Page "deleted" event.
     *
     * @param \App\Page $page
     * @return void
     */
    public function deleted(Page $page)
    {
        $this->updatePageRoutes($page);
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

    protected function updatePageRoutes($page)
    {
        $frontend_routes = Page::get_frontend_routes();
        $content = ['<?php'];

        $routeFile = new RouteFile($page, config('altrp.admin.page_routes'));
        $stubFile = app_path('Altrp/Commands/stubs/routes/create_page_route.stub');
        $writer = new RouteWriter($routeFile, $stubFile);

        foreach ( $frontend_routes as $_frontend_route ) {
            $path = $_frontend_route['path'];
            $title = $_frontend_route['title'];
            $pattern1 = '/:(.+)((\/)|$)/U';
            $replacement1 = '{$1}/';
            $frontend_route = preg_replace( $pattern1, $replacement1, $path );

            $preload_content = Page::getPreloadPageContent( $_frontend_route['id'] );

            $page_areas = Page::get_areas_for_page( $_frontend_route['id'] );
            $lazy_sections = Page::get_lazy_sections_for_page( $_frontend_route['id'] );
            $elements_list = extractElementsNames( $page_areas );

            $data = [
                'view_data' => [
                    'page_areas' => $page_areas,
                    'lazy_sections' => $lazy_sections,
                    'elements_list' => $elements_list,
                    'page_id' => $_frontend_route['id'],
                    'title' => $title,
                    '_frontend_route' => $_frontend_route,
                    'pages' => Page::get_pages_for_frontend( true ),
                    'preload_content' => $preload_content,
                    'is_admin' => 'isAdmin()',
                ],
                'frontend_route' => $frontend_route
            ];

            $content[] = $writer->getWritableContent($data);
        }

        $writer->writeToFile($routeFile->getFile(), implode(PHP_EOL, $content));

        if (!$page->is_cached) {
            Page::clearAllCacheById($page->id);
        }
    }
}
