<?php

namespace App\Exceptions\Migration;

use Exception;

class AltrpMigrationKeyIncorrectModifierValueException extends Exception
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request)
    {
        if ($request->ajax() || $request->isJson() || $request->wantsJson()) {
            return response()->json([
                'message' => $this->getMessage()
            ], $this->getCode(), [], JSON_UNESCAPED_UNICODE);
        }

    }
}
