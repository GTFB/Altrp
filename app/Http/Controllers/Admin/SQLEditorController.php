<?php

namespace App\Http\Controllers\Admin  ;

use App\Altrp\Builders\Traits\DynamicVariables;
use App\Http\Controllers\Controller;
use App\Altrp\Model;
use App\Http\Requests\ApiRequest;
use App\SQLEditor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SQLEditorController extends Controller
{

  use DynamicVariables;
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index( Request $request )
    {
      $search = $request->get('s');
      $orderColumn = $request->get('order_by') ?? 'title';
      $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Asc';
      $sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
      $page_count = 1;
      if ( ! $request->get( 'page' ) ) {
        $sQLEditors = $search
            ? SQLEditor::getBySearch($search, 'title', [], $orderColumn, $orderType)
            : SQLEditor::all()->$sortType( $orderColumn )->values();
      } else {
        $page_size = $request->get( 'pageSize', 10 );
        $sQLEditors = SQLEditor::offset( $page_size * ( $request->get( 'page' ) - 1 ) )
          ->limit( $page_size );
        $page_count = $sQLEditors->toBase()->getCountForPagination();
        $sQLEditors = $sQLEditors->get()->$sortType( $orderColumn )->values();

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
    public function listByName(Request $request)
    {
      $res = DB::table('s_q_l_editors')
        ->join('altrp_models', 'altrp_models.id', 's_q_l_editors.model_id')
        ->join('tables', 'tables.id', 'altrp_models.table_id')
        ->select(
          's_q_l_editors.id', 's_q_l_editors.name', 's_q_l_editors.title',
          's_q_l_editors.description', 'tables.name as model')
        ->get();
      return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:32',
            'name' => 'required|max:32'
        ]);

        $sQLEditor = new SQLEditor( $request->all() );

        if( $sQLEditor->save() ) {
            return response()->json( ['success' => true], 200,  [], 256 );
        }
        return response()->json( ['success' => false, 'Error on Delete'], 200,  [], 256 );
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
        $request->validate([
            'title' => 'required|max:32',
            'name' => 'required|max:32'
        ]);

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

    public function test(ApiRequest $request) {
      $sql = request()->sql;
      if (empty($sql))
        return json_encode(['error' => 'Нет запроса для проверки']);
      try {
        $sql = $this->replaceDynamicVars($sql, true);
        $fp = fopen(storage_path('tmp') . '/' . 'sqltest.php', 'w');
        fwrite($fp, "<?php \$sql = \"" . $sql ."\";\n \$res = DB::select(\$sql);\n return \$res;");
        if (!file_exists(storage_path('tmp') . '/' . 'sqltest.php')) {
          return json_encode(['error' => 'Нет доступа к временной папке tmp']);
        }
        $result = require storage_path('tmp') . '/' . 'sqltest.php';
        fclose($fp);
        @unlink(storage_path('tmp') . '/' . 'sqltest.php');
        return json_encode(['success' => $result]);
      } catch (\Exception $e) {
        @unlink(storage_path('tmp') . '/' . 'sqltest.php');
        return json_encode(['error' => $e->getMessage()]);
      }
    }
}
