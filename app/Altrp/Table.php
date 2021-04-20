<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Schema;

/**
 * Основные сущности программы
 * @property Relationship[] $relationships
 * @property [] $actual_columns
 */
class Table extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'title',
        'description',
        'user_id',
        'preset'
    ];

  /**
   * @deprecated
   * @param array $imported_tables
   */
  public static function import( $imported_tables = [] )
  {
    foreach ( $imported_tables as $imported_table ) {
      if( self::where( 'name', $imported_table['name'] )->first() ){
        continue;
      }
      $new_table = new self( $imported_table );
      $new_table->user_id = auth()->user()->id;
      $new_table->save();
    }
  }

  public function migrations()
    {
        return $this->hasMany('App\Altrp\Migration');
    }

    public function columns()
    {
        return $this->hasMany('App\Altrp\Column');
    }

    public function onlyColumns()
    {
        return $this->columns()->where('type','!=','calculated')->get('*');
    }

    public function models()
    {
        return $this->hasMany('App\Altrp\Model');
    }

    public function altrp_model()
    {
        return $this->hasOne('App\Altrp\Model');
    }

    public function controllers()
    {
        return $this->hasMany('App\Altrp\Controller');
    }

    public function source_keys()
    {
        return $this->hasMany('App\Altrp\Key', 'source_table_id');
    }

    public function target_keys()
    {
        return $this->hasMany('App\Altrp\Key', 'target_table_id');
    }


    public function actual_migration()
    {
        return $this->migrations()->where('status', '=', '1')->latest()->first();
    }

    public function actual_columns()
    {
        $migration = $this->actual_migration();

        if (is_null($migration)) {
            return $this->columns();
        }

        return $this->columns()->where('altrp_migration_id', '=', $migration->id);
    }

    public function actual_keys()
    {
        $migration = $this->actual_migration();

        if (is_null($migration)) {
            return $this->source_keys();
        }

        return $this->source_keys()->where('altrp_migration_id', '=', $migration->id);
    }

    public function relationships()
    {
        return $this->hasMany('App\Altrp\Relationship');
    }

    /**
     * Проверка на существование таблицы в БД
     * @return bool
     */
    public function is_db_exist() {
      return Schema::hasTable($this->name);
    }

    /**
     * Получуем все ограничения внешнего ключа для таблицы
     * @return mixed
     */
    public function getDBForeignKeys()
    {
        $prefix = env('DB_TABLES_PREFIX', '');
        $conn = Schema::getConnection()->getDoctrineSchemaManager();
        return $conn->listTableForeignKeys($prefix.$this->name);
    }

    public function getDBColumnByName($name)
    {
        $prefix = env('DB_TABLES_PREFIX', '');
        $conn = Schema::getConnection();
        return $conn->getDoctrineColumn($prefix.$this->name, $name);
    }

    /**
     * Получить все колонки таблицы
     *
     * @param boolean $with_relations
     * @return mixed
     */
    public function get_all_columns($with_relations = false)
    {
        $columns = $this->actual_columns;
        if (!$with_relations) {
            return $columns;
        }

        return $columns;
    }

    public static function getBySearch($search)
    {
        return self::select(['id as value', 'title as label'])
            ->where('title', 'like', "%{$search}%")
            ->orWhere('name', 'like', "%{$search}%")
            ->orWhere('id', 'like', "%{$search}%")
            ->get();
    }
}
