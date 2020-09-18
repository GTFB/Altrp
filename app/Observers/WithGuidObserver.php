<?php

namespace App\Observers;

use App\Altrp\Column;
use App\Altrp\Controller;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Generators\TableMigrationGenerator;
use App\Altrp\Migration;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\Table;
use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\CommandFailedException;
use App\Exceptions\Controller\ControllerFileException;
use App\Exceptions\ControllerNotWrittenException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\PermissionNotWrittenException;
use App\Exceptions\RouteGenerateFailedException;
use App\Permission;
use App\WithGuid;
use Carbon\Carbon;
use Illuminate\Support\Str;

class WithGuidObserver
{
  /**
   * Вызываем перед созданием модели
   * @param Model $model
   * @throws \Exception
   */
  public function creating( WithGuid $model )
  {
    if( isset( $model->with_guid ) && $model->with_guid ){
      $model->guid = (string)Str::uuid();

    }
  }
}
