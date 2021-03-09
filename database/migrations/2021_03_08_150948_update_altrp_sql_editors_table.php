<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpSqlEditorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $sql_editors = \App\SQLEditor::all();
        foreach ($sql_editors as $sql_editor) {
            $sql_editor->update(['sql' => $this->replaceDynamicVars($sql_editor->sql)]);
        }
    }

    /**
     * @param $str
     * @return string|string[]|null
     */
    protected function replaceDynamicVars($str)
    {
        $pattern = '\'?(CURRENT_[A-Z_]+|([A-Z_]+)?REQUEST)(:[a-zA-Z0-9,\'_.()]+)?(:[a-zA-Z0-9,;"%-_.()+*/|]+)?(:[A-Z_<>!=]+)?\'?';
        $str = preg_replace_callback(
            "#$pattern#",
            function($matches) {
                $param = $matches[0];
                $parts = explode(':', trim($param, '\''));
                if (\Illuminate\Support\Str::contains($param, 'CURRENT_USER')
                    && \Illuminate\Support\Str::contains($parts[1], ')')) {
                    $param = trim($param, ')');
                }
                $res = '{{' . $param . '}}';
                if (\Illuminate\Support\Str::contains($param, 'CURRENT_USER')
                    && \Illuminate\Support\Str::contains($parts[1], ')')) {
                    $res = $res . ')';
                }
                return $res;
            },
            $str
        );
        return $str;
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
