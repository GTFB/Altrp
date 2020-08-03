<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Altrp\Column;
use App\Altrp\Table;
use App\Altrp\Model;

class UpdateColumnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_columns', function (Blueprint $table) {
            
            $table->boolean("is_label")->default(false);
            $table->boolean("is_title")->default(false);
            $table->string('attribute')->nullable();
            $table->string('input_type')->nullable();
            $table->longText('options')->nullable();
            $table->boolean('indexed')->default(false);
            $table->boolean('editable')->default(false);
            $table->boolean('hidden')->default(false);
            
            
            
            
            $table->integer('size')->nullable()->change();
            $table->boolean('null')->nullable()->change();
            $table->string('default')->nullable()->change();
            $table->boolean('primary')->nullable()->change();
            $table->boolean('unique')->nullable()->change();
            
            $table->bigInteger('model_id')->unsigned()->nullable();
            $table->foreign('model_id')->references('id')->on('altrp_models');
            
            
            
        });
        
        
        foreach (Column::all() as $column) {
            
            if(!$column->altrp_table) {
                Column::withoutEvents(function () use ($column) {
                    $column->delete();
                });
                break;
            }
            
            $model = Model::where("table_id", "=", $column->altrp_table->id)->first();
            
            $model_id = null;
            if($model) {
                $model_id = $model->id;
            }
            
            Column::withoutEvents(function () use ($column, $model_id) {
                $column->update([
                    'model_id' => $model_id
                ]);
            });
            
            
            
            
            
            $data = Column::where([
                ["table_id", "=", $column->altrp_table->id],
                ["name", "=", $column->name],
                ["altrp_migration_id", ">", $column->altrp_migration_id],
            ])->get();
            
            if(count($data) > 0) {
                Column::withoutEvents(function () use ($column) {
                    $column->delete();
                });
                
            }
        }
        
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_columns', function (Blueprint $table) {
            $table->integer('size')->nullable(false)->change();
            $table->boolean('null')->nullable(false)->change();
            $table->string('default')->nullable(false)->change();
            $table->boolean('primary')->nullable(false)->change();
            $table->boolean('unique')->nullable(false)->change();
            
            $table->dropColumn("is_label");
            $table->dropColumn("is_title");
            $table->dropColumn('attribute');
            $table->dropColumn('input_type');
            $table->dropColumn('options');
            $table->dropColumn('indexed');
            $table->dropColumn('editable');
            $table->dropColumn('hidden');
        });
    }
    
    
    
}
