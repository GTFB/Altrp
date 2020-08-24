<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpQueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_queries', function (Blueprint $table)
        {
            $table->longText('joins')->nullable()->after('columns');
            $table->bigInteger('model_id')->unsigned()->index()->after('source_id');
            $table->foreign('model_id')->references('id')->on('altrp_models');
        });

        Schema::table('altrp_queries', function (Blueprint $table)
        {
            $table->string('offset')->change();
        });

        Schema::table('altrp_queries', function (Blueprint $table)
        {
            $table->string('limit')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_queries', function (Blueprint $table)
        {
            $table->dropForeign(['model_id']);
            $table->dropColumn('model_id');
        });
    }
}
