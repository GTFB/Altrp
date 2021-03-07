<?php


namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Services\DaData\DaDataApiService;
use Illuminate\Http\Request;

class DaDataApiController extends Controller
{
    /**
     * @var DaDataApiService
     */
    private $dadataApiService;

    /**
     * DaDataApiController constructor.
     * @param DaDataApiService $dadataApiService
     */
    public function __construct(DaDataApiService $dadataApiService)
    {
        $this->dadataApiService = $dadataApiService;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressStandardization(Request $request)
    {
        $data = $request->all();
        $data['address'] = $data['address'] ?? '';
        $result = $this->dadataApiService->addressStandardization($data['address']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressPrompt(Request $request)
    {
        $data = $request->all();
        $data['query'] = $data['query'] ?? '';
        $data['count'] = $data['count'] ?? 10; // max - 20
        $data['language'] = $data['language'] ?? 1; // 1 - RU or 2 - EN
        $data['locations'] = $data['locations'] ?? [];
        $data['locations_geo'] = $data['locations_geo'] ?? [];
        $data['locations_boost'] = $data['locations_boost'] ?? [];
        $data['from_bound'] = $data['from_bound'] ?? [];
        $data['to_bound'] = $data['to_bound'] ?? [];
        $result = $this->dadataApiService->addressPrompt(
            $data['query'],
            $data['count'],
            $data['language'],
            $data['locations'],
            $data['locations_geo'],
            $data['locations_boost'],
            $data['from_bound'],
            $data['to_bound']
        );
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressGeoLocate(Request $request)
    {
        $data = $request->all();
        $data['lat'] = $data['lat'] ?? 0;
        $data['lon'] = $data['lon'] ?? 0;
        $data['count'] = $data['count'] ?? 10;
        $data['radius_meters'] = $data['radius_meters'] ?? 100;
        $data['language'] = $data['language'] ?? 1;
        $result = $this->dadataApiService->addressGeoLocate(
            $data['lat'],
            $data['lon'],
            $data['count'],
            $data['radius_meters'],
            $data['language']
        );
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressByIp(Request $request)
    {
        $data = $request->all();
        $data['ip'] = $data['ip'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['language'] = $data['language'] ?? 1;
        $result = $this->dadataApiService->addressByIP($data['ip'], $data['count'], $data['language']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressByCode(Request $request)
    {
        $data = $request->all();
        $data['id'] = $data['id'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['language'] = $data['language'] ?? 1;
        $result = $this->dadataApiService->addressByCode($data['id'], $data['count'], $data['language']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressPostalUnit(Request $request)
    {
        $data = $request->all();
        $data['address'] = $data['address'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['language'] = $data['language'] ?? 1;
        $result = $this->dadataApiService->addressPostalUnit($data['address'], $data['count'], $data['language']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressPostalUnitByCode(Request $request)
    {
        $data = $request->all();
        $data['code'] = $data['code'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['language'] = $data['language'] ?? 1;
        $result = $this->dadataApiService->addressPostalUnitById($data['code'], $data['count'], $data['language']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressPostalUnitByGeoLocate(Request $request)
    {
        $data = $request->all();
        $data['lat'] = $data['lat'] ?? 0;
        $data['lon'] = $data['lon'] ?? 0;
        $data['radius_meters'] = $data['radius_meters'] ?? 1000;
        $data['count'] = $data['count'] ?? 10;
        $data['language'] = $data['language'] ?? 1;
        $result = $this->dadataApiService->addressPostalUnitByGeoLocate(
            $data['lat'],
            $data['lon'],
            $data['radius_meters'],
            $data['count'],
            $data['language']
        );
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressDelivery(Request $request)
    {
        $data = $request->all();
        $data['code'] = $data['code'] ?? '';
        $result = $this->dadataApiService->addressDelivery($data['code']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addressByFiasCode(Request $request)
    {
        $data = $request->all();
        $data['code'] = $data['code'] ?? '';
        $result = $this->dadataApiService->addressByFiasCode($data['code']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function nameStandardization(Request $request)
    {
        $data = $request->all();
        $data['name'] = $data['name'] ?? '';
        $result = $this->dadataApiService->nameStandardization($data['name']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function namePrompt(Request $request)
    {
        $data = $request->all();
        $data['query'] = $data['query'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['gender'] = $data['gender'] ?? 0;
        $data['parts'] = $this->getArrayFromStr($data, 'parts');
        $result = $this->dadataApiService->namePrompt($data['query'], $data['count'], $data['gender'], $data['parts']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param $data
     * @return array|false|string[]
     */
    protected function getArrayFromStr($data, $key)
    {
        if (isset($data[$key])) {
            if (is_array($data[$key])) {
                return $data[$key];
            }
            return explode(',', $data[$key]);
        }
        return [];
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function emailStandardization(Request $request)
    {
        $data = $request->all();
        $data['email'] = $data['email'] ?? '';
        $result = $this->dadataApiService->emailStandardization($data['email']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function emailPrompt(Request $request)
    {
        $data = $request->all();
        $data['email'] = $data['email'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $result = $this->dadataApiService->emailPrompt($data['email'], $data['count']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function phoneStandardization(Request $request)
    {
        $data = $request->all();
        $data['phone'] = $data['phone'] ?? '';
        $result = $this->dadataApiService->phoneStandardization($data['phone']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function companyById(Request $request)
    {
        $data = $request->all();
        $data['id'] = $data['id'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['kpp'] = $data['kpp'] ?? '';
        $data['branch_type'] = $data['branch_type'] ?? 0;
        $data['type'] = $data['type'] ?? 0;
        $result = $this->dadataApiService->companyById(
            $data['id'],
            $data['count'],
            $data['kpp'],
            $data['branch_type'],
            $data['type']
        );
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function companyPrompt(Request $request)
    {
        $data = $request->all();
        $data['company'] = $data['company'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['status'] = $this->getArrayFromStr($data, 'status');
        $data['type'] = $data['type'] ?? 1;
        $data['locations'] = $data['locations'] ?? '{}';
        $data['locations_boost'] = $data['locations_boost'] ?? '{}';
        $result = $this->dadataApiService->companyPrompt(
            $data['company'],
            $data['count'],
            $data['status'],
            $data['type'],
            $data['locations'],
            $data['locations_boost']
        );
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function companyAffiliated(Request $request)
    {
        $data = $request->all();
        $data['code'] = $data['code'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['scope'] = $this->getArrayFromStr($data, 'scope');
        $result = $this->dadataApiService->companyAffiliated($data['code'], $data['count'], $data['scope']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function bankById(Request $request)
    {
        $data = $request->all();
        $data['bank'] = $data['bank'] ?? '';
        $result = $this->dadataApiService->bankById($data['bank']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function bankPrompt(Request $request)
    {
        $data = $request->all();
        $data['bank'] = $data['bank'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $data['status'] = $this->getArrayFromStr($data, 'status');
        $data['type'] = isset($data['type']) ? explode(',', $data['type']) : [1];
        $data['locations'] = $data['locations'] ?? '{}';
        $data['locations_boost'] = $data['locations_boost'] ?? '{}';
        $result = $this->dadataApiService->bankPrompt(
            $data['bank'],
            $data['count'],
            $data['status'],
            $data['type'],
            $data['locations'],
            $data['locations_boost']
        );
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function passportStandardization(Request $request)
    {
        $data = $request->all();
        $data['id'] = $data['id'] ?? '';
        $result = $this->dadataApiService->passportStandardization($data['id']);
        return response()->json($result['data'], $result['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function passportByFms(Request $request)
    {
        $data = $request->all();
        $data['passport'] = $data['passport'] ?? '';
        $data['count'] = $data['count'] ?? 10;
        $result = $this->dadataApiService->passportByFms($data['passport'], $data['count']);
        return response()->json($result['data'], $result['status']);
    }
}
