<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class AltrpDiagram extends Model
{
    protected $table = 'altrp_diagrams';

    public $timestamps = false;

    protected $fillable = [
        'settings',
        'author',
        'guid',
        'title'
    ];

  /**
   * @deprecated
   * Импортируем диаграммы
   * @param array $imported_diagrams
   */
  public static function import( $imported_diagrams = [] )
  {
    foreach ( $imported_diagrams as $imported_diagram ) {
      $old_diagram = self::where( 'guid', $imported_diagram['guid'] )->first();
      if( $old_diagram ){
        $old_diagram->settings = $imported_diagram['settings'];
        $old_diagram->title = $imported_diagram['title'];
        $old_diagram->author = auth()->user()->id;
        $old_diagram->save();
        continue;
      }
      $new_diagram = new self( $imported_diagram );
      $new_diagram->author = auth()->user()->id;
      $new_diagram->save();
    }
  }
}
