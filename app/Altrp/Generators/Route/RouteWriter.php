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
        $this->replacePageId($stubContent, $data['frontend_route_id'])
          ->replaceTitle($stubContent, $data['title'])
          ->replaceFrontendRoute($stubContent, $data['frontend_route'])
          ->replaceArgumentIndex($stubContent, $data['argument_index'])
          ->replaceParams($stubContent, $data['params'])
          ->replaceModelId($stubContent, $data['model_id']);

        return implode(PHP_EOL, $stubContent);
    }

    protected function replaceFrontendRoute(&$stubContent, $route)
    {
        $stubContent = str_replace('{{frontend_route}}', $route, $stubContent);
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

    protected function replaceParams(&$stubContent, $params)
    {
        $stubContent = str_replace('{{params}}', $params, $stubContent);
        return $this;
    }

    protected function replaceArgumentIndex(&$stubContent, $argIndex)
    {
        $stubContent = str_replace('{{argument_index}}', $argIndex, $stubContent);
        return $this;
    }

    protected function replaceModelId(&$stubContent, $modelId)
    {
        $stubContent = str_replace('{{model_id}}', $modelId, $stubContent);
        return $this;
    }
}
