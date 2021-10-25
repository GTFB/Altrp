<?php

namespace App\Observers;

use App\Altrp\Customizer;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\RouteGenerator;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Exceptions\RouteGenerateFailedException;

class CustomizerObserver
{
    /**
     * Handle the Customizer "created" event.
     *
     * @param   \App\Altrp\Customizer  $customizer
     * @return void
     */
    public function creating(Customizer $customizer)
    {
    }
    /**
     * Handle the Customizer "created" event.
     *
     * @param   \App\Altrp\Customizer  $customizer
     * @return void
     */
    public function created(Customizer $customizer)
    {
      if($customizer->type === 'api' && $customizer->model_id){
        $model = Model::find( $customizer->model_id );
        if($model){

          $source = new Source([
            'sourceable_type' => 'App\Altrp\Customizer',
            'sourceable_id' => $customizer->id,
            'model_id' => $customizer->model_id,
            'controller_id' => $model->altrp_controller->id,
            'url' => "/" . $customizer->name,
            'api_url' => "/" . $customizer->name,
            'title' => $customizer->title,
            'name' => $customizer->name,
            'request_type' =>  data_get($customizer->data,'request_type', 'get'),
          ]);
          try{
            $source->save();
          } catch (\Throwable $th){
            $customizer->forceDelete();
            throw $th;
          }
          $controller = $model->altrp_controller;
          $generator = new ControllerGenerator($controller);
          if (! $generator->generateRoutes($controller->model, new RouteGenerator($controller))) {
            throw new RouteGenerateFailedException('Failed to generate routes', 500);
          }
        }
        return;
      }
    }

    /**
     * Handle the Customizer "updating" event.
     *
     * @param   \App\Altrp\Customizer  $customizer
     * @return void
     */
    public function updating(Customizer $customizer)
    {

      if($customizer->getOriginal('type') === 'api' && $customizer->type !== 'api'){
        $source_to_delete = Source::where([
          'sourceable_type' => 'App\Altrp\Customizer',
          'sourceable_id' => $customizer->id
        ])->get();
        if( $source_to_delete ){
          $source_to_delete->delete();
        }
      }
      if($customizer->getOriginal('type') === 'api' && $customizer->getOriginal('model_id') !== $customizer->model_id){

      }

    }
    /**
     * Handle the Customizer "updated" event.
     *
     * @param   \App\Altrp\Customizer  $customizer
     * @return void
     */
    public function updated(Customizer $customizer)
    {



    }

    /**
     * Handle the Customizer "deleted" event.
     *
     * @param   \App\Altrp\Customizer  $customizer
     * @return void
     */
    public function deleted(Customizer $customizer)
    {
    }

    /**
     * Handle the Customizer "restored" event.
     *
     * @param   \App\Altrp\Customizer  $customizer
     * @return void
     */
    public function restored(Customizer $customizer)
    {
        //
    }

    /**
     * Handle the Customizer "force deleted" event.
     *
     * @param   \App\Altrp\Customizer  $customizer
     * @return void
     */
    public function forceDeleted(Customizer $customizer)
    {
        //
    }
}
