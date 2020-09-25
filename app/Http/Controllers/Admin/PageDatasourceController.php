<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Page;
use App\PageDatasource;
use Illuminate\Http\Request;

class PageDatasourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $pageDatasources = PageDatasource::with('source')->get();
        return response()->json($pageDatasources, 200, [],JSON_UNESCAPED_UNICODE);
    }

    public function getByPage($page_id)
    {
        $page_id = (int) $page_id;
        $pageDatasources = PageDatasource::with('source')
            ->where('page_id',$page_id)
            ->get();
        return response()->json($pageDatasources, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function store(Request $request)
  {
    $pageDatasource = new PageDatasource($request->all());
    $page = Page::find( $request->get( 'page_id' ) );
    if( ! $page ){
      return response()->json(['success' => false, 'message' => 'Page not Found'], 404);
    }
    $pageDatasource->page_guid = $page->guid;
    $result = $pageDatasource->save();
    if ($result) {
        return response()->json(['success' => true], 200);
    }
    return response()->json(['success' => false, 'message' => 'Failed to store page data source'], 500);
  }

    /**
     * Display the specified resource.
     *
     * @param PageDatasource $page_data_source_id
     * @return \Illuminate\Http\Response
     */
    public function show(PageDatasource $page_data_source_id)
    {
        return \Curl::to('http://altrp.nz/ajax/models/queries/test_posts/get_all_posts')
            ->withData()
            ->asJson()
            ->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PageDatasource  $pageDatasource
     * @return \Illuminate\Http\Response
     */
    public function edit(PageDatasource $pageDatasource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param $page_data_source_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $page_data_source_id)
    {
        $pageDatasource = PageDatasource::find($page_data_source_id);
        if (!$pageDatasource)
            return response()->json(['success' => false, 'message' => 'Page datasource not found'], 404);
        $result = $pageDatasource->update($request->all());
        if ($result) {
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'message' => 'Failed to update data source'], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $page_data_source_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($page_data_source_id)
    {
        $pageDatasource = PageDatasource::find($page_data_source_id);
        if (!$pageDatasource)
            return response()->json(['success' => false, 'message' => 'Page datasource not found'], 404);
        $result = $pageDatasource->delete();
        if ($result) {
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'message' => 'Failed to delete [page data source]'], 500);
    }
}
