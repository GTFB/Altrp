<?php


namespace App\Altrp\Builders;


use App\Altrp\Accessor;
use App\Altrp\Model;
use App\Exceptions\AccessorNotFoundException;
use App\Exceptions\AccessorNotWrittenException;
use App\Exceptions\ColumnNotFoundException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\ParseFormulaException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;

class AccessorBuilder
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * @var string
     */
    protected $modelFile;

    /**
     * @var array
     */
    protected $data;

    /**
     * AccessorBuilder constructor.
     * @param Model $model
     * @param $data
     */
    public function __construct(Model $model, $data)
    {
        $this->model = $model;
        $this->data = $data;
        $this->modelFile = $this->getModelFile($this->model->path, $this->model->name);
    }

    /**
     * @throws \Exception
     */
    public function build()
    {
        if (! file_exists($this->modelFile)) {
            throw new ModelNotFoundException("Файл модели не найден!", 500);
        }

        if (! $this->parseFormula($this->data['formula'])) {
            throw new ParseFormulaException('Ошибка в формуле!', 500);
        }

        $modelFileContent = file($this->modelFile, 2);

        if (! $this->addAccessor()) {
            throw new AccessorNotWrittenException('Ошибка добавления аксессора!', 500);
        }

        if (! $this->writeAccessors($modelFileContent)) {
            throw new ModelNotWrittenException('Ошибка записи аксессора в файл модели!', 500);
        }

        return true;
    }

    /**
     * Сохранить аксессор в БД
     *
     * @return bool
     * @throws \Exception
     */
    protected function addAccessor()
    {
        $accessor = Accessor::where([
            ['model_id', $this->model->id],
            ['name', $this->data['name']]
        ])->first();

        if ($accessor && $accessor->user_id != auth()->user()->id) {
            throw new \Exception('Аксессор уже существует', 500);
        }

        if (! $accessor) {
            $accessor = new Accessor();
            $accessor->user_id =  auth()->user()->id;
            $accessor->status = 'created';
        }

        $accessor->name = $this->data['name'];
        $accessor->formula = $this->data['formula'];
        $accessor->description = $this->data['description'] ?? null;
        $accessor->model_id = $this->model->id;
        $accessor->status = 'updated';
        return $accessor->save();
    }

    /**
     * Получить список всех аксессоров модели из БД
     *
     * @return mixed
     */
    protected function getAccessors()
    {
        return Accessor::where('model_id', $this->model->id)->get();
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
     * @param $modelFileContent
     * @return bool
     * @throws \Exception
     */
    protected function writeAccessors($modelFileContent)
    {
        $accessors = $this->getAccessors();
        $content = [];
        $appends = $this->getAppendColumns($modelFileContent);
        $appendsStubContent = $this->getAppendsStubContent();

        foreach ($accessors as $accessor) {
            if (! in_array("'$accessor->name'",$appends))
                $appends[] = "'$accessor->name'";
        }

        $appendsStubContent = str_replace(
            '{{appends}}',
            '[' . implode(',', $appends) . ']',
            $appendsStubContent
        );

        $content = array_merge($content, $appendsStubContent);
        $content[] = "";

        foreach ($accessors as $accessor) {
            $accessorStubContent = $this->getAccessorStubContent();
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
                'return ' . $this->parseFormula($accessor->formula) . ';',
                $accessorStubContent
            );
            $content = array_merge($content, $accessorStubContent);
        }

        for ($i = 0; $i < count($modelFileContent); $i++) {
            if (strpos($modelFileContent[$i], 'ACCESSORS') !== false) {
                for ($j = $i + 1; $j < count($modelFileContent) + $i; $j++) {
                    if (strpos($modelFileContent[$j], 'ACCESSORS') !== false) break;
                    unset($modelFileContent[$j]);
                }
                for ($j = count($content) - 1; $j >= 0; $j--) {
                    array_splice($modelFileContent, $i + 1, 0, $content[$j]);
                }
                break;
            }
        }

        if (! file_put_contents($this->modelFile, implode(PHP_EOL, $modelFileContent))) {
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
     * @param string $formula
     * @return string|string[]
     * @throws \Exception
     */
    protected function parseFormula($formula)
    {
        if (preg_match_all("/(?<columns>\{[a-z_]+\})|(?<accessors>\{[a-zа-я_]+\(?\)?\})/msiu", $formula, $operands)) {
            $operands['columns'] = array_map(function ($operand) {
                return trim($operand, '{}');
            }, $operands['columns']);

            $operands['accessors'] = array_map(function ($operand) {
                return trim($operand, '{}()');
            }, $operands['accessors']);

            if (! $this->columnsExists(array_diff($operands['columns'], ['']))) {
                throw new ColumnNotFoundException('Поле не найдено в модели', 404);
            }

            foreach ($operands['columns'] as $column) {
                $formula = str_replace(
                    "{{$column}}",
                    '$this->' . trim($column, '{}'),
                    $formula
                );
            }

            if (! $this->accessorsExists(array_diff($operands['accessors'], ['']))) {
                throw new AccessorNotFoundException('Аксессор не найден в модели', 404);
            }

            foreach ($operands['accessors'] as $accessor) {
                $formula = str_replace(
                    "{{$accessor}()}",
                    '$this->' . trim($accessor, '{}()'),
                    $formula
                );
            }
        }

        return $formula;
    }

    /**
     * Проверить, ли такие аксессоры в БД
     *
     * @param $accessors
     * @return bool
     */
    protected function accessorsExists($accessors)
    {
        $tableAccessors = $this->getAccessors();
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
