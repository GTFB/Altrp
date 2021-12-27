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
          ->replaceParamName($stubContent, $data['param_name'])
          ->replaceModelColumn($stubContent, $data['model_column'])
          ->replaceCustomArgument($stubContent, $data['custom_argument'])
          ->replaceCustomModel($stubContent, $data['custom_model'])
          ->replaceParams($stubContent, $data['params'])
          ->replaceRouteArgs($stubContent, $data['route_args'])
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
    protected function replaceRouteArgs(&$stubContent, $route_args)
    {
        $stubContent = str_replace('{{route_args}}', $route_args, $stubContent);
        return $this;
    }

    protected function replaceArgumentIndex(&$stubContent, $argIndex)
    {
        $stubContent = str_replace('{{argument_index}}', $argIndex, $stubContent);
        return $this;
    }

    protected function replaceModelColumn(&$stubContent, $model_column)
    {
        $stubContent = str_replace('{{model_column}}', $model_column, $stubContent);
        return $this;
    }
    protected function replaceCustomArgument(&$stubContent, $custom_argument)
    {
        $stubContent = str_replace('{{custom_argument}}', $custom_argument, $stubContent);
        return $this;
    }
    protected function replaceCustomModel(&$stubContent, $custom_model)
    {
        $stubContent = str_replace('{{custom_model}}', $custom_model, $stubContent);
        return $this;
    }

    protected function replaceParamName(&$stubContent, $param_name)
    {
        $stubContent = str_replace('{{param_name}}', $param_name, $stubContent);
        return $this;
    }

    protected function replaceModelId(&$stubContent, $modelId)
    {
        $stubContent = str_replace('{{model_id}}', $modelId, $stubContent);
        return $this;
    }
}
