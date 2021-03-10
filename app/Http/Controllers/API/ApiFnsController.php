<?php


namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Services\ApiFns\ApiFnsApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class ApiFnsController extends Controller
{
    /**
     * @var ApiFnsApiService
     */
    private $apiFnsApiService;

    /**
     * ApiFnsController constructor.
     * @param ApiFnsApiService $apiFnsApiService
     */
    public function __construct(ApiFnsApiService $apiFnsApiService)
    {
        $this->apiFnsApiService = $apiFnsApiService;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchCompanies(Request $request)
    {
        $data = $request->all();
        $data['q'] = $data['q'] ?? '';
        $data['page'] = $data['page'] ?? 1;
        $data['filter'] = $data['filter'] ?? '';
        $res = $this->apiFnsApiService->search($data['q'], $data['page'], $data['filter']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCompanyData(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $res = $this->apiFnsApiService->egr($data['req']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGroupDetails(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $res = $this->apiFnsApiService->multinfo($data['req']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBaseGroupDetails(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $res = $this->apiFnsApiService->multcheck($data['req']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkCounterParty(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $res = $this->apiFnsApiService->check($data['req']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkAccountLocks(Request $request)
    {
        $data = $request->all();
        $data['inn'] = $data['inn'] ?? '';
        $res = $this->apiFnsApiService->nalogbi($data['inn']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getChangedCompanyData(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $data['dat'] = $data['dat'] ?? '';
        $res = $this->apiFnsApiService->changes($data['req'], $data['dat']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkChangesByCompaniesList(Request $request)
    {
        $data = $request->all();
        $data['cmd'] = $data['cmd'] ?? '';
        $data['req'] = $data['req'] ?? '';
        $data['dat'] = $data['dat'] ?? '';
        $data['type'] = $data['type'] ?? '';
        $res = $this->apiFnsApiService->mon($data['cmd'], $data['req'], $data['dat'], $data['type']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getCheckout(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $res = $this->apiFnsApiService->vyp($data['req']);

        if (isset($res['data']['message'])) {
            return response()->json($res['data'], $res['status']);
        }

        return response($res['data'], $res['status'])->withHeaders([
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . Str::random(10) . '_' . Str::random(10) .'.pdf"'
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFinancialStatements(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $res = $this->apiFnsApiService->bo($data['req']);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getFinancialStatementsAsFile(Request $request)
    {
        $data = $request->all();
        $data['req'] = $data['req'] ?? '';
        $data['year'] = $data['year'] ?? now()->format('Y');
        $data['xls'] = $data['xls'] ?? 0;

        $format = $data['xls'] ? 'zip' : 'pdf';

        $res = $this->apiFnsApiService->bo_file($data['req'], $data['year'], $data['xls']);

        if (isset($res['data']['message'])) {
            return response()->json($res['data'], $res['status']);
        }

        return response($res['data'], $res['status'])->withHeaders([
            'Content-Type' => 'application/' . $format,
            'Content-Disposition' => 'attachment; filename="'
                . Str::random(10) . '_' . Str::random(10) .'.' . $format . '"'
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getIndividualTin(Request $request)
    {
        $data = $request->all();
        $data['fam'] = $data['fam'] ?? '';
        $data['nam'] = $data['nam'] ?? '';
        $data['otch'] = $data['otch'] ?? '';
        $data['bdate'] = $data['bdate'] ?? '';
        $data['doctype'] = $data['doctype'] ?? '21';
        $data['docno'] = $data['docno'] ?? '';
        $res = $this->apiFnsApiService->innfl(
            $data['fam'],
            $data['nam'],
            $data['otch'],
            $data['bdate'],
            $data['doctype'],
            $data['docno']
        );
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkValidPassport(Request $request)
    {
        $data = $request->all();
        $data['docno'] = $data['docno'] ?? '';
        $res = $this->apiFnsApiService->mvdpass($data['docno']);
        if (!is_array($res))
            return response()->json(['message' => 'Forbidden'], 403);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAlcoholLicensesList(Request $request)
    {
        $data = $request->all();
        $data['inn'] = $data['inn'] ?? '';
        $data['status'] = $data['status'] ?? '';
        $data['kpp'] = $data['kpp'] ?? '';
        $res = $this->apiFnsApiService->fsrar($data['inn'], $data['status'], $data['kpp']);
        if (!is_array($res))
            return response()->json(['message' => 'Forbidden'], 403);
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function apiKeyStatistics()
    {
        $res = $this->apiFnsApiService->stat();
        return response()->json($res['data'], $res['status']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function setApiKey(Request $request)
    {
        try {
            $secret = $request->secret;
            DotenvEditor::setKey('API_FNS_SECRET', $secret);
            DotenvEditor::save();
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 200);
        }
        return response()->json([
            'success' => true
        ], 200);
    }
}
