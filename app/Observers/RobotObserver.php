<?php

namespace App\Observers;

use App\Altrp\Robot;
use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Generators\Controller\ControllerFileWriter;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Altrp\Generators\RouteGenerator;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Exceptions\RouteGenerateFailedException;
use App\PageDatasource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RobotObserver
{
    /**
     * Handle the altrp robot "created" event.
     *
     * @param  \App\AltrpRobot  $altrpRobot
     * @return void
     */
    public function created(Robot $robot)
    {
      if ($robot->start_condition != "telegram_bot") {
        return;
      }

      $source_to_delete = Source::where( [
        'sourceable_type' => 'App\Altrp\Robot',
        'sourceable_id' => $robot->id
      ] )->first();
      if ( $source_to_delete ) {
        $old_page_data_sources = PageDatasource::where( 'source_id', $source_to_delete->id )->get();
        $source_to_delete->delete();
      }

      if ( $robot->model_id ) {
        $model = Model::find( $robot->model_id );
        if ( $model && $robot->start_config ) {
          if ( is_array($robot->start_config) && isset($robot->start_config['bot_token'])) {
            $controllerFile = new ControllerFile( $model );
            $source = new Source( [
              'sourceable_type' => 'App\Altrp\Robot',
              'sourceable_id' => $robot->id,
              'model_id' => $robot->model_id,
              'controller_id' => $model->altrp_controller->id,
              'url' => "/" . $robot->name,
              'api_url' => "/" . $robot->name,
              'title' => $robot->name,
              'name' => $robot->name,
              'type' => 'robot',
              'request_type' => 'post',
            ] );
            try {
              $source->save();

              if ( isset( $old_page_data_sources ) && $old_page_data_sources ) {
                $old_page_data_sources->each( function ( $old_page_data_source ) use ( $source ) {
                  $page_data_source = new PageDatasource( $old_page_data_source->toArray() );
                  $page_data_source->source_id = $source->id;
                  $page_data_source->save();
                } );
              }
              $controller = $model->altrp_controller;
              $generator = new ControllerGenerator( $controller );
              $repo = new RepositoryFile( $model );
              $repoInterface = new RepositoryInterfaceFile( $model );
              $controllerWriter = new ControllerFileWriter(
                $controllerFile,
                $repo,
                $repoInterface
              );
              $controllerWriter->writeRobotMethod( $robot );

              $generator->generateRoutes( $controller->model, new RouteGenerator( $controller, 'AltrpApiRoutes' ), true );

              if ( ! $generator->generateRoutes( $controller->model, new RouteGenerator( $controller, 'AltrpApiRoutes' ), true ) ) {
                throw new RouteGenerateFailedException( 'Failed to generate routes', 500 );
              }

              DB::table('altrp_robots')
                        ->where('start_condition', 'telegram_bot')
                        ->where('id', '!=', $robot->id)
                        ->update(['is_active' => 0]);         

              if ($robot->start_condition == "telegram_bot" && $_SERVER['REQUEST_SCHEME'] == "https") {
                $client = new \GuzzleHttp\Client();              
                
                try {
                  $model_source = Source::where('model_id', $model->id)
                    ->where('type', 'add')
                    ->where('request_type', 'post')
                    ->first();

                  $base_url = substr(env('APP_URL'), -1) == "/" ? substr(env('APP_URL'),0,-1) : env('APP_URL');
                  $url = "https://api.telegram.org/bot".$robot->getTelegramBotToken()."/setWebhook?url=".$base_url."/api/altrp_models".$model_source->api_url."/robots/".$robot->name;

                  $req = $client->get($url);
                  $response = json_decode($req->getBody()->getContents(),true);

                  if ($response['result']) {
                    $robot->is_active = 1;
                    $robot->save();
                  }
                } catch ( \Throwable $th ) {
                  return;
                }              
              }

            } catch ( \Throwable $th ) {
              $source->forceDelete();
              throw $th;
            }
          }
        }
        return;
      }
    }

    /**
     * Handle the altrp robot "updated" event.
     *
     * @param  \App\AltrpRobot  $altrpRobot
     * @return void
     */
    public function updated(Robot $robot)
    {

    }


    /**
     * Handle the altrp robot "updated" event.
     *
     * @param  \App\AltrpRobot  $altrpRobot
     * @return void
     */
    public function updating(Robot $robot)
    {

      if ($robot->start_condition != "telegram_bot") {
        return;
      }

      $source_to_delete = Source::where( [
        'sourceable_type' => 'App\Altrp\Robot',
        'sourceable_id' => $robot->id
      ] )->first();
      if ( $source_to_delete ) {
        $old_page_data_sources = PageDatasource::where( 'source_id', $source_to_delete->id )->get();
        $source_to_delete->delete();
      }

      if ( $robot->model_id ) {
        $model = Model::find( $robot->model_id );
        if ( $model && $robot->start_config ) {
          if ( is_array($robot->start_config) && isset($robot->start_config['bot_token'])) {
            $controllerFile = new ControllerFile( $model );
            $source = new Source( [
              'sourceable_type' => 'App\Altrp\Robot',
              'sourceable_id' => $robot->id,
              'model_id' => $robot->model_id,
              'controller_id' => $model->altrp_controller->id,
              'url' => "/" . $robot->name,
              'api_url' => "/" . $robot->name,
              'title' => $robot->name,
              'name' => $robot->name,
              'type' => 'robot',
              'request_type' => 'post',
            ] );
            try {
              $source->save();

              if ( isset( $old_page_data_sources ) && $old_page_data_sources ) {
                $old_page_data_sources->each( function ( $old_page_data_source ) use ( $source ) {
                  $page_data_source = new PageDatasource( $old_page_data_source->toArray() );
                  $page_data_source->source_id = $source->id;
                  $page_data_source->save();
                } );
              }
              $controller = $model->altrp_controller;
              $generator = new ControllerGenerator( $controller );
              $repo = new RepositoryFile( $model );
              $repoInterface = new RepositoryInterfaceFile( $model );
              $controllerWriter = new ControllerFileWriter(
                $controllerFile,
                $repo,
                $repoInterface
              );
              $controllerWriter->writeRobotMethod( $robot );

              $generator->generateRoutes( $controller->model, new RouteGenerator( $controller, 'AltrpApiRoutes' ), true );

              if ( ! $generator->generateRoutes( $controller->model, new RouteGenerator( $controller, 'AltrpApiRoutes' ), true ) ) {
                throw new RouteGenerateFailedException( 'Failed to generate routes', 500 );
              }

              DB::table('altrp_robots')
                        ->where('start_condition', 'telegram_bot')
                        ->where('id', '!=', $robot->id)
                        ->update(['is_active' => 0]);        

              if ($robot->start_condition == "telegram_bot" && $_SERVER['REQUEST_SCHEME'] == "https") {
                $client = new \GuzzleHttp\Client();              
                
                try {
                  $model_source = Source::where('model_id', $model->id)
                    ->where('type', 'add')
                    ->where('request_type', 'post')
                    ->first();

                  $base_url = substr(env('APP_URL'), -1) == "/" ? substr(env('APP_URL'),0,-1) : env('APP_URL');
                  $url = "https://api.telegram.org/bot".$robot->getTelegramBotToken()."/setWebhook?url=".$base_url."/api/altrp_models".$model_source->api_url."/robots/".$robot->name;

                  $req = $client->get($url);
                  $response = json_decode($req->getBody()->getContents(),true);

                  if ($response['result']) {
                    $robot->is_active = 1;
                    $robot->save();
                  }
                } catch ( \Throwable $th ) {
                  return;
                }              
              }

            } catch ( \Throwable $th ) {
              $source->forceDelete();
              throw $th;
            }
          }
        }
        return;
      }
    }


    /**
     * Handle the altrp robot "deleted" event.
     *
     * @param  \App\AltrpRobot  $altrpRobot
     * @return void
     */
    public function deleted(Robot $robot)
    {
        //
    }

    /**
     * Handle the altrp robot "restored" event.
     *
     * @param  \App\AltrpRobot  $altrpRobot
     * @return void
     */
    public function restored(Robot $robot)
    {
        //
    }

    /**
     * Handle the altrp robot "force deleted" event.
     *
     * @param  \App\AltrpRobot  $altrpRobot
     * @return void
     */
    public function forceDeleted(Robot $robot)
    {
        //
    }
}
