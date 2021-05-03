<?php


namespace App\Altrp\Generators\Route;


use App\Altrp\Generators\BaseFileWriter;

class RouteWriter extends BaseFileWriter
{
    protected $routeFile;

    protected $stubFile;

    public function __construct(RouteFile $routeFile, $stubFile)
    {
        $this->routeFile = $routeFile;
        $this->stubFile = $stubFile;
        parent::__construct();
    }

    public function getWritableContent($data)
    {
        $stubContent = $this->getStubFileContent($this->stubFile);
        $route = "'{$data['frontend_route']}'";
        $viewData = $data['view_data'];

        $this->replaceFrontendRoute($stubContent, $route)
            ->replacePageAreas($stubContent, array2string($viewData['page_areas']))
            ->replaceLazySections($stubContent, array2string($viewData['lazy_sections']))
            ->replaceElementsList($stubContent, array2string($viewData['elements_list']))
            ->replacePageId($stubContent, $viewData['page_id'])
            ->replaceTitle($stubContent, $viewData['title'])
            ->replaceRoute($stubContent, array2string($viewData['_frontend_route']))
            ->replacePages($stubContent, array2string($viewData['pages']))
            ->replacePreloadContent($stubContent, array2string($viewData['preload_content']))
            ->replaceIsAdmin($stubContent, $viewData['is_admin']);

        return implode(PHP_EOL, $stubContent);
    }

    protected function replaceFrontendRoute(&$stubContent, $route)
    {
        $stubContent = str_replace('{{frontend_route}}', $route, $stubContent);
        return $this;
    }

    protected function replacePageAreas(&$stubContent, $pageAreas)
    {
        $stubContent = str_replace('{{page_areas}}', $pageAreas, $stubContent);
        return $this;
    }

    protected function replaceLazySections(&$stubContent, $lazySections)
    {
        $stubContent = str_replace('{{lazy_sections}}', $lazySections, $stubContent);
        return $this;
    }

    protected function replaceElementsList(&$stubContent, $elementsList)
    {
        $stubContent = str_replace('{{elements_list}}', $elementsList, $stubContent);
        return $this;
    }

    protected function replacePageId(&$stubContent, $pageId)
    {
        $stubContent = str_replace('{{page_id}}', $pageId, $stubContent);
        return $this;
    }

    protected function replaceTitle(&$stubContent, $title)
    {
        $stubContent = str_replace('{{title}}', $title, $stubContent);
        return $this;
    }

    protected function replaceRoute(&$stubContent, $route)
    {
        $stubContent = str_replace('{{_frontend_route}}', $route, $stubContent);
        return $this;
    }

    protected function replacePages(&$stubContent, $pages)
    {
        $stubContent = str_replace('{{pages}}', $pages, $stubContent);
        return $this;
    }

    protected function replacePreloadContent(&$stubContent, $preloadContent)
    {
        $stubContent = str_replace('{{preload_content}}', $preloadContent, $stubContent);
        return $this;
    }

    protected function replaceIsAdmin(&$stubContent, $isAdmin)
    {
        $stubContent = str_replace('{{is_admin}}', $isAdmin, $stubContent);
        return $this;
    }
}
