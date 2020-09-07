<?php

use App\Altrp\Model;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpModelsTableV7 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_models', function (Blueprint $table) {
            $table->renameColumn('extend', 'namespace');
        });

        Schema::table('altrp_models', function (Blueprint $table) {
            $table->bigInteger('parent_model_id')
                ->unsigned()
                ->nullable()
                ->after('namespace');
        });

        $models = Model::all();

        foreach ($models as $model) {
            $namespace = 'App\\AltrpModels\\' . $model->name;
            if ($model->preset) {
                $namespace = 'App\\' . ucfirst($model->name);
            }
            $model->update(['namespace' => $namespace]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
