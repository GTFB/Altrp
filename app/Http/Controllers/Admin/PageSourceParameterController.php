<?php


namespace App\Http\Controllers\Admin;


use App\Altrp\PageSourceParameter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageSourceParameterController extends Controller
{
    /**
     * @param $page_source_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByPageDataSource($page_source_id)
    {
        $params = PageSourceParameter::where('page_source_id', $page_source_id)->get();
        return response()->json($params, 200, [], 256);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $newParam = new PageSourceParameter($data);
        $result = $newParam->save();
        return response()->json(['success' => $result], $result ? 200 : 500, [], 256);
    }

    /**
     * @param Request $request
     * @param $page_source_param
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $page_source_param)
    {
        $data = $request->all();
        $param = PageSourceParameter::find($page_source_param);
        $result = $param->update($data);
        return response()->json(['success' => $result], $result ? 200 : 500, [], 256);
    }

    /**
     * @param $page_source_param
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($page_source_param)
    {
        $param = PageSourceParameter::find($page_source_param);
        $result = $param->delete();
        return response()->json(['success' => $result], $result ? 200 : 500, [], 256);
    }
}
