<?php


namespace App\Altrp\Builders;


use App\Altrp\Accessor;
use App\Altrp\Builders\Traits\DynamicVariables;
use App\Altrp\Column;
use App\Altrp\Model;
use App\Exceptions\AccessorNotFoundException;
use App\Exceptions\AccessorNotWrittenException;
use App\Exceptions\ColumnNotFoundException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\ParseFormulaException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class AccessorBuilder
{
    use DynamicVariables;
    /**
     * @var Model
     */
    protected $model;

    /**
     * @var Accessor
     */
    protected $accessor;

    /**
     * @var string
     */
    protected $modelFile;

    /**
     * @var array
     */
    protected $modelFileContent;

    /**
     * @var array
     */
    protected $data;

    /**
     * @var string
     */
    protected $tabIndent = '    ';

    /**
     * AccessorBuilder constructor.
     * @param Model $model
     * @param Accessor $accessor
     * @param array $data
     */
    public function __construct(Model $model, Accessor $accessor, $data = [])
    {
        $this->model = $model;
        $this->data = $data;
        $this->accessor = $accessor;
        $this->modelFile = $this->getModelFile($this->model->path, $this->model->name);
        $this->modelFileContent = file($this->modelFile, 2);
    }

    /**
     * Добавить аксессор
     *
     * @return bool
     * @throws ModelNotWrittenException
     */
    public function create()
    {
        if (! file_exists($this->modelFile)) {
            throw new ModelNotFoundException("Файл модели не найден!", 500);
        }
        $appends = $this->getAppendColumns($this->modelFileContent);
        if (! $this->writeAccessors($appends)) {
            throw new ModelNotWrittenException('Ошибка записи аксессора в файл модели!', 500);
        }
        return true;
    }

    /**
     * Обновить аксессор
     *
     * @return bool
     * @throws ModelNotWrittenException
     * @throws \Exception
     */
    public function update()
    {
        if (! file_exists($this->modelFile)) {
            throw new ModelNotFoundException("Файл модели не найден!", 500);
        }
        $appends = $this->getAppendColumns($this->modelFileContent);
        if (! $this->writeAccessors($appends)) {
            throw new ModelNotWrittenException('Ошибка записи аксессора в файл модели!', 500);
        }
        return true;
    }

    /**
     * Удалить аксессор
     *
     * @return bool
     * @throws ModelNotWrittenException
     * @throws \Exception
     */
    public function delete()
    {
        $appends = $this->getAppendColumns($this->modelFileContent);
        $search = array_search("'{$this->accessor->name}'", $appends);
        if ($search !== false) {
            array_splice($appends, $search ,1);
        }
        if (! $this->writeAccessors($appends)) {
            throw new ModelNotWrittenException('Ошибка записи аксессора в файл модели!', 500);
        }
        return true;
    }

    /**
     * Получить вычисляемое значение
     *
     * @param $accessor
     * @return mixed
     */
    public function getCalc($accessor)
    {
        if (isset($accessor->calculation))
            return $this->replaceDynamicVars($accessor->calculation);
        return $this->replaceDynamicVars($accessor->calculation_logic);
    }

    /**
     * Проверить, существует ли аксессор в модели
     *
     * @param $accessor
     * @return bool
     */
    public function accessorExists($accessor)
    {
        foreach ($this->modelFileContent as $line => $content) {
            $accessorName = Str::studly($accessor);
            if (Str::contains($content, 'function get' . $accessorName . 'Attribute')
                || Str::contains($content, 'function ' . $accessor)
                || Str::contains($content, 'public $' . $accessor)
                || Str::contains($content, 'protected $' . $accessor)
                || Str::contains($content, 'private $' . $accessor)
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Получить список всех аксессоров модели из БД
     *
     * @return mixed
     */
    protected function getAccessors()
    {
        return $this->model->altrp_accessors;
    }

    /**
     * Получить список всех колонок таблицы, к которой принадлежит модель
     *
     * @return array
     */
    protected function getTableColumns()
    {
        return explode(',', $this->model->table()->first()->columns->implode('name', ','));
    }

    /**
     * Записать акссессоры в файл модели
     *
     * @param $appends
     * @return bool
     */
    protected function writeAccessors($appends)
    {
        $accessors = $this->getAccessors();
        $appendsStubContent = $this->getAppendsStubContent();
        $content = [];

        foreach ($accessors as $accessor) {
            /**
             * @var $accessor Accessor
             */
            $accessorName = $accessor->getOriginal('name') ?? $accessor->name;
            if (! in_array("'$accessorName'",$appends))
                $appends[] = "'$accessor->name'";
        }

        $appendsStubContent = str_replace(
            '{{appends}}',
            '[' . implode(',', $appends) . ']',
            $appendsStubContent
        );

        $content = array_merge($content, $appendsStubContent);
        $content[] = "";

        try {
            foreach ($accessors as $accessor) {
                $accessorStubContent = $this->getAccessorStubContent();
                $calc = $this->getCalc($accessor);
                $accessorStubContent = str_replace(
                    '{{accessorName}}',
                    Str::studly($accessor->name),
                    $accessorStubContent
                );
                $accessorStubContent = str_replace(
                    '{{accessorDescription}}',
                    $accessor->description,
                    $accessorStubContent
                );
                $accessorStubContent = str_replace(
                    '{{accessorBody}}',
                    $this->parseFormula($calc),
                    $accessorStubContent
                );
                $content = array_merge($content, $accessorStubContent);
            }
        } catch (\Exception $e) {
            return false;
        }

        for ($i = 0; $i < count($this->modelFileContent); $i++) {
            if (strpos($this->modelFileContent[$i], 'ACCESSORS') !== false) {
                for ($j = $i + 1; true; $j++) {
                    if (strpos($this->modelFileContent[$j], 'ACCESSORS') !== false) break;
                    unset($this->modelFileContent[$j]);
                }
                for ($j = count($content) - 1; $j >= 0; $j--) {
                    array_splice($this->modelFileContent, $i + 1, 0, $content[$j]);
                }
                break;
            }
        }

        if (! file_put_contents($this->modelFile, implode(PHP_EOL, $this->modelFileContent))) {
            return false;
        }
        return true;
    }

    /**
     * Получить значение поля appends из медели
     *
     * @param $modelFileContent
     * @return array|mixed
     */
    protected function getAppendColumns($modelFileContent)
    {
        for ($i = 0; $i < count($modelFileContent); $i++) {
            if (Str::contains($modelFileContent[$i], 'protected $appends')) {
                if (preg_match_all('/[\'|"][a-z_]+[\'|"]/', $modelFileContent[$i], $appends)) {
                    return $appends[0];
                }
            }
        }
        return [];
    }

    /**
     * Получить содержимое файла стаба для поля appends
     *
     * @return array|false
     */
    protected function getAppendsStubContent()
    {
        return file(__DIR__ . '/stubs/create_appends_columns.stub', 2);
    }

    /**
     * Получить содержимое файла стаба для аксессоров
     *
     * @return array|false
     */
    protected function getAccessorStubContent()
    {
        return file(__DIR__ . '/stubs/create_accessor.stub', 2);
    }

    /**
     * Получить имя аксессора
     *
     * @param $name
     * @return string
     */
    protected function getAccessorName($name)
    {
        return Str::studly($name);
    }

    /**
     * Проверить, существуют ли такие колонки в таблице модели
     *
     * @param $columns
     * @return bool
     */
    protected function columnsExists($columns)
    {
        $tableColumns = $this->getTableColumns();
        foreach ($columns as $column) {
            if (! in_array($column, $tableColumns)) return false;
        }
        return true;
    }

    /**
     * Проанализировать и спарсить формулу
     *
     * @param $calc
     * @return string|bool
     * @throws ColumnNotFoundException
     */
    public function parseFormula($calc)
    {
        if (is_array(json_decode($calc, true)))
            $calc = json_decode($calc, true);

        if (! is_array($calc))
            return $this->parseCalculation($calc);
        elseif (is_array($calc))
            return $this->parseCalculationLogic($calc);
        else
            return false;
    }

    /**
     * Спарсить вычисляемые поля
     *
     * @param $calculation
     * @return string|string[]
     * @throws ColumnNotFoundException
     */
    protected function parseCalculation($calculation)
    {
        if (preg_match_all("/(?<columns>\[[a-z_]+\])|(?<accessors>\[[a-zа-я_]+\(?\)?\])/msiu", $calculation, $operands)) {
            $operands['columns'] = array_map(function ($operand) {
                return trim($operand, '[]');
            }, $operands['columns']);

            $operands['accessors'] = array_map(function ($operand) {
                return trim($operand, '[]()');
            }, $operands['accessors']);

            if (! $this->columnsExists(array_diff($operands['columns'], ['']))) {
                throw new ColumnNotFoundException('Поле не найдено в модели', 404);
            }

            foreach ($operands['columns'] as $column) {
                $calculation = str_replace(
                    "[{$column}]",
                    '$this->' . trim($column, '{}'),
                    $calculation
                );
            }

            $accessors = array_diff($operands['accessors'], ['']);

            if ($accessors) {
                foreach ($accessors as $accessor) {
                    $calculation = str_replace(
                        "[{$accessor}()]",
                        '$this->' . trim($accessor, '{}()'),
                        $calculation
                    );
                }
            }
        }
        if ($calculation)
            return 'return ' . $calculation . ';';
        return $calculation;
    }

    /**
     * Спарсить вычисляемую логику
     *
     * @param $calculationLogic
     * @return array|bool
     * @throws ColumnNotFoundException
     */
    protected function parseCalculationLogic($calculationLogic)
    {
        $colIds = [];
        foreach ($calculationLogic as $calc) {
            $colIds[] = $calc['left'];
            if (isset($calc['right']['id']))
                $colIds[] = $calc['right']['id'];
        }
        $columns = Column::whereIn('id',$colIds)->get();
        $calcLogic = $this->replaceColsIds($calculationLogic, $columns);
        if ($calcLogic)
            return implode(PHP_EOL, $calcLogic);
        return false;
    }

    /**
     * Заменить id колонок на имена
     *
     * @param $calculationLogic
     * @param $columns
     * @return array
     * @throws ColumnNotFoundException
     */
    protected function replaceColsIds($calculationLogic, $columns)
    {
        $calcLogic = [];
        /**
         * @var $columns Collection
         */
        foreach ($calculationLogic as $key => $calc) {
            if ($columns->contains('id', $calc['left']))
                $calc['left'] = '$this->' . $columns->firstWhere('id',  $calc['left'])->name;

            if (isset($calc['right']['id']) && $columns->contains('id', $calc['right']['id']))
                $calc['right'] = '$this->' . $columns->firstWhere('id',  $calc['right']['id'])->name;

            $calc['result'] = $this->parseCalculation($calc['result']);
            $calcLogic[] = !$key
                ? $this->getCalcString($calc)
                : $this->tabIndent . $this->tabIndent . $this->getCalcString($calc);
        }

        $calcLogic[] = $this->tabIndent . $this->tabIndent . "return "
            . ($this->accessor->calculation
                ? $this->parseCalculation($this->replaceDynamicVars($this->accessor->calculation))
                : 'null') . ";";

        return $calcLogic;
    }

    /**
     * Получить вычисляемую логически сроку
     *
     * @param $calc
     * @return string
     */
    protected function getCalcString($calc)
    {
        $operator = $calc['operator'] == '=' ? '==' : $calc['operator'];
        $str = "if ({$calc['left']} $operator {$calc['right']}) {";
        $str .= "\n{$this->tabIndent}{$this->tabIndent}{$this->tabIndent}";
        $str .= "{$calc['result']}\n{$this->tabIndent}{$this->tabIndent}}";
        return $str;
    }

    /**
     * Проверить, есть ли такие аксессоры в БД
     *
     * @param $accessors
     * @return bool
     */
    protected function accessorsExists($accessors)
    {
        $tableAccessors = $this->getAccessors();
        if (! $accessors) return true;
        foreach ($accessors as $accessor) {
            if (! in_array($accessor,
                explode(',', $tableAccessors->implode('name',',')))) return false;
        }
        return true;
    }

    /**
     * Получить файл
     *
     * @param string $modelPath Путь к файлу модели
     * @param string $modelName Имя модели
     * @return string
     */
    protected function getModelFile($modelPath, $modelName)
    {
        $modelFilename =  isset($modelPath)
            ? trim(config('crudgenerator.user_models_folder') . "/{$modelPath}/{$modelName}", '/')
            : trim(config('crudgenerator.user_models_folder') . "/{$modelName}", '/');

        return base_path('app/' . "{$modelFilename}.php");
    }
}
