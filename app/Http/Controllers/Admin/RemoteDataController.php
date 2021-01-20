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
    public function index($remotable_type, $remotable_id)
    {
        $remotableData = RemoteData::where([
            ['remotable_type', $this->getRemotableTypeClass($remotable_type)],
            ['remotable_id', $remotable_id]
        ])->get();
        return response()->json($remotableData, 200);
    }

    /**
     * Сохранить
     * @param Request $request
     * @param $remotable_type
     * @param $remotable_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, $remotable_type, $remotable_id)
    {
        $data = $request->all();
        $remotableType = $this->getRemotableTypeClass($remotable_type);
        if (! $remotableType)
            return response()->json(['success' => false, 'message' => 'Remotable type not found!'], 404);

        $remotabeClass = '\\' . $remotableType;
        $remotableEntity = $remotabeClass::find($remotable_id);


        $data['remotable_type'] = $remotableType;

        if (! $remotableEntity)
            return response()->json(['success' => false, 'message' => 'Remotable entity not found!'], 404);

        $data['remotable_id'] = $remotableEntity->id;

        $remoteData = new RemoteData($data);
        $result = $remoteData->save();
        return response()->json(['success' => $result], 200);
    }

    /**
     * Обновить
     * @param Request $request
     * @param $id
     * @param $remotable_type
     * @param $remotable_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $remotable_type, $remotable_id, $id)
    {
        $data = $request->all();
        $remotableType = $this->getRemotableTypeClass($remotable_type);
        if (! $remotableType)
            return response()->json(['success' => false, 'message' => 'Remotable type not found!'], 404);

        $remotabeClass = '\\' . $remotableType;
        $remotableEntity = $remotabeClass::find($remotable_id);


        $data['remotable_type'] = $remotableType;

        if (! $remotableEntity)
            return response()->json(['success' => false, 'message' => 'Remotable entity not found!'], 404);

        $data['remotable_id'] = $remotableEntity->id;
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

    /**
     * Получить пространсво имён класса сущности
     * @param $type
     * @return bool|string
     */
    protected function getRemotableTypeClass($type)
    {
        $class = false;
        switch ($type) {
            case 'model':
                $class = 'App\Altrp\Model';
                break;
            case 'sql_editor':
                $class = 'App\SQLEditor';
                break;
            case 'query':
                $class = 'App\Altrp\Query';
                break;
            default:
                $class = false;
        }
        return $class;
    }
}
