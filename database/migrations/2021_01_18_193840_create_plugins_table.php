<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePluginsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_plugins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique();
            $table->boolean('enabled')->default(1);
            $table->timestamps();
        });

        $newPlugin = new \App\Altrp\Plugin([
            'name' => 'Oauth2',
            'enabled' => 1
        ]);

        $newPlugin->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_plugins');
    }
}
