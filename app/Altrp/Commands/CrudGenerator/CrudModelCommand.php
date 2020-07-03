<?php

namespace App\Altrp\Commands\CrudGenerator;

use Illuminate\Console\GeneratorCommand;

class CrudModelCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'crud:model
                            {name : The name of the model.}
                            {--table= : The name of the table.}
                            {--fillable= : The names of the fillable columns.}
                            {--relationships= : The relationships for the model}
                            {--pk=id : The name of the primary key.}
                            {--soft-deletes=no : Include soft deletes fields.}
                            {--timestamps= : Include timestamps fields.}
                            {--created-at= : The name of the created-at column.}
                            {--updated-at= : The name of the updated-at column.}
                            {--custom-namespaces= : Custom namespaces of the model.}
                            {--custom-traits= : Custom traits of the model.}
                            {--custom-properties= : Custom props of the model.}
                            {--custom-methods= : Custom methods of the model.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new model.';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Model';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return config('crudgenerator.custom_template')
        ? config('crudgenerator.path') . 'models/create_model.stub'
        : __DIR__ . '/../stubs/models/create_model.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace;
    }

    /**
     * Build the model class with the given name.
     *
     * @param  string  $name
     *
     * @return string
     */
    protected function buildClass($name)
    {
        $stub = $this->files->get($this->getStub());

        $table = $this->option('table') ?: $this->argument('name');
        $fillable = $this->option('fillable');
        $primaryKey = $this->option('pk');
        $relationships = trim($this->option('relationships')) != '' ? explode(';', trim($this->option('relationships'))) : [];
        $softDeletes = $this->option('soft-deletes');
        $timestamps = $this->option('timestamps');
        $createdAt = $this->option('created-at');
        $updatedAt = $this->option('updated-at');
        $customNamespaces = $this->option('custom-namespaces') ?? '';
        $customTraits = $this->option('custom-traits') ?? '';
        $customProperties = $this->option('custom-properties') ?? '';
        $customMethods = $this->option('custom-methods') ?? '';


        if (! empty($primaryKey)) {
            $primaryKey = <<<EOD
/**
    * The database primary key value.
    *
    * @var string
    */
    protected \$primaryKey = '$primaryKey';
EOD;
        }

        if ($timestamps !== null) {
            $timestamps = $timestamps ? 'true' : 'false';
            $timestamps = <<<EOD
/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public \$timestamps = $timestamps;\n\n
EOD;
        }

        if (!empty($createdAt)) {
            $createdAt = <<<EOD
    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const CREATED_AT = '$createdAt';\n\n
EOD;
        }

        if (!empty($updatedAt)) {
            $updatedAt = <<<EOD
    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const UPDATED_AT = '$updatedAt';\n
EOD;
        }

        $ret = $this->replaceNamespace($stub, $name)
            ->replaceTable($stub, $table)
            ->replaceFillable($stub, $fillable)
            ->replacePrimaryKey($stub, $primaryKey)
            ->replaceSoftDelete($stub, $softDeletes)
            ->replaceTimestamps($stub, $timestamps)
            ->replaceCreatedAt($stub, $createdAt)
            ->replaceUpdatedAt($stub, $updatedAt)
            ->replaceCustomNamespaces($stub, $customNamespaces)
            ->replaceCustomTraits($stub, $customTraits)
            ->replaceCustomProperties($stub, $customProperties)
            ->replaceCustomMethods($stub, $customMethods);

        foreach ($relationships as $rel) {
            // relationshipname#relationshiptype#args_separated_by_pipes
            // e.g. employees#hasMany#App\Employee|id|dept_id
            // user is responsible for ensuring these relationships are valid
            $parts = explode('#', $rel);

            if (count($parts) != 3) {
                continue;
            }

            // blindly wrap each arg in single quotes
            $args = explode('|', trim($parts[2]));
            $argsString = '';
            foreach ($args as $k => $v) {
                if (trim($v) == '') {
                    continue;
                }

                $argsString .= "'" . trim($v) . "', ";
            }

            $argsString = substr($argsString, 0, -2); // remove last comma

            $ret->createRelationshipFunction($stub, trim($parts[0]), trim($parts[1]), $argsString);
        }

        $ret->replaceRelationshipPlaceholder($stub);

        return $ret->replaceClass($stub, $name);
    }

    /**
     * Replace the table for the given stub.
     *
     * @param  string  $stub
     * @param  string  $table
     *
     * @return $this
     */
    protected function replaceTable(&$stub, $table)
    {
        $stub = str_replace('{{table}}', $table, $stub);

        return $this;
    }

    /**
     * Replace the fillable for the given stub.
     *
     * @param  string  $stub
     * @param  string  $fillable
     *
     * @return $this
     */
    protected function replaceFillable(&$stub, $fillable)
    {
        $stub = str_replace('{{fillable}}', $fillable, $stub);

        return $this;
    }

    /**
     * Replace the primary key for the given stub.
     *
     * @param  string  $stub
     * @param  string  $primaryKey
     *
     * @return $this
     */
    protected function replacePrimaryKey(&$stub, $primaryKey)
    {
        $stub = str_replace('{{primaryKey}}', $primaryKey, $stub);

        return $this;
    }

    /**
     * Replace the (optional) soft deletes part for the given stub.
     *
     * @param  string  $stub
     * @param  string  $replaceSoftDelete
     *
     * @return $this
     */
    protected function replaceSoftDelete(&$stub, $replaceSoftDelete)
    {
        if ($replaceSoftDelete == 'yes') {
            $stub = str_replace('{{softDeletes}}', "use SoftDeletes;\n    ", $stub);
            $stub = str_replace('{{useSoftDeletes}}', "use Illuminate\Database\Eloquent\SoftDeletes;\n", $stub);
        } else {
            $stub = str_replace('{{softDeletes}}', '', $stub);
            $stub = str_replace('{{useSoftDeletes}}', '', $stub);
        }

        return $this;
    }

    /**
     * Replace the (optional) timestamps part for the given stub.
     *
     * @param  string  $stub
     * @param  bool  $timestamps
     *
     * @return $this
     */
    protected function replaceTimestamps(&$stub, $timestamps)
    {
        $stub = str_replace('{{timestamps}}', $timestamps, $stub);

        return $this;
    }

    /**
     * Replace the (optional) timestamps part for the given stub.
     *
     * @param  string  $stub
     * @param  string  $replaceSoftDelete
     *
     * @return $this
     */
    protected function replaceCreatedAt(&$stub, $createdAt)
    {
        $createdAt = !empty($createdAt) ? $createdAt : '';
        $stub = str_replace('{{createdAt}}', $createdAt, $stub);

        return $this;
    }

    /**
     * Replace the (optional) timestamps part for the given stub.
     *
     * @param  string  $stub
     * @param  string  $replaceSoftDelete
     *
     * @return $this
     */
    protected function replaceUpdatedAt(&$stub, $updatedAt)
    {
        $updatedAt = !empty($updatedAt) ? $updatedAt : '';
        $stub = str_replace('{{updatedAt}}', $updatedAt, $stub);

        return $this;
    }

    /**
     * Create the code for a model relationship
     *
     * @param string $stub
     * @param string $relationshipName  the name of the function, e.g. owners
     * @param string $relationshipType  the type of the relationship, hasOne, hasMany, belongsTo etc
     * @param array $relationshipArgs   args for the relationship function
     */
    protected function createRelationshipFunction(&$stub, $relationshipName, $relationshipType, $argsString)
    {
        $tabIndent = '    ';
        $code = "public function " . $relationshipName . "()\n" . $tabIndent . "{\n" . $tabIndent . $tabIndent
            . "return \$this->" . $relationshipType . "(" . $argsString . ");"
            . "\n" . $tabIndent . "}\n";

        $str = '{{relationships}}';
        $stub = str_replace($str, $code . "\n" . $tabIndent . $str, $stub);

        return $this;
    }

    /**
     * remove the relationships placeholder when it's no longer needed
     *
     * @param $stub
     * @return $this
     */
    protected function replaceRelationshipPlaceholder(&$stub)
    {
        $stub = str_replace('{{relationships}}', '', $stub);
        return $this;
    }

    protected function replaceCustomNamespaces(&$stub, $customNamespaces)
    {
        $stub = str_replace('{{customNamespaces}}', $customNamespaces, $stub);
        return $this;
    }

    protected function replaceCustomTraits(&$stub, $customTraits)
    {
        $stub = str_replace('{{customTraits}}', $customTraits, $stub);
        return $this;
    }

    protected function replaceCustomProperties(&$stub, $customProperties)
    {
        $stub = str_replace('{{customProperties}}', $customProperties, $stub);
        return $this;
    }

    protected function replaceCustomMethods(&$stub, $customMethods)
    {
        $stub = str_replace('{{customMethods}}', $customMethods, $stub);
        return $this;
    }
}
