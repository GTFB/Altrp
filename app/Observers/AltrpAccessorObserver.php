<?php

namespace App\Observers;

use App\Altrp\Accessor;
use App\Altrp\Builders\AccessorBuilder;
use App\Altrp\Model;
use App\Altrp\Relationship;
use App\Altrp\Column;
use App\Exceptions\AccessorNotWrittenException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\ParseFormulaException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AltrpAccessorObserver
{
    /**
     * Handle the accessor "creating" event.
     *
     * @param \App\Altrp\Accessor $accessor
     * @return void|bool
     * @throws AccessorNotWrittenException
     * @throws ParseFormulaException
     * @throws \App\Exceptions\ColumnNotFoundException
     */
    public function creating(Accessor $accessor)
    {
        $model = Model::find($accessor->model_id);
        if (! $model) {
            throw new ModelNotFoundException('Model not found', 404);
        }
        $accessorBuilder = new AccessorBuilder($model, $accessor);
        if ($accessorBuilder->accessorExists($accessor->name)) {
            throw new AccessorNotWrittenException('Accessor already exists', 500);
        }
        $calc = $accessorBuilder->getCalc($accessor);
        if (! $formula = $accessorBuilder->parseFormula($calc)) {
            throw new ParseFormulaException('Ошибка в формуле', 500);
        }

        $column = new Column();
        $column->name = $accessor->name;
        $column->title = $accessor->title;
        $column->model_id = $accessor->model_id;
        $column->type = "calculated";
        $column->preset = 0;
        $column->user_id = auth()->user()->id;
        $column->table_id = $model->altrp_table->id;

        Column::withoutEvents(function () use ($column) {
            $column->save();
        });
    }

    /**
     * Handle the accessor "created" event.
     *
     * @param \App\Altrp\Accessor $accessor
     * @return void|bool
     * @throws AccessorNotWrittenException
     * @throws ModelNotWrittenException
     * @throws \App\Exceptions\ParseFormulaException
     */
    public function created(Accessor $accessor)
    {
        $model = Model::find($accessor->model_id);
        $accessorBuilder = new AccessorBuilder($model, $accessor);
        $accessorBuilder->create();
    }

    /**
     * Handle the accessor "updating" event.
     *
     * @param \App\Altrp\Accessor $accessor
     * @return void
     * @throws AccessorNotWrittenException
     * @throws ParseFormulaException
     * @throws \App\Exceptions\ColumnNotFoundException
     */
    public function updating(Accessor $accessor)
    {
        $model = $accessor->model;
        $accessorBuilder = new AccessorBuilder($model, $accessor);
        if ($accessorBuilder->accessorExists($accessor->name)
            && $accessor->getOriginal('name') !== $accessor->name) {
            throw new AccessorNotWrittenException('Accessor already exists', 500);
        }
        $calc = $accessorBuilder->getCalc($accessor);
        if (! $formula = $accessorBuilder->parseFormula($calc)) {
            throw new ParseFormulaException('Ошибка в формуле', 500);
        }
    }

    /**
     * Handle the accessor "updated" event.
     *
     * @param \App\Altrp\Accessor $accessor
     * @return void
     * @throws AccessorNotWrittenException
     * @throws ParseFormulaException
     * @throws ModelNotWrittenException
     */
    public function updated(Accessor $accessor)
    {
        $model = Model::find($accessor->model_id);
        $accessorBuilder = new AccessorBuilder($model, $accessor);
        $accessorBuilder->update();
    }

    /**
     * Handle the accessor "deleting" event.
     *
     * @param \App\Altrp\Accessor $accessor
     * @return void
     * @throws AccessorNotWrittenException
     * @throws ParseFormulaException
     * @throws \App\Exceptions\ColumnNotFoundException
     */
    public function deleting(Accessor $accessor)
    {
        $model = $accessor->model;
        $accessorBuilder = new AccessorBuilder($model, $accessor);
        if (!$accessorBuilder->accessorExists($accessor->name)) {
            throw new AccessorNotWrittenException('Accessor not exists', 404);
        }
    }

    /**
     * Handle the accessor "deleted" event.
     *
     * @param \App\Altrp\Accessor $accessor
     * @return void
     * @throws ModelNotWrittenException
     */
    public function deleted(Accessor $accessor)
    {
        $model = $accessor->model;
        $accessorBuilder = new AccessorBuilder($model, $accessor);
        $accessorBuilder->delete();
    }

    /**
     * Handle the accessor "restored" event.
     *
     * @param  \App\Altrp\Accessor  $accessor
     * @return void
     */
    public function restored(Accessor $accessor)
    {
        //
    }

    /**
     * Handle the accessor "force deleted" event.
     *
     * @param  \App\Altrp\Accessor  $accessor
     * @return void
     */
    public function forceDeleted(Accessor $accessor)
    {
        //
    }
}
