<?php

namespace App\Http\Controllers\Admin  ;

use App\Http\Controllers\Controller;
use App\Altrp\Model;
use App\SQLEditor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SQLEditorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index( Request $request )
    {
        //
      $page_count = 1;
      if ( ! $request->get( 'page' ) ) {
        $sQLEditors = SQLEditor::all()->sortByDesc( 'id' )->values();
      } else {
        $page_size = $request->get( 'pageSize', 10 );
        $sQLEditors = SQLEditor::offset( $page_size * ( $request->get( 'page' ) - 1 ) )
          ->limit( $page_size );
        $page_count = $sQLEditors->toBase()->getCountForPagination();
        $sQLEditors = $sQLEditors->get(  )->sortByDesc( 'id' )->values();

        $page_count = ceil( $page_count / $page_size );
      }
      return \response()->json([
        'sql_editors' => $sQLEditors,
        'pageCount' => $page_count,
      ]);
    }

    /**
   * Display the specified resource.
   *
   * @param  \App\SQLEditor $sQLEditor
   * @param string $id
   * @return \Illuminate\Http\Response
   */
    public function listByName(Request $request, $name)
    {
      $res = DB::table('s_q_l_editors')
        ->join('altrp_models', 'altrp_models.id', 's_q_l_editors.model_id')
        ->where('altrp_models.name', '=', $name)
        ->select('s_q_l_editors.id', 's_q_l_editors.name', 's_q_l_editors.title')
        ->get();
      return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

      $sQLEditor = new SQLEditor( $request->all() );

      if( $sQLEditor->save() ) {
        return response()->json( ['success' => true], 200,  [], JSON_UNESCAPED_UNICODE );
      }
      return response()->json( ['success' => false, 'Error on Delete'], 200,  [], JSON_UNESCAPED_UNICODE );
    }

  /**
   * Display the specified resource.
   *
   * @param  \App\SQLEditor $sQLEditor
   * @param string $id
   * @return \Illuminate\Http\Response
   */
    public function show(SQLEditor $sQLEditor, $id)
    {
      $res = $sQLEditor->find( $id )->toArray();
      return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SQLEditor  $sQLEditor
     * @return \Illuminate\Http\Response
     */
    public function edit(SQLEditor $sQLEditor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param $sql_editor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $sql_editor)
    {
        $sQLEditor = SQLEditor::where('id',$sql_editor)
            ->with([
                'altrp_source.source_permissions.permission',
            ])
            ->first();
      if( $sQLEditor->update($request->all()) ) {
        return response()->json( ['success' => $sQLEditor], 200,  [], JSON_UNESCAPED_UNICODE );
      }
      return response()->json( ['success' => false, 'Error on Update'], 200,  [], JSON_UNESCAPED_UNICODE );
    }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\SQLEditor $sQLEditor
   * @param string $id
   * @return \Illuminate\Http\Response
   * @throws \Exception
   */
    public function destroy( SQLEditor $sQLEditor, $id )
    {
        //
      $sQLEditor = $sQLEditor->find( $id );
      if( $sQLEditor->delete() ) {
        return response()->json( ['success' => true],200,  [], JSON_UNESCAPED_UNICODE );
      }
      return response()->json( ['success' => false, 'Error on Delete'],200,  [], JSON_UNESCAPED_UNICODE );

    }
}