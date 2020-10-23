<?php

namespace App\Observers;

use App\Altrp\Generators\Request\RequestFile;
use App\Altrp\Generators\Request\RequestFileWriter;
use App\Altrp\ValidationField;
use App\Altrp\ValidationRule;

class AltrpValidationRuleObserver
{
    /**
     * Handle the validation rule "creating" event.
     *
     * @param  \App\Altrp\ValidationRule  $validationRule
     * @return void
     */
    public function creating(ValidationRule $validationRule)
    {

    }

    /**
     * Handle the validation rule "created" event.
     *
     * @param  \App\Altrp\ValidationRule  $validationRule
     * @return void
     */
    public function created(ValidationRule $validationRule)
    {
        $this->updateRequestFile($validationRule);
    }

    /**
     * Handle the validation rule "updated" event.
     *
     * @param  \App\Altrp\ValidationRule  $validationRule
     * @return void
     */
    public function updated(ValidationRule $validationRule)
    {
        $this->updateRequestFile($validationRule);
    }

    /**
     * Handle the validation rule "deleted" event.
     *
     * @param  \App\Altrp\ValidationRule  $validationRule
     * @return void
     */
    public function deleted(ValidationRule $validationRule)
    {
        $this->updateRequestFile($validationRule);
    }

    /**
     * Handle the validation rule "restored" event.
     *
     * @param  \App\Altrp\ValidationRule  $validationRule
     * @return void
     */
    public function restored(ValidationRule $validationRule)
    {
        //
    }

    /**
     * Handle the validation rule "force deleted" event.
     *
     * @param  \App\Altrp\ValidationRule  $validationRule
     * @return void
     */
    public function forceDeleted(ValidationRule $validationRule)
    {
        //
    }

    protected function getValidations($model, $type)
    {
        $validations = [];
        $validationFields = ValidationField::where('model_id',$model->id)->get();
        if (!$validationFields) return null;
        foreach ($validationFields as $field) {
            if (! $field->$type) continue;
            $rules = $field->rules->implode('rule', '|');
            $fieldName = $field->column->name;
            if ($field->column_name) $fieldName = $field->column_name;
            $validations[] = "'{$fieldName}' => '" . $rules . "',";
        }
        return implode(PHP_EOL . "\t\t\t", $validations);
    }

    protected function updateRequestFile(ValidationRule $validationRule)
    {
        $model = $validationRule->validation_field->model;
        $requestFileCreated = new RequestFile($model, 'Store', $this->getValidations($model, 'is_created'));
        $requestFileUpdated = new RequestFile($model, 'Update', $this->getValidations($model, 'is_updated'));
        $requestFileWriter = new RequestFileWriter();
        $requestFileWriter->write($requestFileCreated);
        $requestFileWriter->write($requestFileUpdated);
    }
}
