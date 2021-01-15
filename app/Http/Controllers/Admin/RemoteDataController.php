<?php


namespace App\Http\Controllers\Admin;


use App\Altrp\RemoteData;
use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;

class RemoteDataController extends BaseController
{
    /**
     * Получить все
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(RemoteData::all(), 200);
    }

    /**
     * Сохранить
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $remoteData = new RemoteData($data);
        $result = $remoteData->save();
        return response()->json(['success' => $result], 200);
    }

    /**
     * Обновить
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $remoteData = RemoteData::find($id);
        $result = $remoteData->update($data);
        return response()->json(['success' => $result], 200);
    }

    /**
     * Удалить
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $remoteData = RemoteData::find($id);
        $result = $remoteData->delete();
        return response()->json(['success' => $result], 200);
    }
}
