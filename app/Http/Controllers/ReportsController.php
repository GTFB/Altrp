<?php

namespace App\Http\Controllers;

use App\Altrp\ExportExcel;
use App\Altrp\ExportWord;
use App\Altrp\ExportXml;
use App\Page;
use App\Reports;
use App\PagesTemplate;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Constructor\Template;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use App\Helpers\Classes\HtmlGenerator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;


class ReportsController extends Controller
{
    /**
     * Получение списка отчетов
     * @return Reports
     */
    public function index(Request $request)
    {
      $search = $request->get('s');
      $orderColumn = $request->get('order_by') ?? 'id';
      $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
      $sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
      $_pages = $search
          ? Page::where('type','report')->getBySearch($search, 'title', [], $orderColumn, $orderType)
          : Page::where('type','report')->get()->$sortType( $orderColumn )->values();
      $pages = [];
      foreach ( $_pages as $page ) {

//        $content_template = $page->get_content_template();
        $user = $page->user;
        $pages[] = [
          'user' => $user,
          'title' => $page->title,
          'id' => $page->id,
          'parent_page_id' => $page->parent_page_id,
          'author' => data_get( $user, 'name' ),
//          'template_content' => $content_template,
//          'template_content_title' => $content_template ? $content_template->title : '',
          'url' => \url($page->path),
          'editUrl' => '/admin/pages/edit/' . $page->id,
          'path' => "$page->path",
        ];
      }
      return response()->json( $pages );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $res = [ 'success' => false, ];
        $page = new Page( $request->toArray() );
        $page->author = auth()->user()->id;
        $page->content = '';
        $page->guid = (string)Str::uuid();
        if ( $page->save() ) {
          if ( $request->template_id ) {
            $template = Template::find( $request->template_id );
            $pages_templates = new PagesTemplate( [
              'page_id' => $page->id,
              'page_guid' => $page->guid,
              'template_id' => $request->template_id,
              'template_guid' => $template->guid,
              'template_type' => 'reports',
            ] );
            $pages_templates->save();
            $res['pages_templates'] = $pages_templates->toArray();
          }
          $res['success'] = true;
          $res['page'] = $page->toArray();
          $page->parseRoles( (array)$request->get( 'roles' ) );
          return response()->json( $res );
        }
        $res['message'] = 'Page not saved';
        return response()->json( $res, 500 );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Reports  $reports
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $report = Reports::findOrFail($id);
        return response()->json($report, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reports  $reports
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $reports = Reports::where('id', $id)->update($request->all());
        return response()->json(array("result" => $reports), 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Reports  $reports
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reports $reports,$id)
    {
        $report = Page::findReport($id);
        if( $report->delete() ){
          return response()->json( ['success' => true,], 200, [], JSON_UNESCAPED_UNICODE );
        }
        return response()->json( ['success' => false, 'message' => 'Could not deleting'], 500, [], JSON_UNESCAPED_UNICODE );
    }

    /**
     * Получение списка отчетов
     * @return Reports
     */
    public function page(Request $request, $id)
    {
        // Получаем все отчеты
        $reports = Reports::where('id', $id)->first();

        return response($reports->html)->header('Content-Type', "text/html");
    }

    public function html(Request $request,$id){
        $htmlString = Reports::findOrFail($id)->html;
        return $htmlString;
    }

    public function setHtml(Request $request){
        $DOM = $request->dom;
        $cssRules = (string) $request->cssRules;
        $reportID = $request->reportID;
        $htmlGenerator = new HtmlGenerator($DOM,$cssRules,$reportID);
        if($htmlGenerator->getParsedHtml()){
            return response()->json([
                'path'=>"/storage/reports/$reportID/$reportID.zip"
            ],201);
        }
        return response()->json([
            'message'=> 'Not Found'
        ], 404);
    }

    /**
     * Получение компонетов отчёта
     */
    public function report_template(Request $request, $id){
        $report = Reports::find( $id );

        if( ! $report ){
            return response()->json( [
              'message'=> 'Not Found'
            ], 404, [], JSON_UNESCAPED_UNICODE );
        }

        $res = [
           'areas' => Reports::get_reports_content($id)
        ];

        return response()->json( $res );
    }

    public function exportToExcel(Request $request) {
        $excel = new ExportExcel($request->data, $request->template, $request->filename);
        $excel->export();
    }

    public function exportToWord(Request $request) {
      $word = new ExportWord($request->data, $request->template, $request->filename);
      $word->export();
    }

    public function exportToXml(Request $request) {
      $word = new ExportXml($request->data, $request->filename);
      $word->export();
    }
}
