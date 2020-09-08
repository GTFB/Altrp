<?php

namespace App\Altrp\Commands\CrudGenerator;

use App\Altrp\Model;
use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

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
                            {--model= : The model object.}
                            {--fillable= : The names of the fillable columns.}
                            {--model-namespace= : The namespace of extended model.}
                            {--extends-model= : Name of the extended model.}
                            {--relationships= : The relationships for the model.}
                            {--pk=id : The name of the primary key.}
                            {--soft-deletes=no : Include soft deletes fields.}
                            {--timestamps= : Include timestamps fields.}
                            {--created-at= : The name of the created-at column.}
                            {--updated-at= : The name of the updated-at column.}
                            {--user-columns= : The names of the user columns.}
                            {--accessors= : The accessors for the model.}
                            {--always-with= : The names of the relation always with.}
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
     * @param string $name
     *
     * @return string
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function buildClass($name)
    {
        $stub = $this->files->get($this->getStub());

        $table = $this->option('table') ?: $this->argument('name');
        /**
         * @var $model Model
         */
        $model = $this->option('model');
        $fillable = $this->option('fillable');
        $always_with = $this->option('always-with');
        $usedModelNamespace = $this->option('model-namespace');
        $extendsModel = $this->option('extends-model');
        $primaryKey = $this->option('pk');
        $relationships = trim($this->option('relationships')) != '' ? explode(';', trim($this->option('relationships'))) : [];
        $softDeletes = $this->option('soft-deletes');
        $timestamps = $this->option('timestamps');
        $createdAt = $this->option('created-at');
        $updatedAt = $this->option('updated-at');
        $userColumns = $this->option('user-columns');
        $accessors = $this->option('accessors') ?? '';
        $customNamespaces = $this->option('custom-namespaces') ?? '';
        $customTraits = $this->option('custom-traits') ?? '';
        $customProperties = $this->option('custom-properties') ?? '';
        $customMethods = $this->option('custom-methods') ?? '';


        if (! empty($table) && !$model->parent_model_id) {
            $table = <<<EOD
/**
    * The database table used by the model.
    *
    * @var string
    */
    protected \$table = '$table';
EOD;
        } else {
            $table = '';
        }

        if (! empty($primaryKey) && !$model->parent_model_id) {
            $primaryKey = <<<EOD
/**
    * The database primary key value.
    *
    * @var string
    */
    protected \$primaryKey = '$primaryKey';
EOD;
        } else {
            $primaryKey = '';
        }

        if ($timestamps !== null && !$model->parent_model_id) {
            $timestamps = $timestamps ? 'true' : 'false';
            $timestamps = <<<EOD
/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public \$timestamps = $timestamps;\n\n
EOD;
        } else {
            $timestamps = '';
        }

        if (!empty($createdAt) && !$model->parent_model_id) {
            $createdAt = <<<EOD
    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const CREATED_AT = 'created_at';\n\n
EOD;
        } else {
            $createdAt = '';
        }

        if (!empty($updatedAt) && !$model->parent_model_id) {
            $updatedAt = <<<EOD
    /**
     * The name of the "created at" column.
     *
     * @var string
     */
    const UPDATED_AT = 'updated_at';\n
EOD;
        } else {
            $updatedAt = '';
        }

        $ret = $this->replaceNamespace($stub, $name)
            ->replaceTable($stub, $table)
            ->replaceUsedModelNamespace($stub, $usedModelNamespace)
            ->replaceExtendModel($stub, $extendsModel)
            ->replaceFillable($stub, $fillable)
            ->replaceAlwaysWith($stub, $always_with)
            ->replacePrimaryKey($stub, $primaryKey)
            ->replaceSoftDelete($stub, $softDeletes)
            ->replaceTimestamps($stub, $timestamps)
            ->replaceCreatedAt($stub, $createdAt)
            ->replaceUpdatedAt($stub, $updatedAt)
            ->replaceUserColumns($stub, $userColumns)
            ->replaceAccessors($stub, $accessors)
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

    protected function replaceUsedModelNamespace(&$stub, $usedModelNamespace)
    {
        $stub = str_replace('{{useModelNamespace}}', $usedModelNamespace, $stub);
        return $this;
    }

    protected function replaceExtendModel(&$stub, $extendsModel)
    {
        $stub = str_replace('{{extendsModel}}', $extendsModel, $stub);
        return $this;
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
     * Replace the fillable for the given stub.
     *
     * @param  string  $stub
     * @param  string  $fillable
     *
     * @return $this
     */
    protected function replaceAlwaysWith(&$stub, $fillable)
    {
        $stub = str_replace('{{always_with}}', $fillable, $stub);

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
     * Replace the (optional) created_at part for the given stub.
     *
     * @param string $stub
     * @param $createdAt
     * @return $this
     */
    protected function replaceCreatedAt(&$stub, $createdAt)
    {
        $createdAt = !empty($createdAt) ? $createdAt : '';
        $stub = str_replace('{{createdAt}}', $createdAt, $stub);

        return $this;
    }

    /**
     * Replace the (optional) updated_at part for the given stub.
     *
     * @param string $stub
     * @param $updatedAt
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
     * @param string $relationshipName the name of the function, e.g. owners
     * @param string $relationshipType the type of the relationship, hasOne, hasMany, belongsTo etc
     * @param string $argsString
     * @return CrudModelCommand
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

    /**
     * Replace the customNamespaces for the given stub.
     *
     * @param $stub
     * @param $customNamespaces
     *
     * @return $this
     */
    protected function replaceCustomNamespaces(&$stub, $customNamespaces)
    {
        $stub = str_replace('{{customNamespaces}}', $customNamespaces, $stub);
        return $this;
    }

    /**
     * Replace the customTraits for the given stub.
     *
     * @param $stub
     * @param $customTraits
     *
     * @return $this
     */
    protected function replaceCustomTraits(&$stub, $customTraits)
    {
        $stub = str_replace('{{customTraits}}', $customTraits, $stub);
        return $this;
    }

    /**
     * Replace the customProperties for the given stub.
     *
     * @param $stub
     * @param $customProperties
     *
     * @return $this
     */
    protected function replaceCustomProperties(&$stub, $customProperties)
    {
        $stub = str_replace('{{customProperties}}', $customProperties, $stub);
        return $this;
    }

    /**
     * Replace the customMethods for the given stub.
     *
     * @param $stub
     * @param $customMethods
     *
     * @return $this
     */
    protected function replaceCustomMethods(&$stub, $customMethods)
    {
        $stub = str_replace('{{customMethods}}', $customMethods, $stub);
        return $this;
    }

    /**
     * Replace the userColumns for the given stub.
     *
     * @param $stub
     * @param $userColumns
     *
     * @return $this
     */
    protected function replaceUserColumns(&$stub, $userColumns)
    {
        $stub = str_replace('{{userColumns}}', $userColumns, $stub);
        return $this;
    }

    /**
     * Replace the accessors for the given stub.
     *
     * @param $stub
     * @param $accessors
     *
     * @return $this
     */
    protected function replaceAccessors(&$stub, $accessors)
    {
        $stub = str_replace('{{accessors}}', $accessors, $stub);
        return $this;
    }


}
