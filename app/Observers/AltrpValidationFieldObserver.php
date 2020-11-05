<?php

namespace App\Observers;

use App\Altrp\Generators\Request\RequestFile;
use App\Altrp\Generators\Request\RequestFileWriter;
use App\Altrp\ValidationField;
use App\Altrp\ValidationRule;

class AltrpValidationFieldObserver
{
    /**
     * Handle the validation field "created" event.
     *
     * @param  \App\Altrp\ValidationField  $validationField
     * @return void
     */
    public function created(ValidationField $validationField)
    {
        $this->updateRequestFile($validationField);
    }

    /**
     * Handle the validation field "updated" event.
     *
     * @param  \App\Altrp\ValidationField  $validationField
     * @return void
     */
    public function updated(ValidationField $validationField)
    {
        $this->updateRequestFile($validationField);
    }

    /**
     * Handle the validation field "deleted" event.
     *
     * @param  \App\Altrp\ValidationField  $validationField
     * @return void
     */
    public function deleted(ValidationField $validationField)
    {
        $this->updateRequestFile($validationField);
    }

    /**
     * Handle the validation field "restored" event.
     *
     * @param  \App\Altrp\ValidationField  $validationField
     * @return void
     */
    public function restored(ValidationField $validationField)
    {
        //
    }

    /**
     * Handle the validation field "force deleted" event.
     *
     * @param  \App\Altrp\ValidationField  $validationField
     * @return void
     */
    public function forceDeleted(ValidationField $validationField)
    {
        //
    }

    protected function getValidations($model, $type)
    {
        $validations = [];
        $validationFields = ValidationField::where('model_id',$model->id)->get();
        if (!$validationFields) return null;
        foreach ($validationFields as $field) {
            if (!$field->$type || !$field->rules->toArray()) continue;
            $rules = $field->rules->implode('rule', '|');
            $fieldName = $field->column->name;
            if ($field->column_name) $fieldName = $field->column_name;
            $validations[] = "'{$fieldName}' => '" . $rules . "',";
        }
        return implode(PHP_EOL . "\t\t\t", $validations);
    }

    protected function updateRequestFile(ValidationField $validationField)
    {
        $model = $validationField->model;
        $requestFileCreated = new RequestFile($model, 'Store', $this->getValidations($model, 'is_created'));
        $requestFileUpdated = new RequestFile($model, 'Update', $this->getValidations($model, 'is_updated'));
        $requestFileWriter = new RequestFileWriter();
        $requestFileWriter->write($requestFileCreated);
        $requestFileWriter->write($requestFileUpdated);
    }
}
