<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpAccessorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_accessors', function (Blueprint $table) {
            $table->dropColumn('formula');
            $table->dropColumn('status');
            $table->string('title')->after('name');
        });

        Schema::table('altrp_accessors', function (Blueprint $table) {
            $table->text('calculation_logic')->nullable()->after('title');
            $table->text('calculation')->nullable()->after('title');
            $table->boolean('status')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_accessors', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('calculation');
            $table->dropColumn('calculation_logic');
        });
    }
}
